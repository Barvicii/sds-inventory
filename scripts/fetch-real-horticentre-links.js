const XLSX = require('xlsx');
const https = require('https');

// Leer archivos Excel para obtener lista de químicos
const storesWB = XLSX.readFile('./public/ChemicalStores_20260108193555.xlsx');
const chemicalsWB = XLSX.readFile('./public/Chemicals_20260108193431.xlsx');

const storesSheet = storesWB.Sheets[storesWB.SheetNames[0]];
const chemicalsSheet = chemicalsWB.Sheets[chemicalsWB.SheetNames[0]];

// Ajustar el rango para saltar las primeras filas de Chemicals
const chemicalsRaw = XLSX.utils.sheet_to_json(chemicalsSheet, { header: 1 });
const chemicalsHeaderIndex = chemicalsRaw.findIndex(row => 
  row && Array.isArray(row) && row.includes('Description')
);

if (chemicalsHeaderIndex >= 0) {
  const range = XLSX.utils.decode_range(chemicalsSheet['!ref'] || 'A1');
  range.s.r = chemicalsHeaderIndex;
  chemicalsSheet['!ref'] = XLSX.utils.encode_range(range);
}

const storesData = XLSX.utils.sheet_to_json(storesSheet);
const chemicalsData = XLSX.utils.sheet_to_json(chemicalsSheet);

// Crear set de todos los químicos únicos
const allChemicals = new Set();

chemicalsData.forEach(chem => {
  if (chem.Description) {
    allChemicals.add(chem.Description.trim());
  }
});

storesData.forEach(store => {
  const name = store.Chemical || store.ChemicalName;
  if (name && name !== '(blank)' && !String(name).includes('Total')) {
    allChemicals.add(name.trim());
  }
});

console.error('Fetching PDF links from Horticentre...');

// Fetch actual PDF links from Horticentre page
const url = 'https://horticentre.co.nz/index.php/safety-datasheets/';

https.get(url, (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    // Extract PDF links - they're in the format: https://horticentre.co.nz/wp-content/uploads/SafetyDatasheets/Filename.pdf?ver=...
    const pdfRegex = /(https:\/\/horticentre\.co\.nz\/wp-content\/uploads\/SafetyDatasheets\/[^"'\s]+\.pdf[^"'\s]*)/gi;
    const matches = [...html.matchAll(pdfRegex)];
    
    const horticentrePDFs = matches.map(match => {
      const fullUrl = match[1];
      // Extract filename from URL
      const urlParts = fullUrl.split('/');
      const filenameWithVer = urlParts[urlParts.length - 1];
      // Remove version parameter and decode
      const filename = decodeURIComponent(filenameWithVer.split('?')[0]);
      
      return {
        filename: filename,
        fullUrl: fullUrl
      };
    });

    console.error(`Found ${horticentrePDFs.length} PDF links`);
    
    // Function to normalize chemical names for matching
    function normalizeName(name) {
      return name.toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    // Extract keywords from chemical name (ignore brand/company names)
    function getKeywords(name) {
      const normalized = normalizeName(name);
      const ignoreWords = [
        'sds', 'pdf', 'grochem', 'groc', 'upl', 'syng', 'syngenta', 'fmc', 
        'basf', 'bayer', 'adama', 'orion', 'nufarm', 'corteva', 'adria', 
        'arxada', 'yara', 'van', 'iperen', 'redox', 'aglukon', 'keyi', 
        'frui', 'kenso', 'agritrade', 'compo', 'expert', 'biostart', 
        'ravensdown', 'dksh', 'grosafe', 'gros', 'syng', 'nufa', 'yates'
      ];
      
      return normalized.split(/\s+/).filter(w => w.length > 2 && !ignoreWords.includes(w));
    }

    // Find best matching PDF for each chemical
    function findBestMatch(chemicalName, pdfList) {
      const chemNormalized = normalizeName(chemicalName);
      const chemKeywords = getKeywords(chemicalName);
      
      let bestMatch = null;
      let bestScore = 0;
      
      for (const pdf of pdfList) {
        const pdfNormalized = normalizeName(pdf.filename);
        
        // 1. Exact match
        if (pdfNormalized.includes(chemNormalized) || chemNormalized.includes(pdfNormalized)) {
          return pdf;
        }
        
        // 2. Primary keyword match (first meaningful word)
        if (chemKeywords.length > 0) {
          const primaryKeyword = chemKeywords[0];
          if (pdfNormalized.includes(primaryKeyword)) {
            // Check if this keyword is unique enough
            const keywordMatches = pdfList.filter(p => 
              normalizeName(p.filename).includes(primaryKeyword)
            );
            if (keywordMatches.length === 1) {
              return pdf;
            }
          }
        }
        
        // 3. Substring containment
        for (const keyword of chemKeywords) {
          if (pdfNormalized.includes(keyword) || keyword.includes(pdfNormalized.split(/\s+/)[0])) {
            const score = keyword.length;
            if (score > bestScore) {
              bestScore = score;
              bestMatch = pdf;
            }
          }
        }
        
        // 4. Count common keywords (weighted by position)
        const pdfKeywords = getKeywords(pdf.filename);
        let commonCount = 0;
        chemKeywords.forEach((kw, idx) => {
          if (pdfKeywords.includes(kw)) {
            commonCount += (chemKeywords.length - idx); // Earlier keywords weighted more
          }
        });
        
        if (commonCount > bestScore) {
          bestScore = commonCount;
          bestMatch = pdf;
        }
      }
      
      return bestMatch;
    }

    // Build mapping object
    const sdsLinks = {};
    const defaultLink = 'https://horticentre.co.nz/index.php/safety-datasheets/';
    
    let mappedCount = 0;
    Array.from(allChemicals).sort().forEach(chemical => {
      const match = findBestMatch(chemical, horticentrePDFs);
      
      if (match) {
        const key = chemical.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        sdsLinks[key] = match.fullUrl;
        mappedCount++;
        console.error(`✓ ${chemical} → ${match.filename}`);
      } else {
        const key = chemical.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        sdsLinks[key] = defaultLink;
        console.error(`✗ ${chemical} → (no match, using default)`);
      }
    });

    console.error(`\n✅ Mapped ${mappedCount} out of ${allChemicals.size} chemicals to direct PDF links`);

    // Generate TypeScript code
    console.log(`// Auto-generated file - DO NOT EDIT MANUALLY`);
    console.log(`// Generated: ${new Date().toISOString()}`);
    console.log(`// Mapped ${mappedCount}/${allChemicals.size} chemicals to Horticentre SDS PDFs`);
    console.log();
    console.log(`export const ONEDRIVE_SDS_LINKS: Record<string, string> = {`);
    console.log(`  '__DEFAULT__': '${defaultLink}',`);
    
    Object.keys(sdsLinks).sort().forEach(key => {
      console.log(`  '${key}': '${sdsLinks[key]}',`);
    });
    
    console.log(`};`);
    console.log();
    console.log(`export function getOneDriveSdsLink(chemicalName: string): string {`);
    console.log(`  const key = chemicalName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');`);
    console.log(`  return ONEDRIVE_SDS_LINKS[key] || ONEDRIVE_SDS_LINKS['__DEFAULT__'];`);
    console.log(`}`);
  });
}).on('error', err => {
  console.error('Error fetching Horticentre page:', err);
  process.exit(1);
});

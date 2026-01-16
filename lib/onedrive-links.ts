/**
 * Mapa de químicos a sus URLs de SDS
 * - Químicos con enlaces directos desde Excel (67 productos)
 * - Químicos sin enlace directo → Link a página pública de Horticentre SDS (137 productos)
 */
export const ONEDRIVE_SDS_LINKS: Record<string, string> = {
  // 21% Soluble Boron
  '21-soluble-boron': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Actiwett
  'actiwett': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Ag Copp 75
  'ag-copp-75': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Alion
  'alion': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Altacor
  'altacor': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Apollo
  'apollo': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Applaud
  'applaud': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Aptivis (from Excel)
  'aptivis': 'https://syngenta.my.salesforce.com/sfc/p/#24000000Yk1o/a/Wo000000ljuX/nDIVXxQzxIcRjo7ZV_p9K4eGyr3NXiFX_JHUILVkIus',
  // Armobreak (from Excel)
  'armobreak': 'https://nz-test.upl-ltd.com/download_links/Y2aDskJZmDnCQXgJ6eI0Wu6szYzyMvxalxJ6Mp4T.pdf',
  // Arrow 360 (from Excel)
  'arrow-360': 'chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://www.adama.com/new-zealand/sites/adama_new_zealand/files/downloads/Arrow_360_SDS_July2018.pdf',
  // Avaunt (from Excel)
  'avaunt': 'https://ag.fmc.com/nz/sites/default/files/2024-08/Avaunt30WG_NZ_6N_New_0723.pdf',
  // Avid (from Excel)
  'avid': 'https://syngenta.my.salesforce.com/sfc/p/#24000000Yk1o/a/1o00000059if/.EtZT8u1jrUAU4MN9V5DZINUALx3v.bAhk4ZCAreM2U',
  // Bacstar (from Excel)
  'bacstar': 'https://nz.uplcorp.com/download_links/Bacstar_SDS_ES621_Oct2021.pdf',
  // Baga
  'baga': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Bammer (from Excel)
  'bammer': 'https://horticentre.co.nz/wp-content/uploads/Safety%20Datasheets/Bammer%20(UPL)%20SDS.pdf',
  // Bapsol 100 (from Excel)
  'bapsol-100': 'https://nz.grochem.com/wp-content/uploads/2018/05/Bapsol_SDS_1021.pdf',
  // Bash
  'bash': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Bee Scent (from Excel)
  'bee-scent': 'https://nz.grochem.com/wp-content/uploads/2018/05/Beescent_SDS-V2_0621.pdf',
  // Belanty (from Excel)
  'belanty': 'https://crop-solutions.basf.co.nz/sites/basf.co.nz/files/2024-01/SDS_BELANTY_NZ_25082023.pdf',
  // Bestseller 100EC (from Excel)
  'bestseller-100ec': 'https://adria.nz/wp-content/uploads/Bestseller-100EC-SDS-v2-2023.pdf',
  // BioMaris
  'biomaris': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Blossom Bless
  'blossom-bless': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Bluprins
  'bluprins': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Bond Xtra (from Excel)
  'bond-xtra': 'https://nz.uplcorp.com/download_links/BONDXTRA_SafetyDataSheet.pdf',
  // Bortrac 150
  'bortrac-150': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Brevis (from Excel)
  'brevis': 'https://nz.grochem.com/wp-content/uploads/2023/08/Brevis-SDS-JULY-2023.pdf',
  // Brexil CA (from Excel)
  'brexil-ca': 'https://www.nzagritrade.co.nz/sites/default/files/2022-08/Safety%20Sheet_2329_NZ_Brexil%20Ca_rev%201.2_en.pdf',
  // Brexil Mg (from Excel)
  'brexil-mg': 'https://www.nzagritrade.co.nz/sites/default/files/2022-08/Safety%20Sheet_NZ_1044_Brexil%20Mg_rev%201.0_en.pdf',
  // Brexil Mix LSA (from Excel)
  'brexil-mix-lsa': 'https://www.nzagritrade.co.nz/sites/default/files/2022-08/SDS_1433_NZ_Brexil%20Mix_rev%201.1_en.pdf',
  // Browndown Zap (from Excel)
  'browndown-zap': 'https://horticentre.co.nz/wp-content/uploads/Safety%20Datasheets/Browndown%20Zap%20(UPL)%20SDS.pdf',
  // Brownout
  'brownout': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Bud Builder FL
  'bud-builder-fl': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Budcyt (from Excel)
  'budcyt': 'https://nz.grochem.com/wp-content/uploads/2018/05/Budcyt_SDS_0222.pdf',
  // Buster (from Excel)
  'buster': 'https://horticentre.co.nz/wp-content/uploads/Safety%20Datasheets/Buster%20(BASF)%20SDS.pdf',
  // Calcinit (from Excel)
  'calcinit': 'https://horticentre.co.nz/wp-content/uploads/Safety%20Datasheets/Calcinit%20(Yara)%20SDS.pdf',
  // Calcium 175 (from Excel)
  'calcium-175': 'https://nz.grochem.com/wp-content/uploads/2018/05/Calcium-175_SDS_0821.pdf',
  // Calcium Ammonium Nitrate (CAN)
  'calcium-ammonium-nitrate-can': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Calcium Nitrate (Van Iperen)
  'calcium-nitrate-van-iperen': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Calibra
  'calibra': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Calmag
  'calmag': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Calphos
  'calphos': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Capetec
  'capetec': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Captan 600 Flo (from Excel)
  'captan-600-flo': 'https://horticentre.co.nz/wp-content/uploads/Safety%20Datasheets/Captan_600_Flo_SDS.pdf',
  // Captan 80WDG Fruitfed
  'captan-80wdg-fruitfed': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // ChampION++
  'champion': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Chateau (from Excel)
  'chateau': 'https://cdn.nufarm.com/wp-content/uploads/sites/17/2018/09/05115917/Chateau-Herbicide_SDS.pdf',
  // Chlor-P 480EC (from Excel)
  'chlor-p-480ec': 'https://www.orionagriscience.co.nz/storage/products/March2021/Chlor-P-SDS-Oct-2020.pdf',
  // Chorus (from Excel)
  'chorus': 'https://syngenta.my.salesforce.com/sfc/p/#24000000Yk1o/a/1o00000059kn/O1G4b0AKntAkoxCxN37zyHJuhG13bQxhIx2PSeVxPMY',
  // Citric Acid
  'citric-acid': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Clout
  'clout': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Colt
  'colt': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Comic
  'comic': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Companion Surfactant
  'companion-surfactant': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Croplift
  'croplift': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Croplift K (from Excel)
  'croplift-k': 'https://horticentre.co.nz/wp-content/uploads/Safety%20Datasheets/YaraVita%20Croplift%20K%20SDS.pdf',
  // Cyan
  'cyan': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // D-C-Tron Plus Organic Oil (from Excel)
  'd-c-tron-plus-organic-oil': 'https://www.nzagritrade.co.nz/sites/default/files/2023-08/D-C-Tron%20Plus%20Organic%20Spray%20Oil-%20SDS%20August%202023.pdf',
  // DAP
  'dap': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Deal 360
  'deal-360': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Delan (from Excel)
  'delan': 'https://crop-solutions.basf.co.nz/sites/basf.co.nz/files/2024-01/SDS_DELAN_NZ_31082023.pdf',
  // Dew 600
  'dew-600': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Digester
  'digester': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Dithane Rainshield Neo Tec
  'dithane-rainshield-neo-tec': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Dodine
  'dodine': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Dodine Grochem
  'dodine-grochem': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Dragon 700WG (from Excel)
  'dragon-700wg': 'https://cdn.nufarm.com/wp-content/uploads/sites/22/2018/05/17143648/0511-DRAGON-700WG-FUNGICIDE-20-May-2022.pdf',
  // Du-Wett
  'du-wett': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // EnCal
  'encal': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Enspray 99
  'enspray-99': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Erger
  'erger': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Escape
  'escape': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Esteem
  'esteem': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Ethin
  'ethin': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Exault
  'exault': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Excel Oil Organic
  'excel-oil-organic': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Excel Plus Oil
  'excel-plus-oil': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Exilis 5XL (from Excel)
  'exilis-5xl': 'https://www.nzagritrade.co.nz/sites/default/files/2024-09/Exilis%205XL%20SDS%20-%20Sept%2024.pdf',
  // Ezy-Thin
  'ezy-thin': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Fenamite
  'fenamite': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Fertigate W
  'fertigate-w': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Fertigate Y
  'fertigate-y': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Fiestar
  'fiestar': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Flint
  'flint': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Foam Fighter (from Excel)
  'foam-fighter': '50 g/litre picloram as the amine salt and 100 g/litre triclopyr',
  // Foliacin (from Excel)
  'foliacin': 'https://biostart.co.nz/wp-content/uploads/2024/06/SDS-Biostart-Foliacin-May-2024.pdf',
  // Foliar Boron - Van Iperen
  'foliar-boron---van-iperen': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Fontelis (from Excel)
  'fontelis': 'https://corteva.showpad.com/share/pS1H9a8LZrQSdbxZhjaSd',
  // Foschek
  'foschek': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Freeway (from Excel)
  'freeway': 'https://cdn.nufarm.com/wp-content/uploads/sites/17/2017/11/03153621/Freeway_SDS.pdf',
  // GIB 47
  'gib-47': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Gro-Mag Super
  'gro-mag-super': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Gro-Wet
  'gro-wet': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Growth
  'growth': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Gypsym (Calcium Sulphate)
  'gypsym-calcium-sulphate': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Harvista (from Excel)
  'harvista': 'https://www.scribd.com/document/750006173/SDS-HARVISTA-13-SC-USA',
  // Hi Cane (from Excel)
  'hi-cane': 'https://cdn.nufarm.com/wp-content/uploads/sites/17/2017/11/24085239/Hi-Cane_SDS.pdf',
  // Ignite (from Excel)
  'ignite': 'https://arxada.co.nz/herbicides/ignite',
  // Key Strepto
  'key-strepto': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Kocide Opti
  'kocide-opti': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Kontrol
  'kontrol': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Kudos (from Excel)
  'kudos': 'https://www.nzagritrade.co.nz/sites/default/files/2023-08/Kudos%20SDS.pdf',
  // Latron-B
  'latron-b': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // LI-700
  'li-700': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Lime
  'lime': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Lion 490 DST
  'lion-490-dst': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Lokit
  'lokit': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Magflo 300
  'magflo-300': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Magnesium Sulphate
  'magnesium-sulphate': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Magnesium Sulphate Fine
  'magnesium-sulphate-fine': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Mantrac Pro
  'mantrac-pro': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Manzate Evolution
  'manzate-evolution': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Max Out 540
  'max-out-540': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // MC Cream (from Excel)
  'mc-cream': 'https://www.nzagritrade.co.nz/sites/default/files/2022-08/SDS_2464_NZ_MC%20CREAM_rev%201.1_en.pdf',
  // Megafol
  'megafol': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Megastar
  'megastar': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Merpan Max
  'merpan-max': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Meteor
  'meteor': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Mit-E-Mec
  'mit-e-mec': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Mizar Granuflo (from Excel)
  'mizar-granuflo': 'https://nz.uplcorp.com/download_links/MIZARGRANUFLO_SafetyDataSheet.pdf',
  // Monoammonium Phosphate (Redox)
  'monoammonium-phosphate-redox': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Mortar
  'mortar': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Movento SC100
  'movento-sc100': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Mycorrcin
  'mycorrcin': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // NAA 100
  'naa-100': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // NAA Grochem (from Excel)
  'naa-grochem': 'https://nz.grochem.com/wp-content/uploads/2018/05/NAA-100_SDS_0222.pdf',
  // Neptune
  'neptune': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Nordox
  'nordox': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Norshield
  'norshield': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Novagib (from Excel)
  'novagib': 'https://www.nzagritrade.co.nz/sites/default/files/2024-03/Novagib%20NZ%20SDS%202024.pdf',
  // Nu-Film 17 (from Excel)
  'nu-film-17': 'https://d347awuzx0kdse.cloudfront.net/keyindustries/product-download/cpa-nf004_sds.pdf?v=17d0dc88d4b73ffb54af3c988b5afb974688ba41',
  // Nuprid 350SC (from Excel)
  'nuprid-350sc': 'chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://cdn.nufarm.com/wp-content/uploads/sites/17/2020/01/05115433/Nuprid-350SC_SDS.pdf',
  // Oasis (from Excel)
  'oasis': 'https://arxada.co.nz/wp-content/uploads/2019/10/Oasis-SDS.pdf',
  // Oil-Mate II (from Excel)
  'oil-mate-ii': 'https://nz.uplcorp.com/download_links/Oilmate-II_SDS_ES643_Dec2021.pdf',
  // Orthene
  'orthene': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Ovation (from Excel)
  'ovation': 'https://nz.uplcorp.com/download_links/OvationSDSUPL121July2023.pdf',
  // PanCal
  'pancal': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Paramite
  'paramite': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Patriot 1 (from Excel)
  'patriot-1': 'https://www.nzagritrade.co.nz/sites/default/files/2022-09/Patriot%201%20SDS%20March%202022_Final.pdf',
  // Payback
  'payback': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Penatra
  'penatra': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Phosgard
  'phosgard': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Pirimor WG
  'pirimor-wg': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Polyram DF (from Excel)
  'polyram-df': 'https://crop-solutions.basf.co.nz/sites/basf.co.nz/files/2024-01/SDS_POLYRAM%20DF_NZ_25092023.pdf',
  // Primo Maxx
  'primo-maxx': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Pristine
  'pristine': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Proclaim Opti (from Excel)
  'proclaim-opti': 'https://syngenta.my.salesforce.com/sfc/p/#24000000Yk1o/a/3V000001h6xI/lg_m7s6wVC9YrlrS.Ddfbfam1ks4PMvUa27zNp1NCCo',
  // Prodigy 240SC
  'prodigy-240sc': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Prolific (from Excel)
  'prolific': 'https://www.nzagritrade.co.nz/sites/default/files/2024-08/Prolific%20SDS%20MAR%202024.pdf',
  // Property (from Excel)
  'property': 'https://nz.uplcorp.com/download_links/PropertySDSUPL118August2022.pdf',
  // Protek (from Excel)
  'protek': 'https://arxada.co.nz/wp-content/uploads/2018/01/SDS-Arxada-Protek-June-2022.pdf',
  // Regalis Xtra
  'regalis-xtra': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Regulaid
  'regulaid': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Retain
  'retain': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Rootella G
  'rootella-g': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Score 10WG
  'score-10wg': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Seguris Flexi (from Excel)
  'seguris-flexi': 'https://syngenta.my.salesforce.com/sfc/p/#24000000Yk1o/a/1o0000005A8w/Uty.WNu_Cu1tJInlXWLzc56TFYUcGADcKBRGA6hJV2E',
  // Sercadis (from Excel)
  'sercadis': 'https://crop-solutions.basf.co.nz/sites/basf.co.nz/files/2024-01/SDS_SERCADIS_NZ_03082023.pdf',
  // Serenade Optimum
  'serenade-optimum': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Sinergon 2000
  'sinergon-2000': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Spray Aid
  'spray-aid': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Starane Xtra (from Excel)
  'starane-xtra': 'https://corteva.showpad.com/share/3hK6m60uy6Ft2T8CJeh3E',
  // Stomp Xtra (from Excel)
  'stomp-xtra': 'https://crop-solutions.basf.co.nz/sites/basf.co.nz/files/2024-01/SDS_STOMP_XTRA_NZ_16122023.pdf',
  // Stopit
  'stopit': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Success Naturalyte Insect Control
  'success-naturalyte-insect-control': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Sugar
  'sugar': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Super Boron
  'super-boron': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Superzyme
  'superzyme': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Syllit Plus
  'syllit-plus': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Synergizer
  'synergizer': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Talendo (from Excel)
  'talendo': 'https://corteva.showpad.com/share/M3aO7KybYb80x8EH7CvzK',
  // Thin-It
  'thin-it': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Thiram
  'thiram': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Torus
  'torus': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Trace-it Copper
  'trace-it-copper': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Trace-it Manganese N (from Excel)
  'trace-it-manganese-n': 'https://nz.grochem.com/wp-content/uploads/2018/05/TracIt-MnN_SDS_0622.pdf',
  // Trexel (from Excel)
  'trexel': 'https://adria.nz/wp-content/uploads/Trexel-SDS-v2-2023.pdf',
  // Triumph Gold
  'triumph-gold': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Umbrella
  'umbrella': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Urea (Ravensdown) (from Excel)
  'urea-ravensdown': 'https://www.ravensdown.co.nz/media/6095/urea-sds-2022.pdf',
  // Urea Low Biuret Krista
  'urea-low-biuret-krista': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Urea N Rich (from Excel)
  'urea-n-rich': 'https://www.ravensdown.co.nz/media/6095/urea-sds-2022.pdf',
  // Urea Van Iperen
  'urea-van-iperen': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // VaporGard (from Excel)
  'vaporgard': 'https://d347awuzx0kdse.cloudfront.net/keyindustries/product-download/cpa-vg004_sds.pdf?v=fed8c49b4957b46942f6967522dfc97c5e2cb7b7',
  // Vayego
  'vayego': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Virex
  'virex': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Voliam Targo (from Excel)
  'voliam-targo': 'https://syngenta.my.salesforce.com/sfc/p/#24000000Yk1o/a/1o0000005AI9/xj2xEIz5d5b.EuWjL_otRW7dL2Q8OBKEp5ZDWU0S99A',
  // Waiken (from Excel)
  'waiken': 'https://www.csinfosafe.com/CSIAU/ExternalView.aspx?sdsid=AEE8F0DE-C74A-446E-A2B3-0E2FE57F0369',
  // Weed Off
  'weed-off': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Wuxal Boron Plus
  'wuxal-boron-plus': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Wuxal Manganese
  'wuxal-manganese': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Wuxal Zinc Plus (from Excel)
  'wuxal-zinc-plus': 'https://horticentre.co.nz/wp-content/uploads/Safety%20Datasheets/Wuxal%20Zinc%20Plus%20(Aglukon)%20SDS.pdf',
  // Yara Mila Complex
  'yara-mila-complex': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Yara Tera Calcinit (from Excel)
  'yara-tera-calcinit': 'https://horticentre.co.nz/wp-content/uploads/Safety%20Datasheets/Calcinit%20(Yara)%20SDS.pdf',
  // Yara Tera Krista K Plus
  'yara-tera-krista-k-plus': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Yara Tera Krista MAG (Orange)
  'yara-tera-krista-mag-orange': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Yara Tera Krista MAP (Blue)
  'yara-tera-krista-map-blue': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Yara Tera Krista MgS
  'yara-tera-krista-mgs': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Yara Tera Krista MKP
  'yara-tera-krista-mkp': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Yara Tera Krista SOP
  'yara-tera-krista-sop': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Yara Tera Kristalon Blue
  'yara-tera-kristalon-blue': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Yara Tera Kristalon White
  'yara-tera-kristalon-white': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Yara Tera Kristalon Yellow
  'yara-tera-kristalon-yellow': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // YaraVita Seniphos
  'yaravita-seniphos': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  // Zintrac
  'zintrac': 'https://horticentre.co.nz/index.php/safety-datasheets/',
  
  // Link por defecto a Horticentre SDS page (público, sin login)
  '__DEFAULT__': 'https://horticentre.co.nz/index.php/safety-datasheets/'
};

/**
 * Obtiene el link de SDS para un químico específico
 * - Si tiene link directo desde Excel, lo retorna
 * - Si no, retorna la página de Horticentre SDS (pública, sin login)
 */
export function getOneDriveSdsLink(chemicalName: string): string {
  // Normalizar nombre para buscar en el mapa
  const normalizedName = chemicalName
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  
  // Buscar link específico o usar fallback
  return ONEDRIVE_SDS_LINKS[normalizedName] || ONEDRIVE_SDS_LINKS['__DEFAULT__'];
}

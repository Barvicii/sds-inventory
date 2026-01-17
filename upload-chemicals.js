const https = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/upload-chemicals-reference',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response:', data);
    const result = JSON.parse(data);
    console.log('\n✅ Upload complete!');
    console.log('Stats:', JSON.stringify(result.stats, null, 2));
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
  process.exit(1);
});

req.end();

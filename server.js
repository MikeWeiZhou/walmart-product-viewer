const express = require('express');
const fs = require('fs');
var request = require('request');
const APP = express();

// Configuration
const PORT = 80;
const DIR_DISTRIBUTION = __dirname.replace(/\\/g, '/') + '/dist/walmart-product-viewer';
const TAXONOMY_API_URL = 'https://api.walmartlabs.com/v1/taxonomy';
const PAGINATED_API_URL = 'https://api.walmartlabs.com/v1/paginated/items';

// Route index to Distribution index.html
APP.get('/', (request, response) => {
  response.sendFile(DIR_DISTRIBUTION + '/index.html');
});

// Route everything to Distribution folder, minus paths starting with "/api"
APP.get(/^(?!\/api)[\w.=/-]*/, (request, response) => {
  if (fs.existsSync(DIR_DISTRIBUTION + request.path)) {
    response.sendFile(DIR_DISTRIBUTION + request.path);
  }
  else {
    response.status(404).send('File not found');
  }
});

// Route Taxonomy API
APP.get('/api/:api', (req, res) => {
  let url = '';
  if (req.params.api === 'taxonomy') {
    url = TAXONOMY_API_URL;
  }
  else if (req.params.api === 'paginated') {
    url = PAGINATED_API_URL;
  }
  else {
    res.status(500);
    res.send('Error.');
    return;
  }

  // Create query string
  let queryString = '?';
  Object.keys(req.query).forEach(key => {
    queryString += `&${key}=${req.query[key]}`;
  });

  // Forward request to the real Walmart API
  request(url + queryString, (error, response, body) => {
    res.setHeader('content-type', response.headers["content-type"]);
    res.status(response.statusCode);
    res.send(body);
  });
})

// Start server
APP.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
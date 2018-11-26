const express = require('express');
const fs = require('fs');
const APP = express();

// Configuration
const PORT = 80;
const DIR_DISTRIBUTION = __dirname.replace(/\\/g, '/') + '/dist/walmart-product-viewer';

// Route index to Distribution index.html
APP.get("/", (request, response) =>
{
  response.sendFile(DIR_DISTRIBUTION + "/index.html");
});

// Route everything to Distribution folder, minus paths starting with "/api"
APP.get(/^(?!\/api)[\w.=/-]*/, (request, response) =>
{
  if (fs.existsSync(DIR_DISTRIBUTION + request.path)) {
    response.sendFile(DIR_DISTRIBUTION + request.path);
  }
  else {
    response.status(404).send("File not found");
  }
});

APP.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});
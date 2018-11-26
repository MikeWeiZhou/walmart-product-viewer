export const environment = {
  production: true,

  "WALMART": {
    // Walmart Open API KEY
    // https://developer.walmartlabs.com/
    "API_KEY": "pxwzmp27a72kgexvac7vpq9z",

    // API Endpoints (URLs)
    "API_ENDPOINTS": {
      "TAXONOMY":   "http://localhost/api/taxonomy",
      // "TAXONOMY":   "https://api.walmartlabs.com/v1/taxonomy",
      "PAGINATED":  "http://localhost/api/paginated",
      // "PAGINATED":  "https://api.walmartlabs.com/v1/paginated/items",
      "LOOKUP":     "https://api.walmartlabs.com/v1/items"
    }
  }
};

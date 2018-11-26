export const environment = {
  production: true,

  "WALMART": {
    // Walmart Open API KEY
    // https://developer.walmartlabs.com/
    "API_KEY": "pxwzmp27a72kgexvac7vpq9z",

    // API Endpoints (URLs)
    "API_ENDPOINTS": {
      "TAXONOMY":   "https://walmart-product-viewer.appspot.com/api/taxonomy",
      // "TAXONOMY":   "https://api.walmartlabs.com/v1/taxonomy",
      "PAGINATED":  "https://walmart-product-viewer.appspot.com/api/paginated",
      // "PAGINATED":  "https://api.walmartlabs.com/v1/paginated/items",
      "LOOKUP":     "https://api.walmartlabs.com/v1/items"
    }
  }
};

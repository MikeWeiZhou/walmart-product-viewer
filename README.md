# Walmart Product Viewer
An exercise in Angular and API handling.

Live Demo: https://walmart-product-viewer.appspot.com/ (Hosted on Google Cloud AppEngine)

## To Run Server In Development Mode
This will run Angular's built-in development server

1. clone Git repository
2. at project directory, run command: **npm install**
3. at project directory, run command: **npm run dev**

**WARNING**: Running in development server requires disabling Cross Origin Resource Sharing (CORS). For example, if you are logged into your bank account website then visit another malicious website, that malicious website can potentially act on your behalf, such as sending payments.

If you still wish to proceed with development server, install some plugin that disables CORS checking.

## To Run Server In Production Mode
This will run Express server on Node.js

1. clone Git repository
2. at project directory, run command: **npm install**
3. at project directory, run command: **npm run build**
4. at project directory, run command: **npm start**

**Note**: Production server has API endpoints pointing to localhost, which will forward the request to the real Walmart API endpoints. No plugin of any kind is required to run server. However, not all headers are copied from the Walmart API endpoints, so there may have undiscovered issues.

## To Do / Future Improvements

#### General
- modal/popup notification for errors (currently uses Logger service to write to console)
- disable buttons/links when user navigates to new page and is loading in progress
- log history for browser (back button does not work properly)

#### Categories
- category filtering to assist user searching
- ~~cache categories (categories don't change often)~~
- ~~lazy load child categories to improve initial DOM rendering speed~~
- ~~categories should look like a link (currently looks like a text list)~~
- ~~should have a parent directory link~~

#### Products
- product filtering to assit user searching (currently shows 10 products per page...)
- show page numbers
- have default image (some image links are broken)
- cache page results
- prefetch next page when there's spare network capacity
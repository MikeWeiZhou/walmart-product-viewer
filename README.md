# Walmart Product Viewer
An exercise in Angular and API handling.

## To Run Server In Development Mode
This will run Angular's built-in development server

1. clone Git repository
2. at project directory, run command: **npm install**
3. at project directory, run command: **npm run dev**

## To Run Server In Production Mode
This will run Express server on Node.js

1. clone Git repository
2. at project directory, run command: **npm install**
3. at project directory, run command: **npm run build**
4. at project directory, run command: **npm start**

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
# Walmart Product Viewer
An exercise in Angular and API handling.

## NPM Commands
- **npm run dev** runs server in development mode (uses default environment: *environment.ts*)
- **npm run build** builds for production, all artificats stored in folder */dist*

## To Do / Future Improvements

#### General
- modal/popup notification for errors
- disable buttons/links when user navigates to new page and is loading in progress
- log history for browser (back button does not work properly)

#### Categories
- **category filtering** to assist user searching
- cache categories (categories don't change often)
- ~~lazy load child categories to improve initial DOM rendering speed~~
- ~~categories should look like a link (currently looks like a text list)~~
- ~~should have a parent directory link~~

#### Products
- **product filtering** to assit user searching (currently shows 10 products per page...)
- have default image (some image links are broken)
- cache page results
- prefetch next page when there's spare network capacity
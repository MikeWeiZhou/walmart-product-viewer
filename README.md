# Walmart Product Viewer
An exercise in Angular and API handling.

## NPM Commands
- **npm run dev** runs server in development mode (uses default environment: *environment.ts*)
- **npm run build** builds for production, all artificats stored in folder */dist*

## To Do / Future Improvements

#### General
- log history for browser (back button does not work properly)
- cache API results to decrease latency from Walmart API

#### Categories
- categories should look like a link (currently looks like a text list)
- should have a parent directory link
- **category filtering** to assist user searching
- ~~lazy load child categories to improve initial DOM rendering speed~~
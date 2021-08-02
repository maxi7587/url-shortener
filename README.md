# URL Shortener
Indicina Initial Assessment - Maximiliano Cruz

## Quick start
### To run the whole project
Go to parent directory and run `docker-compose up --build`
### To run only Back End (with docker)
From BE project directory, run `docker-compose up --build`
### To run only Back End (without docker)
`npm install` and `npm run start:dev`
### To run tests
`npm install` and `npm run test`

## Provided endpoints:
- /api/encode - Encodes a URL to a shortened URL
- /api/decode - Decodes a shortened URL to its original URL
- /api/statistic/{url_path} - Return basic stat of a short URL path. Using the above link
url_path will be GeAi9K. (Be creative with what details you provide here.)
- /api/list - List all available url
- /{url_path} - This should redirect the user to the long url.

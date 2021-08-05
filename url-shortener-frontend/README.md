# URL Shortener
Indicina Initial Assessment - Maximiliano Cruz

## Quick start
### To run the whole project
Go to parent directory and run `docker-compose up --build`
### To run only Front End (with docker)
`docker build -t url_shortener_frontend .`
and
`docker container run -P -t url_shortener_frontend`
### To run only Front End (without docker)
`npm install` and `npm run start`
### To run tests
`npm install` and `npm run test`

## Brief
ShortLink is a URL shortening app where you enter a URL such as https://indicina.co and it
returns a short URL such as http://short.est/GeAi9K. Visiting the shortened URL should redirect
the user to the long URL. Using the example above, visiting http://short.est/GeAi9K should
redirect the user to https://indicina.co.

## Website requirements
On the website a user should be able to create a short url by entering a long url in a form, on
clicking the submit button, a short url should be generated via the backend.
Add a listing view with a list of all the urls created, each list should include a long url, short url,
etc (be creative with etc). On the list users should be able to search the long url by entering at
least 3 characters.

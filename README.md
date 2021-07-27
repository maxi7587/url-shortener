# URL Shortener
Indicina Initial Assessment - Maximiliano Cruz

## Objective
Your assignment is to implement a URL shortening website using your frontend and backend
stack of choice. (NodeJS and React are preferred)

## Brief
ShortLink is a URL shortening app where you enter a URL such as https://indicina.co and it
returns a short URL such as http://short.est/GeAi9K. Visiting the shortened URL should redirect
the user to the long URL. Using the example above, visiting http://short.est/GeAi9K should
redirect the user to https://indicina.co.

## Tasks
You are to create a URL shortener Website. The website should also provide api for those that
want to integrate via api.
On the website a user should be able to create a short url by entering a long url in a form, on
clicking the submit button, a short url should be generated via the backend.
Add a listing view with a list of all the urls created, each list should include a long url, short url,
etc (be creative with etc). On the list users should be able to search the long url by entering at
least 3 characters.

## Endpoints required:
- /api/encode - Encodes a URL to a shortened URL
- /api/decode - Decodes a shortened URL to its original URL
- /api/statistic/{url_path} - Return basic stat of a short URL path. Using the above link
url_path will be GeAi9K. (Be creative with what details you provide here.)
- /api/list - List all available url
- /{url_path} - This should redirect the user to the long url.

## Additionally
- All endpoints should return a JSON response.
- There is no restriction to how your encode/decode algorithm should work. You just need
to make sure that a URL can be encoded to a short URL and the short URL can be
decoded to the original URL. Keep them in memory
- Provide detailed instructions on how to run your assignment in a separate markdown file
- On every step of the project, commit the work done. We will check the git log and check
how you code
- Duration of this test is 2 week. To submit, send a zip file containing the code and the git
folder to join@indicina.co
- Use docker compose to get extra points.
- Extra points for well written tests. All types of tests are welcome, unit, integration, etc.

## Evaluation Criteria
Best practices, SOLID principles, Clean Code, Tests! Tests!! Tests!!!

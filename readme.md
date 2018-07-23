# Build a Twitter Interface

Uses Twitter’s REST API to access my Twitter profile information and render it to a user. The page automatically authenticates access to my Twitter profile. It uses this access to populate three columns on the page: my 5 most recent tweets, my 5 most recent friends, and my 5 most recent direct messages. App was created using Express, Pug, and the Twit Module. CSS was already provided as well as a sample html file for reference. JS and Pug files coded from scratch.

## Getting Started

1. Fork or clone project.
2. In the console run the "npm install" command while in the project folder.
3. Add a config.js file in the project folder with your Twitter keys and access tokens in the following format:
```
module.exports = {
  consumer_key:         'Your consumer key',
  consumer_secret:      'Your secret consumer key',
  access_token:         'Your access token',
  access_token_secret:  'Your secret access token',
  owner_id:             'Your owner id'
}
```
4. In the console run the "node app.js" command while in the project folder.
5. Open "http://localhost:3000/" in your web browser.
// list of modules required
const request = require('request');
const fs = require('fs');
const token = require('./secrets.js');

// get user input values for repo name and repo owner
const repoName = process.argv[2];
const repoOwner = process.argv[3];

let getRepoContributors = function(owner, name, callback) {

  let options = {
    url: 'https://api.github.com/repos/' + owner + '/' + name + '/contributors',
    headers: { 
      'User-Agent': 'request',
      'Authorization': `token ${token.GITHUB_TOKEN}`,
    }
  };
  // request contributors JSON data from github api    
  request(options, function(error, response, body) {
    if (error) {
      console.log('error: ', error);
      console.log('statusCode: ', response && response.statusCode);
    }

    let obj = JSON.parse(body);
    callback(obj, printCompleteMessageToConsole); // call loopThroughContributors function
  });
  
};

function loopThroughContributors(obj, callback) {

  function downloadImageByURL(url, filePath) { 
    // request individual avatars and save them to file
    request(url)
      .on('error', function(err) {
        throw err;
      })
      .pipe(fs.createWriteStream(filePath));
  }

  // cycle through contributors to get each of their avatars
  for (let i = 0; i < obj.length; i++) {
    let url = obj[i]['avatar_url'];
    let filePath = `./avatars/${obj[i]['login']}.jpg`;
    console.log(`getting avatar for: ${obj[i]['login']}`);
    downloadImageByURL(url, filePath);
  }

  callback();
}

// Log message to console once downloads are complete
function printCompleteMessageToConsole() {
  console.log('Download complete');
}

// send the function the two parameters + a callback function
getRepoContributors(repoOwner, repoName, loopThroughContributors);

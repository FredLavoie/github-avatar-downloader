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
    console.log('error: ', error);
    console.log('statusCode: ', response && response.statusCode);
            
    let obj = JSON.parse(body);
    callback(obj);  // call anonymous function of getRepoContributors function
  });
  
};

getRepoContributors(repoOwner, repoName, function(obj) {

  // cycle through contributors to get each of their avatars
  for (let i = 0; i < obj.length; i++) {
    let url = obj[i]['avatar_url'];
    let filePath = `./avatars/${obj[i]['login']}.jpg`;


    let downloadImageByURL = function(url, filePath) { 
      // request individual avatars and save them to file
      request(url)
        .on('error', function(err) {
          throw err;
        })
        .pipe(fs.createWriteStream(filePath));
    
    };
    downloadImageByURL(url, filePath);
  }
});

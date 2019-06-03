const request = require('request');
const fs = require('fs');
const token = require('./secrets.js');
const repoName = process.argv[2];
const repoOwner = process.argv[3];


let getRepoContributors = function(repoOwner, repoName, callback) {
  
  let options = {
    url: 'https://github.com/' + repoOwner + '/' + repoName + '/contributors',
    headers: { 'User-Agent': 'request' },
    Authorization: `token ${token[0]}`,
  };

  request(options, function(err, res, body) {
    callback(err, body);
  });
  
};

getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log('error', err);
  console.log('result', result);
});




// location of avatar info in JSON API for github
// imgLocation = JSON.parse(obj.owner.avatar_url)


// github token: 4e3d6b62666a38428f220f803766a5b80b44533e.pipe(fs.createWriteStream('./future.jpg'));
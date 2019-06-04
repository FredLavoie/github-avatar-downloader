const request = require('request');
const fs = require('fs');


let arr1 = 'https://sytantris.github.io/http-examples/future.jpg';
let arr2 = './avatars/fred.jpg';



let downloadImageByURL = function(url, filePath) {
    
  
  
  request(url)
    .on('error', function(err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
  
};
downloadImageByURL(arr1, arr2);

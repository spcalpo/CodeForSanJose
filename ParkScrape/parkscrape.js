// parkscrape.js - Sally Calpo <spcalpo@gmail.com>
// uses node.js and jsdom
// to install jsdom: npm install jsdom
// usage: node parkscrape.js <name of CSV file w/park names> 

var jsdom = require('jsdom');
var fs = require('fs');

// jsdom pulls html data from google search url as if accessed by userAgent
jsdom.env({
  url: 'https://www.google.com/search?q=DE+ANZA+PARK+SAN+JOSE',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
  onload: (window) => {
    // after google search results load, if not null, save to file
    var parkData = window.document.querySelector("#rhs");
    if(parkData !== null) {
      console.log(parkData.outerHTML);
    }
  },
});

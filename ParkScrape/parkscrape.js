// parkscrape.js - Sally Calpo <spcalpo@gmail.com>
// Requires node.js and jsdom
// To install jsdom: npm install jsdom

const CITY_NAME = "San Jose CA";
const CSS_SELECTOR = "#rhs_block";
const SEARCH_URL = "https://www.google.com/search?q=";
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36";

var jsdom = require('jsdom');
var fs = require('fs');

// get csv file name from cmd line
var csvFileName = process.argv[2];

// open csv file & process data
if(csvFileName !== undefined && csvFileName !== null) {
  fs.readFile(csvFileName, 'utf8', (err, csvData) => {
    if(err) {
      console.log(csvFileName + " could not be read.")
      return false;
    }
    // read row from csv file
    csvData.split('\n').forEach((csvRow, index) => {
      // skip header row and empty rows
      if(index > 0 && csvRow != '') {
        // get park name from row
        var parkName = csvRow.split(',')[0];
        // append city name & replace spaces with '+' to create search query
        var searchQuery = (parkName + ' ' + CITY_NAME).replace(/ /gi, '+');

        // jsdom pulls html data from url as if accessed by userAgent
        jsdom.env({
          url: SEARCH_URL + searchQuery,
          userAgent: USER_AGENT,
          onload: (window) => {
            // after search results load, if not null, save to file
            var parkData = window.document.querySelector(CSS_SELECTOR);
            if(parkData !== null) {
              var parkDataFileName = parkName.replace(/ /gi, '_');
              fs.writeFile(parkDataFileName + ".html", parkData.outerHTML, (err) => {
                if(err) {
                  console.log(parkDataFileName + " could not be written.");
                } 
              });
            }
          },
        });
      }
    });
  });
}
// print usage help if filename is missing
else {
  console.log("Usage: node parkscrape.js <name of CSV file w/park names>");
  return false;
}

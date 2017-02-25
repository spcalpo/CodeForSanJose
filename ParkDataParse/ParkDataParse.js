var jsdom = require('jsdom');

jsdom.env({
  url: 'https://www.google.com/search?q=DE+ANZA+PARK+SAN+JOSE',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
  onload: (window) => {
    // var parkData = window.document.documentElement;
    var parkData = window.document.querySelector(".navend");
    if(parkData !== null) {
      console.log(parkData.innerHTML);
    }
    else {
      console.log("No data found.");
    }
  },
});

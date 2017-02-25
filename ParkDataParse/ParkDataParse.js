var jsdom = require('jsdom').jsdom;

jsdom.env({
  url: 'http://www.google.com/search?q=DE+ANZA+PARK+SAN+JOSE',
  onload: (window) => {
    var parkData = window.document.querySelector("div");
    if(parkData !== null) {
      console.log(parkData.innerHTML);
    }
    else {
      console.log("No data found.");
    }
  },
});

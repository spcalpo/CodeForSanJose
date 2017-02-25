var jsdom = require('jsdom').jsdom;

jsdom.env({
  url: 'http://www.google.com/search?q=DE+ANZA+PARK+SAN+JOSE',
  done: (error, window) => {
    console.log(window.document.documentElement.innerHTML);
  },
});

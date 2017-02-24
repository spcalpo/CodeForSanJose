var http = require('http');

var request = http.request({
  hostname: 'www.google.com',
  port: 80,
  path: '/search?q=DE+ANZA+PARK+SAN+JOSE',
}, (response) => {
  response.setEncoding('utf8');
  response.on('data', (data) => {
    console.log(`${JSON.stringify(data)}`);
  });
  response.on('end', () => {
    console.log('No more data in response.');
  });
});

request.end();

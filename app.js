var menubar = require('menubar');
var express = require('express');
var request = require('request');

// Initialize Express
var app = express();

// Serve static assets
app.use(express.static('public'));

// Proxy the entire Peach API on /api/*
app.use('/api', function(req, res) {
  var url = 'https://v1.peachapi.com/' + req.url;
  req.pipe(request(url)).pipe(res);
});

/// Fire up server
app.listen(1134, function () {
  console.log('Peach server started on port 1134!');
})

// Render menubar app
var mb = menubar({icon: 'icon.png', index: 'http://localhost:1134/index.html', preloadWindow: true, height: 600})

mb.on('ready', function ready () {
  console.log('Peach app started');
})


/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /concepts              ->  index
 * POST    /concepts              ->  create
 * GET     /concepts/:id          ->  show
 * PUT     /concepts/:id          ->  update
 * DELETE  /concepts/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

// Get list of concepts
exports.index = function(req, res) {
  res.json([
  {
  name : 'Consumer Friendly',
  info : 'Let the non-technical user easily find answers with intuitive UI.'
  }, {
  name : 'Specialized',
  info : "The goal isn't to create a multi-purpose search, but a targeted set of filters for a specific purpose."
  }, {
  name : 'Smart Build System',
  info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
  name : 'Modular Structure',
  info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
  name : 'Optimized Build',
  info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
  name : 'Deployment Ready',
  info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  }
  ]);
};
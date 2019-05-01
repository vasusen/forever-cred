const routes = require('next-routes')();

routes
  .add('/creds/new', '/creds/new')
  .add('/creds/:address', '/creds/show')
  .add('/about', '/about');
  // .add('/#creds','/');
module.exports = routes;

const routes = require('next-routes')();

routes
        .add('/record/:address','/details')
        .add('/edit/:address','/edit')
        .add('/pdf/:address','/pdf')
        .add('/list/:address','/list');

module.exports = routes;

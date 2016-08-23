
'use strict';

var remove_image_content_directory = require('../functions/remove_image_content_directory.js');

// Error-Handling Middleware
function handler (config, raneto) {
  return function (err, req, res, next) {

    var status = err.status || 500;
    var page_list = remove_image_content_directory(config, raneto.getPages('/index'));

    res.status(status);
    res.render('error', {
      config     : config,
      status     : err.status,
      message    : config.lang.error[status] || err.message,
      error      : {},
      pages      : page_list,
      lang       : config.lang,
      body_class : 'page-error',
      loggedIn   : (config.authentication ? req.session.loggedIn : false)
    });

  };
}

// Exports
module.exports = handler;

'use strict';

//if this gets called, a route was hit, but something went wrong on the server. Oops.
function errorHandler(error, req, res, next){
    return res.status(error.status || 500).json({
        error: {
            message: error.message || 'Holy crap! What happened?! 😱'
        }
    });
}

module.exports = errorHandler;
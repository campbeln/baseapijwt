//##################################################
//#
//#           ** DO NOT EDIT THIS FILE **
//#
//##################################################
//# Version: 2023-04-02
'use strict';


var $jwt = require('jsonwebtoken');

module.exports = function ($app) {
    return function (oRequest, oResponse, fnContinue) {
        let sAuth = $app.resolve(oRequest, "headers.authorization") || $app.resolve(oRequest, "cookies.auth"),
            bIsLocalRequest = false //$app.type.str.cmp($app.resolve(oRequest, "headers.origin"), ["127.0.0.1", "localhost"])
        ;

        //# If an .authorization .headers is present
        if ($app.type.str.is(sAuth, true)) {
            //# If this bIsLocalRequest, ensure the sAuth is valid
            if (bIsLocalRequest) {
                if (sAuth === $app.app.config.security.localSecret) {
                    oRequest.user = { local: true };
                }
                //# Else sAuth wasn't the .localSecret, so return Unauthorized (401) and an .error
                else {
                    return oResponse.status(401).json({
                        method: "JWT",
                        error: 'Authentication required.'
                    });
                }
            }
            //# Else this is not bIsLocalRequest, so try to .verify the JWT token
            else {
                try {
                    //# .verify the JWT token, setting it into oRequest.user
                    oRequest.user = $jwt.verify(sAuth, $app.app.config.security.jwtSecret);
                }
                catch (e) {
                    //# .verify failed, so return Unauthorized (401) and an .error
                    return oResponse.status(401).json({
                        method: "JWT",
                        error: 'Authentication required.'
                    });
                }
            }
        }
        //# Else the .authorization .headers is missing, so return Unauthorized (401) and an .error
        else {
            return oResponse.status(401).json({
                method: "JWT",
                error: 'Authorization cannot be empty.'
            });
        }

        fnContinue();
    };
}; //# module.exports
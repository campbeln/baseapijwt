//##################################################
//#
//#           ** DO NOT EDIT THIS FILE **
//#
//##################################################
//# Version: 2023-04-08
'use strict';


//# Set the .exports to the Elmer route function definition
module.exports = function($elmer, $router /*, $baseRouter */) {
    //# The passed $router is created for you via a call like the one below. Or you can create your own ExpressJS-based $router as required (just be sure to return it below).
    //$router = $elmer.app.services.web.router();

    //#
    $router.elmer = {
        security: $elmer.app.config.security.jwt
    };


    //# curl -X POST http://localhost:3000/login/admin -H 'Content-Type: application/json' -d '{ "username":"cn", "password":"secret" }'
    //# curl -X POST http://localhost:3000/login/external -H 'Content-Type: application/json' -d '{ "username":"cb", "password":"nonsecret" }'
    //# curl -X POST http://localhost:3000/login/internal -H 'Content-Type: application/json' -d '{ "username":"ac", "password":"unsecret" }'
    //# curl -X POST http://localhost:3000/login/external -H 'Content-Type: application/json' -d '{ "username":"cn", "password":"secret" }'
    //# curl -X GET http://localhost:45000/example-jwt/secure -H 'Content-Type: application/json' -H 'Authorization: JWT_GOES_HERE'
    $router.get('/secure', async (oRequest, oResponse) => {
        oResponse.status(200).json({ jwt: true });
    });


    //# You can return the $router to be used for this file if it differs from either of the passed $router or $baseRouter (as they are updated by reference)
    //return $router;

    //# If you've registered your own $router, then return false so Elmer knows not to register the passed $router
    //return false;
}; //# module.exports

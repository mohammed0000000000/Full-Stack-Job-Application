const rateLimit = require("express-rate-limit")
const UnauthenticatedError = require("../errors/unauthenticated");
const {StatusCodes} = require("http-status-codes");

const LimiterOptions = rateLimit( {
    windowMs:60 * 60 * 1000, // 15 minutes
    limit:100, // Limit each Ip to 100 request per window (here, per 15 minutes)
    standardHeaders:'draft-6',// 'draft-6' --> RateLimit
    legacyHeaders:false, // Disable the `X-RateLimit` headers
    statusCode: 429,
}
);

const allowOrigins = ['http://localhost:4000','*'];

const corsOptions = {
    origins:(origin, callback) =>{
        if(allowOrigins.indexOf('origin') != -1 || !origin){
            callback(null, true)
        }
        else{
            callback(new UnauthenticatedError("Not allow by CORS to access this web site"));
        }
    },
    methods:['GET', 'POST', 'DELETE', 'PATCH'],
    credential:true,
    optionsSuccessStatus:204,
}

/*
    express rate limit
    - basic rate-limiting middleware for Express
    - Use to limit repeated requests to public APIs and or endpoint such as password reset
    - Plays nice with express-slow-down and ratelimit-header-parser
    -----------------------------------------------------------------
    helmet package
    - is middleware for Express.js application designed to enhance security by setting various HTTP headers
    - It help helps protect Express.js applications from common web vulnerability, such as cross scripting (XSS)
    - You can customize `helmet` to enable or disable specific headers based on your application's security requirements
    -------------------------------------------------------------------
    xss-clean
    - is middleware for Express.js applications designed to help prevent cross-site scripting(XSS) attack
    - it sanitizer user inputs, ensure that potentially dangerous scripts and malicious code are removed from HTTP request
    - add a layer of security for Express.js application that process user- provided data

    ---> `xss-clean` operates by sanitizing the following elements in the incoming request
    - BODY -> Remove potentially dangerous characters from the request body
    - Query Parameter -> sanitize data from the request query string
    - Header -> clean incoming headers to prevent injection attacks
    - Cookies -> sanitizes cookie values to prevent cross-site scripting
    -----------------------------------------------------------------------
    cors
    - Cross Origin Resource Sharing, is a security mechanism that allows or restricts cross-origin HTTP request
    - Ensure web applications can make request to other domains
    - It's a critical concept in web security, affecting how browsers handle interactions between different domains

    HOW CORS works
    - CORS operates through HTTP headers, which dictate the rules for cross-origin request
    - key components involved in CORS
    1) Origin
        - the origin from which a request is made
    2) preflight Request
        - For certain types of HTTP methods like ('put', 'Delete')
    3) response Headers
        - Access-Control-Allow-Origin
            -- specifics which origins are allowed to access the resource, it can be wildcard(*)
        - Access-Control-Allow-Method
            -- List the HTTP methods (get, put , patch, post, delete, etc)
        - Access-Control-Allow-Headers
            -- Specifies which headers can be included in the request
        - Access-Control-Allow-Credentials
            -- indicates whether credentials (like cookie or HTTP authentication) can be included in request
        - Access-Control-Max-Age
            -- indicates how long the preflight response can be cached
 */

module.exports = {
    corsOptions,LimiterOptions
}
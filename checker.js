module.exports = function (token, tokenURI, date) {

    // Result
    const result = { normal: token, uri: tokenURI, date: date };
    const tokenGenerator = require('./generator');

    // Validator
    if (typeof result.normal === "string") {
        if (typeof result.uri !== "string") { result.uri = encodeURIComponent(result.normal); }
    } 
    
    // Nope
    else {

        // Token Generator
        const newToken = tokenGenerator();
        result.normal = newToken.normal;
        result.uri = newToken.uri;

    }

    // Result
    return result;

};
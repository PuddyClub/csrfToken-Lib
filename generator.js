module.exports = function () {

    // Result
    const result = { normal: null, uri: null };

    // Create Token
    const keygenerator = require('keygenerator');
    result.normal = keygenerator.session_id();
    result.uri = encodeURIComponent(result.normal);

    // Complete
    return result;

};
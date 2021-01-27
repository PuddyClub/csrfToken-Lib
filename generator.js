module.exports = function () {

    // Result
    const result = { normal: null, uri: null };

    // Create Token
    const keygenerator = require('keygenerator');
    result.value = keygenerator.session_id();
    result.uri = encodeURIComponent(result.value);

    // Complete
    return result;

};
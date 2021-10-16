module.exports = async function(type = 'normal') {

    // Result
    const result = { normal: null, uri: null };

    // Create Token

    // Normal
    if (type === "normal") {
        const keygenerator = require('keygenerator');
        result.value = keygenerator.session_id();
        result.uri = encodeURIComponent(result.value);
    }

    // Complete
    return result;

};
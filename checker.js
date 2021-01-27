module.exports = function (token, tokenURI, date) {

    // Result
    const result = {
        old: { value: token, uri: tokenURI, date: date },
        new: { value: null, uri: null, date: null }
    };

    // Prepare Module
    const tokenGenerator = require('./generator');

    // Exist OLD
    if (typeof result.old.value === "string") {

        // Set New Values
        result.new.value = result.old.value;
        if (typeof result.old.uri !== "string") { result.new.uri = encodeURIComponent(result.old.value); } else {
            result.new.uri = result.old.uri;
        }
    
    }

    // Nope
    else {

        // Token Generator
        const newToken = tokenGenerator();
        result.new.value = newToken.value;
        result.new.uri = newToken.uri;

    }

    // Result
    return result;

};
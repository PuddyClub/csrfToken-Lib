module.exports = function (token, tokenURI, date) {

    // Prepare Modules
    const tokenGenerator = require('./generator');
    const moment = require('moment-timezone');

    // Result
    const result = {
        old: { value: token, uri: tokenURI, date: moment.tz(date, 'Universal') },
        new: { value: null, uri: null, date: moment.tz('Universal') }
    };

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

    // Convert Clocks to String
    result.old.date = result.old.date.format();
    result.new.date = result.new.date.format();

    // Result
    return result;

};
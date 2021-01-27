module.exports = function (token, tokenURI, date, timeToUpdate = 60) {

    // Prepare Modules
    const tokenGenerator = require('./generator');
    const moment = require('moment-timezone');

    // Result
    const result = {
        old: { value: token, uri: tokenURI, date: moment.tz(date, 'Universal') },
        new: { value: null, uri: null, date: moment.tz('Universal').subtract(timeToUpdate, 'minutes') }
    };

    // Exist OLD
    if (typeof result.old.value === "string") {

        // Keep OLD Token
        if (result.old.date.isValid() && result.new.date.isValid() && result.old.date.diff(result.new.date, 'minutes') > 0) {

            // Set Date
            result.new.date = result.old.date.clone();

            // Set New Values
            result.new.value = result.old.value;
            if (typeof result.old.uri !== "string") { result.old.uri = encodeURIComponent(result.old.value); result.new.uri = result.old.uri; } else {
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

    }

    // Nope
    else {

        // Token Generator
        const newToken = tokenGenerator();
        result.new.value = newToken.value;
        result.new.uri = newToken.uri;
        result.old.value = newToken.value;
        result.old.uri = newToken.uri;
        result.old.date = result.new.date.clone();

    }

    // Convert Clocks to String
    result.old.date = result.old.date.format();
    result.new.date = result.new.date.format();

    // Result
    return result;

};
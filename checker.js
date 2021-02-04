module.exports = function (data) {

    // Prepare Modules
    const tokenGenerator = require('./generator');
    const moment = require('moment-timezone');
    const _ = require('lodash');

    // Config
    const tinyCfg = _.defaultsDeep({}, data, {
        value: null,
        uri: null,
        date: null,
        timeoutUpdate: 60,
        timeoutType: 'minutes'
    });

    // Result
    const result = {
        changed: false,
        now: { value: tinyCfg.value, uri: tinyCfg.uri },
        new: { value: null, uri: null }
    };

    // Exist Time
    if (typeof tinyCfg.timeoutUpdate === "number" && !isNaN(tinyCfg.timeoutUpdate) && isFinite(tinyCfg.timeoutUpdate) && tinyCfg.timeoutUpdate > -1) {
        result.now.date = moment.tz(tinyCfg.date, 'Universal');
        result.new.date = moment.tz('Universal').subtract(tinyCfg.timeoutUpdate, tinyCfg.timeoutType);
    }

    // Exist OLD
    if (typeof result.now.value === "string") {

        // Keep OLD Token
        if (
            (!result.now.date && !result.new.date) ||
            (result.now.date.isValid() && result.new.date.isValid() && Math.abs(result.now.date.diff(result.new.date, tinyCfg.timeoutType)) < tinyCfg.timeoutUpdate)
        ) {

            // Set Date
            result.new.date = result.now.date.clone();

            // Set New Values
            result.new.value = result.now.value;
            if (typeof result.now.uri !== "string") { result.now.uri = encodeURIComponent(result.now.value); result.new.uri = result.now.uri; } else {
                result.new.uri = result.now.uri;
            }

        }

        // Nope
        else {

            // Token Generator
            const newToken = tokenGenerator();
            result.new.value = newToken.value;
            result.new.uri = newToken.uri;

            // Value Changed
            result.changed = true;

        }

    }

    // Nope
    else {

        // Token Generator
        const newToken = tokenGenerator();
        result.new.value = newToken.value;
        result.new.uri = newToken.uri;
        result.now.value = newToken.value;
        result.now.uri = newToken.uri;
        result.now.date = result.new.date.clone();

        // Value Changed
        result.changed = true;

    }

    // Convert Clocks to String
    result.now.date = result.now.date.format();
    result.new.date = result.new.date.format();

    // Result
    return result;

};
// https://stackoverflow.com/questions/34212039/redirect-to-firebase-hosting-custom-domain
module.exports = function(varname = 'csrfToken', timeoutUpdate = 60, timeoutType = 'minutes', type = 'normal') {
    return async(req, res, next) => {

        // Prepare New Session
        const sessionGenerator = require('../checker');
        const newSession = await sessionGenerator({
            type: type,
            value: req.session[varname],
            uri: req.session[varname + '_uri'],
            date: req.session[varname + '_date'],
            timeoutUpdate: timeoutUpdate,
            timeoutType: timeoutType
        });

        // Exist Session
        if (newSession) {

            // Set Session
            req.session[varname] = newSession.new.value;
            req.session[varname + '_uri'] = newSession.new.uri;
            req.session[varname + '_date'] = newSession.new.date;

            // Set csrfToken Object
            req.csrfToken = newSession;

        }

        // Nope
        else {

            // Set Session
            req.session[varname] = null;
            req.session[varname + '_uri'] = null;
            req.session[varname + '_date'] = null;

            // Set csrfToken Object
            req.csrfToken = { now: {}, new: {} };

        }

        // Complete
        return next();

    };
};
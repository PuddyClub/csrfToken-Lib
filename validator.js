module.exports = function (tokenOrigin, tokenToValidate, allowBlankTokenOrigin = false) {

    // Exist Token Origin
    if (typeof tokenOrigin === "string" && tokenOrigin.length > 0) {

        // Check Token
        if (typeof tokenToValidate === "string" && tokenToValidate.length > 0 && tokenOrigin === tokenToValidate) { return true; }

        // Nope
        else { return false; }

    }

    // Allow Blank Token Origin
    else if (allowBlankTokenOrigin) { return true; }

    // Nope
    else { return false; }

};
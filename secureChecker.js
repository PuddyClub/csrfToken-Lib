module.exports = function (req, data) {
    
    // Validator
    if (

        // No XMLHttpRequest
        !req.xhr

    ) {

        // Complete
        return require('./checker')(data);
   
    }

    // Nope
    else { return null; }

};
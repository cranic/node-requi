var p = require('path');

/**
 * Function used to require files based on engines and a list of paths.
 *
 * @method requireFiles
 * @for Requi
 * @private
 * @param {Array} paths An array with the paths to be required
 * @param {Object} engines An object with all engines used
 * @return {Object} An object with the required files
 */
module.exports = function(paths, engines){
    var ret = {};
    paths.forEach(function(path){
        var ext = p.extname(path);
        var engine = engines[ext];

        if(!engine)
            throw new Error('Cannot require file \'' + path + '\' because there is no engine registered for it\'s extension');

        ret[path] = engine.call(null, path);
    });

    return ret;
};

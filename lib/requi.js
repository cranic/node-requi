var findFiles = require(__dirname + '/findFiles');
var filterFiles = require(__dirname + '/filterFiles');
var requireFiles = require(__dirname + '/requireFiles');
var cleanFiles = require(__dirname + '/cleanFiles');

/**
 * Main class
 *
 * @class Requi
 * @param {Object} opts The configuration object
 * @param {Object} opts.engines An object with the engines that can be used to require
 * @param {Array} opts.whiteList An Array whit the allowed extensions
 * @param {Array} opts.blackList An Array whit the dennied extensions
 * @param {Function} opts.filter A function used to allow or deny files
 * @param {Function} opts.rename A function used to rename the files in the returned object
 * @param {Boolean} opts.recurcive Allow or not to find files recursively
 * @param {Boolean} opts.clearPath Allow or not to clear the path from the name
 * @param {Boolean} opts.clearExt Allow or not to clear the extension from the name
 * @public
 * @return {Object} An object with all files required.
 */
var Requi = function(paths, opts){
    if(!(this instanceof Requi))
        return new Requi(paths, opts);

    /**
     * This is the main configuration object, all default values should be
     * listed here
     *
     * @property options
     * @private
     * @type {Object}
     */
    var options = {
        engines : {
            '.json' : require,
            '.js' : require
        },
        whiteList : ['.json', '.js'],
        blackList : [],
        filter : null,
        rename : null,
        recursive : false,
        clearPath : true,
        clearExt : true,
        path : paths
    };

    if(opts){

        // Merging engines
        if(opts.engines)
            Object.keys(opts.engines).forEach(function(key){
                options.engines[key] = opts.engines.key;
            });

        // Merging the rest of the options
        Object.keys(opts).forEach(function(key){
            if(key !== 'engines')
                options[key] = opts[key];
        });
    }

    if(!options.path || !(typeof options.path === 'string' || Array.isArray(options.path)))
        throw new Error('You must provide a path as a string or as an array of paths');

    // Starting the proccess
    var files = findFiles.apply(null, [
        options.path,
        options.recursive
    ]);

    files = filterFiles.apply(null, [
        files,
        options.filter,
        options.whiteList,
        options.blackList
    ]);

    var obj = requireFiles.apply(null, [
        files,
        options.engines
    ]);

    files = cleanFiles.apply(null, [
        files,
        options.path,
        options.rename,
        options.clearPath,
        options.clearExt
    ]);

    var ret = {};

    Object.keys(obj).forEach(function(key, idx){
        ret[files[idx]] = obj[key];
    });

    return ret;

};

module.exports = Requi;

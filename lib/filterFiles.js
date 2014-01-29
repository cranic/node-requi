var p = require('path');

/**
 * Private method used to filter files.
 *
 * @method filterFiles
 * @private
 * @for Requi
 * @param {Array} files An array with the paths to filter.
 * @param {Function} filter A function used to filter those paths.
 * @param {Array} whiteList An array containing the allowed extensions.
 * @param {Array} blackList An array containing the denied extensions.
 * @return {Array} An array with the filtered paths.
 */
module.exports = function(files, filter, whiteList, blackList){
    var ret = [];

    files.forEach(function(file, idx){
        var remove = false;

        if(whiteList && whiteList.length && whiteList.indexOf(p.extname(file)) === -1)
            remove = true;

        if(blackList && blackList.length && blackList.indexOf(p.extname(file)) !== -1)
            remove = true;

        if(filter && typeof filter === 'function' && !filter.call(null, file))
            remove = true;

        if(!remove)
            ret.push(file);
    });

    return ret;
};

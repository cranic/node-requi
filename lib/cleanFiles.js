var p = require('path');

/**
 * Function used to clean the names in the required object
 *
 * @method cleanFiles
 * @private
 * @for Requi
 * @param {Array} files An array containing all names that have been required
 * @param {Array | String} path The original path from where the files come from
 * @param {Function} rename A function that can be used to rename the files
 * @param {Boolean} clearPath Allow or not to clean the path inside the names
 * @param {Boolean} clearExt Allow or not to clean the extension inside the names
 */
module.exports = function(files, path, rename, clearPath, clearExt){
    _files = files.slice(0);
    var paths = [];
    if(Array.isArray(path))
        path.forEach(function(path){
            paths.push(path);
        });
    else
        paths.push(path);

    _files.forEach(function(file, idx){
        if(clearPath)
            paths.forEach(function(path){
                var norm = p.normalize(path);
                if(file.indexOf(norm) === 0){
                    var newName = file.split(norm)[1];
                    if(newName.charAt(0) == p.sep)
                        newName = newName.substring(1);

                    file = _files[idx] = newName;
                }
            });

        if(clearExt){
            var ext = p.extname(file).split('.');
            if(ext.length > 1 && file.indexOf(ext.join('.')) !== 0){
                var pieces = file.split('.');
                var renamed = pieces.splice(0, (pieces.length - 1)).join('.');
                if(_files.indexOf(rename) === -1)
                    _files[idx] = renamed;
            }
        }

        if(typeof rename === 'function')
            _files[idx] = rename.call(null, file);
    });

    return _files;
};

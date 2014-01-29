var p = require('path');
var fs = require('fs');

/**
 * Private method used to find files within the given path.
 *
 * @method findFiles
 * @for Requi
 * @private
 * @param {String | Array} path A string or an array containing the path to search.
 * @param {Boolen} recursive If the search needs to be recusive or not.
 * @return {Array} An array with all files found.
 */
module.exports = function(path, recursive){
    var files = [];
    var dirs = [];

    if(Array.isArray(path))
        path.forEach(function(path){
            dirs.push(path);
        });
    else
        dirs.push(path);

    var originals = dirs.slice(0);

    var it = function(){
        if(!dirs.length)
            return;

        var dir = dirs.splice(0, 1)[0];
        var arr = fs.readdirSync(dir).forEach(function(path){
            var norm = p.join(dir, path);
            var stat = fs.statSync(norm);
            if(stat.isDirectory()){
                if(recursive)
                    dirs.push(norm);
            } else
                files.push(norm);
        });

        it();
    };

    it();

    return files;
};

/* File listing class.
 *
 * @class
 * @author Alan Hoffmeister <contato@cranic.com.br>
 * @version 0.0.1
 * @license MIT <http://opensource.org/licenses/MIT>
 * @date 2013-01-30 20:16 GTM -3
 */

var fs = require('fs');


/* Constructor from the file listing helper
 *
 * @constructor
 * @return Object The main context
 */
var ListFiles = function(){
    return this;
};

ListFiles.prototype.readdirSync = function(path){
    var root = fs.realpathSync(path);
    var output = {};
    fs.readdirSync(root).forEach(function(path, index){
        var info = fs.statSync(root + '/' + path);
        if(!info.isDirectory())
            output[path] = root + '/' + path;
    }, this);
    return output;
};

ListFiles.prototype.readdirSyncRecursive = function(path){
    var root = this.path = fs.realpathSync(path);
    var folders = [];
    var output = {};

    fs.readdirSync(root).forEach(function(path, index){
        var info = fs.statSync(root + '/' + path);
        if(info.isDirectory()){
            folders.push(path);
        } else {
            output[path] = root + '/' + path;
        }
    }, this);

    var iterator = function(path, index){
        var info = fs.statSync(root + '/' + this.folder + '/' + path);
        if(info.isDirectory()){
            folders.push(this.folder + '/' + path);
        } else {
            output[this.folder + '/' + path] = root + '/' + this.folder + '/' + path;
        }
    };

    while(folders.length > 0){
        var folder = folders.splice(0,1)[0];
        var iteration = fs.readdirSync(root + '/' + folder);

        this.folder = folder;
        iteration.forEach(iterator, this);
    }

    return output;
};

module.exports = new ListFiles();
/* This is how we strip and/or rename the object keys that
 * folderize will return.
 *
 * @author Alan Hoffmeister <contato@cranic.com.br>
 * @version 0.0.1
 * @license MIT <http://opensource.org/licenses/MIT>
 * @date 2013-01-31 20:19 GTM -3
 */

var folderize = require('..');

var required = folderize({
    'path' : __dirname + '/../test/dummy',
    'stripExtension' : true, // It's true by default, now required[file_one.js] will be required[file_one]
    'rename' : function(name){
        // You need to pass a function that receive the name and return a string.
        return name.replace('file', 'FILE'); // required[file_one] is now required[FILE_one]

        // You can also return falsy values, so the name won't be changed...
        // return false;
    }
});

console.log(required);
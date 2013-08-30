/* This file is an example of how to filter the files that will be required.
 *
 * @author Alan Hoffmeister <contato@cranic.com.br>
 * @version 0.0.1
 * @license MIT <http://opensource.org/licenses/MIT>
 * @date 2013-01-31 20:27 GTM -3
 */

var folderize = require('..');

var required = folderize({
    'recursive' : true,
    'path' : __dirname + '/../test/dummy',
    'stripExtension' : true,
    'whiteList' : /.js/, // just allow files that have .js in the name
    'blackList' : /.json/, // but don't allow .json
    'filter' : function(name, path){ // and remove all file_one
        if(name.indexOf('file_one') !== -1)
            return false;
        else
            return true;
    }
});

// The workflow of this module for filtering the files is the follow:
//     1 - If whiteList was specified, than remove everything that *doesn't match* the regex.
//     2 - If the blackList was specified, than remove everything that *match* the regex and passed step 1.
//     3 - If the filter was specified than run the function against every file that passed step 1 and 2, if
//         the return is falsy, remove it.
//     4 - Proceed to rename.

console.log(required);
/* Example how to require all files recursively inside a folder
 *
 * @author Alan Hoffmeister <contato@cranic.com.br>
 * @version 0.0.1
 * @license MIT <http://opensource.org/licenses/MIT>
 * @date 2013-01-30 19:18 GTM -3
 */

var requi = require('..');

var required = requi({
    'recursive' : true,
    'path' : __dirname + '/../test/dummy'
});

console.log(required);
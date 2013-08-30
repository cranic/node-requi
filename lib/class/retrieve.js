/* File retrievement function.
 *
 * @author Alan Hoffmeister <contato@cranic.com.br>
 * @version 0.0.1
 * @license MIT <http://opensource.org/licenses/MIT>
 * @date 2013-01-30 20:13 GTM -3
 */

var list = require('../helper/listFiles');

var Retrieve = function(){
    var recursive = this.config.get('recursive');
    var path = this.config.get('path');

    if(recursive)
        this.data = list.readdirSyncRecursive(path);
    else
        this.data = list.readdirSync(path);
};

module.exports = Retrieve;
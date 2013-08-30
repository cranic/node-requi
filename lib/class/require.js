/* File requiriment function.
 *
 * @author Alan Hoffmeister <contato@cranic.com.br>
 * @version 0.0.1
 * @license MIT <http://opensource.org/licenses/MIT>
 * @date 2013-01-31 11:00 GTM -3
 */

var Require = function(){
    Object.keys(this.data).forEach(function(name){
        this.output[name] = require(this.data[name]);
    }, this);
};

module.exports = Require;
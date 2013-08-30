/* File filtering function.
 *
 * @author Alan Hoffmeister <contato@cranic.com.br>
 * @version 0.0.1
 * @license MIT <http://opensource.org/licenses/MIT>
 * @date 2013-01-30 19:18 GTM -3
 */

var Filter = function(){
    var old = JSON.parse(JSON.stringify(this.data));
    var whiteList = this.config.get('whiteList');
    var blackList = this.config.get('blackList');
    var filter = this.config.get('filter');

    Object.keys(old).forEach(function(name){
        if(whiteList instanceof RegExp && typeof this.data[name] !== 'undefined' && !whiteList.test(this.data[name]))
            delete(this.data[name]);
    
        if(blackList instanceof RegExp && typeof this.data[name] !== 'undefined' && blackList.test(this.data[name]))
            delete(this.data[name]);

        if(typeof filter === 'function' && typeof this.data[name] !== 'undefined' && !filter.apply(null, [name, this.data[name]]))
            delete(this.data[name]);
    }, this);
};

module.exports = Filter;
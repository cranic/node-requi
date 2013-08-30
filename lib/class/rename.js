/* File renaming function.
 *
 * @author Alan Hoffmeister <contato@cranic.com.br>
 * @version 0.0.1
 * @license MIT <http://opensource.org/licenses/MIT>
 * @date 2013-01-31 11:00 GTM -3
 */

var Name = function(){
    var strip = this.config.get('stripExtension');
    var rename = this.config.get('rename');
    var obj = JSON.parse(JSON.stringify(this.data));

    Object.keys(obj).forEach(function(name){
        var fileName = name;
        var oldVal = this.data[name];

        if(strip && name.split('/').pop().split('.').length >= 2){
            fileName = name.substr(0, name.lastIndexOf('.'));
        }

        if(typeof rename === 'function')
            fileName = rename.call(null, fileName) || fileName;

        if(fileName !== name){
            delete this.data[name];
            this.data[fileName] = oldVal;
        }


    }, this);

};

module.exports = Name;

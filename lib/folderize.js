/* Main folderize class.
 *
 * @author Alan Hoffmeister <contato@cranic.com.br>
 * @version 0.0.1
 * @license MIT <http://opensource.org/licenses/MIT>
 * @date 2013-01-30 19:18 GTM -3
 */

var retrieve = require('./class/retrieve');
var filter = require('./class/filter');
var rename = require('./class/rename');
var requirement = require('./class/require');

var $ = {
    'config': {},
    'output': {},
    'data': {}
};

$.config.data = {
    'recursive': false,
    'path': null,
    'stripExtension': true,
    'whiteList': null,
    'blackList': null,
    'rename': null,
    'filter': null
};

$.config.get = function(node) {
    if (node)
        return $.config.data[node];

    return $.config.data;
};

$.config.set = function(data) {
    Object.keys($.config.data).forEach(function(key) {
        if (typeof data[key] !== 'undefined')
            $.config.data[key] = data[key];
    });
};

$.reset = function() {
    $.output = {};
    $.data = {};

    $.config.set({
        'recursive': false,
        'path': null,
        'stripExtension': true,
        'whiteList': null,
        'blackList': null,
        'rename': null,
        'filter': null
    });
};

var Folderize = function(config) {
    $.reset();
    $.config.set(config);

    retrieve.apply($);
    filter.apply($);
    rename.apply($);
    requirement.apply($);

    return $.output;
};

module.exports = Folderize;

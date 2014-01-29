var assert = require('assert');
var fs = require('fs');
var requireFiles = require(__dirname + '/../lib/requireFiles');
var files = [
    __dirname + '/moch/custom_test.txt',
    __dirname + '/moch/json_test.json',
    __dirname + '/moch/test.js'
];

describe('requireFiles testing', function(){

    describe('Structure type', function(){
        it('requireFiles should be a function', function(){
            assert.equal(typeof requireFiles, 'function');
        });
    });

    describe('Error', function(){
        it('Should throw error when an engine isn\'t supported', function(){
            assert.throws(function(){
                requireFiles(files, {
                    '.js' : require,
                    '.json' : require
                });
            }, /there is no engine registered/);
        });

        it('Should not throw an error when everything is ok', function(){
            assert.doesNotThrow(function(){
                result = requireFiles(files.slice(1, 3), {
                    '.js' : require,
                    '.json' : require
                });
            });
        });
    });

    describe('Custom engine', function(){
        it('Custom engines should work', function(){
            var result = requireFiles(files, {
                '.js' : require,
                '.json' : require,
                '.txt' : function(path){
                    return fs.readFileSync(path).toString();
                }
            });

            assert.equal(result[files[0]], 'worked\n');
            assert.equal(result[files[1]].worked, true);
            assert.equal(result[files[2]], 'worked');
        });
    });
});

var assert = require('assert');
var cleanFiles = require(__dirname + '/../lib/cleanFiles');
var path = require('path');
var files = [
    '/home/requi/index.js',
    '/home/requi/another.json',
    '/home/requi/test.txt'
];

describe('cleanFiles testing', function(){

    describe('Structure type', function(){
        it('cleanFiles should be a function', function(){
            assert.equal(typeof cleanFiles, 'function');
        });
    });

    describe('Cleaning files', function(){
        it('Renaming should work', function(){
            var result = cleanFiles(files, null, function(path){
                if(path === '/home/requi/index.js')
                    return 'renamed';
                else
                    return path;
            });
            assert.equal(result[0], 'renamed');
        });

        it('clearPath should work', function(){
            var result = cleanFiles(files, '/home/requi', null, true);
            assert.equal(result[0], 'index.js');
        });

        it('clearExt should work', function(){
            var result = cleanFiles(files, null, null, null, true);
            assert.equal(result[0], '/home/requi/index');
        });
    });
});

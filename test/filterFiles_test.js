var assert = require('assert');
var filterFiles = require(__dirname + '/../lib/filterFiles');
var path = require('path');
var files = [
    '/home/requi/index.js',
    '/home/requi/another.json',
    '/home/requi/test.txt'
];

describe('filterFiles testing', function(){

    describe('Structure type', function(){
        it('filterFiles should be a function', function(){
            assert.equal(typeof filterFiles, 'function');
        });
    });

    describe('Filtering files', function(){
        it('Filter should work', function(){
            var result = filterFiles(files, function(path){
                if(path === '/home/requi/index.js')
                    return false;
                else
                    return true;
            });

            assert.notEqual(result[0], '/home/requi/index.js');
        });

        it('whiteList should work', function(){
            var result = filterFiles(files, null, ['.txt']);

            assert.equal(result[0], '/home/requi/test.txt');
        });

        it('blackList should work', function(){
            var result = filterFiles(files, null, null, ['.js', '.json']);

            assert.equal(result[0], '/home/requi/test.txt');
        });
    });
});

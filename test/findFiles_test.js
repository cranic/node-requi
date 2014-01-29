var assert = require('assert');
var findFiles = require(__dirname + '/../lib/findFiles');
var path = require('path');

describe('findFiles testing', function(){

    describe('Structure type', function(){
        it('findFiles should be a function', function(){
            assert.equal(typeof findFiles, 'function');
        });
    });

    describe('Finding files', function(){
        it('Should find files', function(){
            var files = findFiles(__dirname + '/../lib');
            assert.notEqual(files.indexOf(path.normalize(__dirname + '/../lib') + '/findFiles.js'), -1);
        });

        it('Should find files recursively', function(){
            var files = findFiles(__dirname + '/../', true);
            assert.notEqual(files.indexOf(path.normalize(__dirname + '/../lib') + '/findFiles.js'), -1);
        });
    });
});

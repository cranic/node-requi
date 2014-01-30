var assert = require('assert');
var requi = require(__dirname + '/../');

describe('Requi testing', function(){

    describe('Structure type', function(){
        it('Requi should be a function', function(){
            assert.equal(typeof requi, 'function');
        });
    });

    describe('Errors', function(){
        it('Calling Requi without a path should throw', function(){
            assert.throws(function(){
                requi();
            }, /provide a path/);
        });

        it('Calling Requi with a string as the path should not throw', function(){
            assert.doesNotThrow(function(){
                requi(__dirname + '/../lib');
            });
        });

        it('Calling Requi with an array as the path should not throw', function(){
            assert.doesNotThrow(function(){
                requi([__dirname + '/../lib', __dirname + '/moch']);
            });
        });
    });
});

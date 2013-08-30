var assert = require('assert');
var requi = require('..');

describe('Main constructor', function(){
    it('Should be a function.', function(){
        assert.equal(typeof requi, 'function');
    });
});

describe('recursive option', function(){
    it('Should include all files recursively.', function(){
        var obj = {
            file_two : { file_two : 'json' },
            file_one : 'file_one.js',
            'level_two/file_four' : 'file_four.js',
            'level_two/file_three' : 'file_three.js',
            'level_two/level_three/file_five' : 'file_five.js'
        };

        var required = requi({
            'path' : __dirname + '/dummy',
            'recursive' : true
        });

        assert.deepEqual(required, obj);
    });

    it('Should not be recursive if set to false.', function(){
        var obj = {
            file_two : { file_two: 'json' },
            file_one : 'file_one.js'
        };

        var required = requi({
            'path' : __dirname + '/dummy',
            'recursive' : false
        });

        assert.deepEqual(required, obj);
    });
});

describe('stripExtension option', function(){
    it('Should strip off extensions if set to true.', function(){
        var obj = {
            file_two : { file_two: 'json' },
            file_one : 'file_one.js'
        };

        var required = requi({
            'path' : __dirname + '/dummy',
            'stripExtension' : true
        });

        assert.deepEqual(required, obj);
    });

    it('Should not strip off extensions if set to false.', function(){
        var obj = {
            'file_two.json' : { file_two: 'json' },
            'file_one.js' : 'file_one.js'
        };

        var required = requi({
            'path' : __dirname + '/dummy',
            'stripExtension' : false
        });

        assert.deepEqual(required, obj);
    });
});

describe('whiteList option', function(){
    it('Should include only whitelisted files.', function(){
        var obj = {
            file_two : { file_two: 'json' }
        };

        var required = requi({
            'path' : __dirname + '/dummy',
            'whiteList' : /.json/
        });

        assert.deepEqual(required, obj);
    });
});

describe('blackList option', function(){
    it('Should not include blacklisted files.', function(){
        var obj = {
            'file_one' : 'file_one.js'
        };

        var required = requi({
            'path' : __dirname + '/dummy',
            'blackList' : /.json/
        });

        assert.deepEqual(required, obj);
    });
});

describe('filter option', function(){
    it('Should remove files that returned falsy value from the function.', function(){
        var obj = {
            file_two : { file_two: 'json' }
        };

        var required = requi({
            'path' : __dirname + '/dummy',
            'filter' : function(name, path){
                if(name.indexOf('file_one') === -1)
                    return true;
            }
        });

        assert.deepEqual(required, obj);
    });
});

describe('rename option', function(){
    it('Should rename files when returning a string.', function(){
        var obj = {
            file_two : { file_two: 'json' },
            'rename_one' : 'file_one.js'
        };

        var required = requi({
            'path' : __dirname + '/dummy',
            'rename' : function(name){
                if(name === 'file_one')
                    return 'rename_one';
            }
        });

        assert.deepEqual(required, obj);
    });
});
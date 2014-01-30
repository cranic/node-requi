var requi = require(__dirname + '/../');

var myModules = requi(__dirname + '/../test/moch', {
    clearPath : true,
    recursive : true
});

console.log(myModules);

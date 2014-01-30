[![Build Status](https://travis-ci.org/cranic/node-requi.png)](https://travis-ci.org/cranic/node-requi) [![Dependencies Status](https://david-dm.org/cranic/node-requi.png)](https://david-dm.org/cranic/node-requi) [![Gittip](http://img.shields.io/gittip/cranic.png)](https://www.gittip.com/cranic)

[![NPM Status](https://nodei.co/npm/requi.png?downloads=true)](http://npmjs.org/package/requi)

## Requi

Requi is a simple `require` on steroids, featuring custom engines, recursive
require, filters, renaming and other features.

### How to use

Install it on your project with `npm install --save requi`, required it and
you are ready to go.

```javascript
// Require all .js and .json files inside ./lib folder.
var requi = require('requi');
var allMyLibs = requi('./lib');
```

Now image that the folder `lib` contains the fallowing structure:

```
- lib
  - libA.js
  - libB.js
  - config.json
```

You are now able to acess your libraries inside the `allMyLibs` variables using
`allMyLibs.libA`, or maybe `allMyLibs.config`, if you had a subfolder inside `lib`
folder and you activated `recursive : true`, than you can access it like
`allMyLibs['subfolder/otherLib']`.

### Custom Engines

By default Requi only allow `.js` and `.json` files to be required, but you can
use it to require other kind of files, let's se how we can require text files :)

```javascript
var fs = require('fs');
var requi = require('requi');
var myTexts = requi('./texts', {
    recursive : true,
    whiteList : ['.txt'],
    engines : {
        '.txt' : function(path){
            return fs.readFileSync(path).toString();
        }
    }
});
```

Now `myTexts` should contain an object whit all texts inside the folder, you
can do this for `YAML`, `CoffeeScript` and all kind of files.

### Options

You can pass an object with options as the second argument to Requi, here is a
description with all options that you can use:

* __engines__: an object with the extension name and a function to require files
matching that extension. Default: `{'.json' : require , '.js' : require}`

* __whiteList__: an array whit the extensions that can be required.
Default:  `['.json', '.js']`

* __blackList__: an array whit the extensions that cannot be required.
Default: `[]`

* __filter__: A function that receive the path of the file and returns `true`
or `false`, files that return `false` whon't be required. Default: `null`

* __rename__: A function that receive the path of the file and need to return
a string, that string will be the key of the required object at the end.
Default: `null`

* __recursive__: A boolean that indicates if Requi needs to be recursive or
not. Default: `false`

* __clearPath__: A boolean that indicates if Requi should cut off the path of
the key name. Default: `true`

* __clearExt__: A boolean that indicates if Requi should cut off the extension
of the key name. Default: `true`


### License (MIT)

The MIT License (MIT)

Copyright (c) 2014 Cranic Tecnologia <contato@cranic.com.br>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.



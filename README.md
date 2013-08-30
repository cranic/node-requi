# Requi

Lots of things to require from inside your script? That's not a problem anymore.
Requi is here to help you dinamically require scripts. You have the power to
filter, blacklist, whitelist and even rename the scripts that you wan't to
require.

#### Installing

With a simple `npm install --save requi` you can start using it in your
project.

#### Using

The use of Requi is very straightforward and easy:

```js
var requi = require('requi');
var requirements = requi({
   path : '/path/to/files'
});
```
Or you can skip a variable creation by calling it directly after `require()`:

```js
var requirements = require('requi')({
   path : '/path/to/files'
});
```
Now your `requirements` should be an object containing the name of the files
that matched your options and the included object as the value.

Take this file tree as an example:

```txt
 - /my/project/lib
   - file_one.js
   - file_two.js
   - file_three.js
```

You can require all files by calling Requi:

```js
var requirements = require('requi')({
   path : '/my/project/lib'
});
```

Now your `requirements` whould be something like this:

```js
{
    file_one : [Object],
    file_two : [Object],
    file_three : [Object]
}
```

#### Options

You can pass a list of options when calling Requi, here is what every option do:

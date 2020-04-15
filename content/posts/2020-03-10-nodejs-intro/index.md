---
title: Getting Started with Node.js
author: Ashwin
date: 2020-03-10
hero: ./images/cover.jpeg
excerpt: A short introduction to the world of asynchronous programming and Node.js
---


## What is Node.js?

Node.js is a Cross-Platform Runtime Environment for Server-side and Open Source which is written in JavaScript. In summary, NodeJS is a platform written in JavaScript for Web Server.

A common task for a web server can be to open a file on the server and return the content to the client.

Here is how PHP or ASP handles a file request:
 - Sends the task to the computer's file system.
 - Waits while the file system opens and reads the file.
 - Returns the content to the client.
 - Ready to handle the next request.

Here is how Node.js handles a file request:
 - Sends the task to the computer's file system.
 - Ready to handle the next request.
 - When the file system has opened and read the file, the server returns the content to the client.

Node.js eliminates the waiting and simply continues with the next request.

> Node.js uses **Asynchronous Programming**, we'll get back to this in due course.


## Downloading and Installing Node.js

Installing Node.js is very easy. Just go to the [Node.js website](https://nodejs.org/en/download/), select the corresponding OS and follow the guide.

To check if the installation was successful, open terminal and check the version as follows

```javascript
node -v
```
It should return something like this

```text
v13.7.0
```
_Note: The version number may be different_

Check the npm version as well

```javascript
npm -v
```
It should return something like this

```text
6.13.6
```
_Note: The version number may be different_

> When we install Node.js, the npm(Node Package Manager) comes along with it.


## Exploring Node.js

Once the installation of Node.js is complete, the next step is to type the command `node` in the terminal. You can run JavaScript commands on the terminal as follows

```javascript
$ node
Welcome to Node.js v13.7.0.
Type ".help" for more information.
> console.log("Hello, World!");
Hello, World!
undefined
> function sayHi() { return "Hi!"; };
undefined
> sayHi();
'Hi!'
> 10 + 10
20
```

Or test by creating a JavaScript file such as test.js and then adding the following code

```javascript
console.log('Hello, World!');
function sayHi() {
  return 'Hi!';
}

console.log(sayHi());
```

The command to allow Node to run a JavaScript file is `node FILENAME` like below

```javascript
node test.js
```

The result will be as follows

```javascript
Hello, World!
Hi!
```

Next, go to the [guides section](https://nodejs.org/en/docs/guides/getting-started-guide/) in the Node.js website and you will see an example code, for displaying the word 'Hello World' as follows:

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Create a file named app.js containing the above contents, then run it on the command line with the command:

```javascript
node app.js
```

Visit http://localhost:3000 and you will see a message saying "Hello World".

Meaning of some keywords:
 - `require('http')` : Imports the http module which is the main module of Node.js
 - `createServer()` : Creates a server with the parameters request and response
 - `.setHeader()` : To specify the content type
 - `.end()` : Is the end of the response and the word "Hello World"
 - `.listen()` : To set the port and hostname of the Web Server (Hostname is optional)


## First project with the fs module

Now, let's start the process of writing Node.js using the built-in module called fs (File System).

We'll create a project folder with two files, namely:
 - **package.json**: A file that specifies the project name, version of our project, as well as other dependencies.
 - **app.js**: The main file where the code will be written. (Give any name)

The file **package.json** uses the JSON format and forces you to specify name and version every time. Other values ​​are optional. For example:

```javascript
{
  "name": "hello-node",
  "version": "0.0.1"
}
```

> We can also use `npm init` to create the **package.json** file.

### Write file

```javascript
var fs = require('fs');

fs.writeFile('message.txt', 'Hello Node.js', 'utf8', (err) => {
  if (err) throw err;

  console.log('The file has been saved!');
});
```

Run `node app.js` to see that there is a file **message.txt** created with the content 'Hello Node.js'.

`fs.writeFile(filename, data, encoding, callback)`: Will accept the first parameter as the file name, the second parameter is the information to write to a file, the third parameter is the encoding (default value is _utf8_) and the last parameter will be a callback function.

When `file` is a filename, asynchronously writes data to the file, replacing the file if it already exists. `data` can be a string or a buffer.

When `file` is a file descriptor, the behaviour is similar to calling `fs.write()` directly (which is recommended).

The `encoding` option is ignored if `data` is a buffer. For example:

```javascript
var fs = require('fs');

const data = new Uint8Array(Buffer.from('Hello Node.js'));

fs.writeFile('message.txt', data, (err) => {
  if (err) throw err;
  
  console.log('The file has been saved!');
});
```

> It is unsafe to use `fs.writeFile()` multiple times on the same file without waiting for the callback. For this scenario, `fs.createWriteStream()` is recommended. Refer to the docs for more information.

### Read File

Try editing the _message.txt_ file by adding some text and then use the example below to read this file

```javascript
var fs = require('fs');

fs.readFile('message.txt', (err, data) => {
  if (err) throw err;
  
  console.log(data);
});
```
The `.readFile()` asynchronously reads the entire content of a file.

The callback is passed two arguments `(err, data)`, where `data` is the content of the file.

If no encoding is specified, then the raw buffer is returned.

If `options` is a string, then it specifies the encoding:

```javascript
fs.readFile('/etc/passwd', 'utf8', callback);
```

When the path is a directory, the behavior of `fs.readFile()` and `fs.readFileSync()` is platform-specific. On macOS, Linux, and Windows, an error will be returned. On FreeBSD, a representation of the directory's contents will be returned.

> The `fs.readFile()` function buffers the entire file. To minimize memory costs, when possible prefer streaming via `fs.createReadStream()`. Refer to the docs for more information.

## Callback Function

You might be wondering what is a callback function, why it is used,... etc.

Before we define callbacks, we need to understand why they even exist. They exist because of Node’s asynchronous nature. What everybody knows about asynchronous programming is that it’s “better” but “harder”.

OK, that last sentence is slightly over-simplistic.

Let’s dive in a little deeper and compare code written synchronously with its asynchronous counterpart.

```javascript
// This is synchronous.
function processData() {
    let data = fetchData();
    data += 1;
    return data;
}

// This is asynchronous.
function processData(callback) {
    fetchData(function (err, data) {
        if (err) {
           return callback(err);
        }
        data += 1;
        callback(null, data);
    });
}
```

What you’ll notice right away is that the asynchronous version is... ugly. It does look like we’re making things unnecessarily complex for little gain.

Now, the cool thing about asynchronous programming is that while your code waits for something to be done (like an API call or a response from a database) it can do something else. In other words, your code doesn’t get blocked when a process is taking a long time. This is the main reason why Node.js was even created: servers running synchronous code spend a lot of time waiting.

If servers can process requests while they are waiting for I/O, stuff gets done faster.

Things do feel a little more complex with asynchronous programming, especially when you begin, but it’s not that hard a concept to grasp and the benefits are worth it.

With a better understanding of terms like “asynchronous programming” and “non-blocking”, let’s answer our initial question.

> A Callback is simply a function passed as an argument to another function which will then use it (call it back)

Here is an example:

```javascript
var fs = require('fs');

fs.readFile(fileName, (err, data) => {
  if (err) throw err;
  
  console.log(data);
});
```
When `fs.readFile` is done fetching the file `fileName`, it executes the callback function, which handles the error if an error is thrown and logs the retrieved file to the console.

Note that the callback function takes 2 arguments: `err` and `data`. By convention, the first argument of a callback function is an error. If an error is thrown by the parent function, it will be there for you to deal with and if no error is thrown — that happens sometimes — then the first argument should be null. Also by convention, the following arguments are the response data. Lookup [Error-First Callbacks](https://nodejs.org/api/errors.html#errors_error_first_callbacks) for more on this.

That is all well and good, but why not simply write the above like this:

```javascript
let file = fs.readFile(fileName);
console.log("file: ", file);
```

In short, because async.

In the above example, `file` will be undefined when we try to log it, because `fs.readFile` won’t be done fetching before we get to the `console.log()`.

But, this

```javascript
let file = 1 + 1;
console.log("file: ", file);
```
will work.

It feels a little confusing to newcomers who have only dealt with synchronous programming; you’ve lived a happy life filled with love and logic, then suddenly, line 3 could get executed before line 2!? Should you use callbacks everywhere all the time just to be sure? No.

Callbacks are to be used when we don’t know when something will be done. Again, think of something like an API call, fetching data from a database or I/O with the hard drive. All of these will take time, so we want our callback to be called when the event we are waiting for is done. Hence the term **Event-driven Programming**.

If you feel like you only kind of get it, don’t feel lonely. Like many things in life, it takes a bit of hands-on experience to get it.

Before you go on to get that hands-on experience, let me introduce you to the next mess you will get into called [**Callback Hell**](http://callbackhell.com/). I'll let you figure it out by yourself.

## What is npm?

As mentioned before, npm (Node Package Manager) is a wizard that manages Node's package for us. **npm** includes a CLI (Command Line Client) that can be used to download and install open-source libraries/packages for your projects. Here is an example

```javascript
npm install PACKAGENAME
```

The packages of `PACKAGENAME` will be installed in the current directory in a folder named node_modules. You can check out the packages at [npmjs](https://www.npmjs.com/).


## Conclusion

In this article, we learnt about what is Node.js, what are its functionalities, how to use it. We also learnt about what is npm and some basic things about http and fs modules. Hopefully, this article provides a good starting point for your journey in Node.js!


Keep on thinking!
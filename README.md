# Banda js
Lets you use a promise as you would the resolved object

##Idea
Using es6 proxies, it should be possible to wrap a promise in an proxy that will let you do this:
```js
a.b.c().d.then(function(result) {
    //Do something with result
});
```
instead of this:
```js
a.then(function(aResolved) {
	return aResolved.b.c();
}).then(function cResolved) {
	return cResolved.d;
}).then(result) {
	//Do something with result
});
```

##Status
This is currently little more than an idea and some sample code.  The 'apply' functionality of es6 proxies has yet to be implemented anywhere, and I trying to find a way to make it work without that, or will need to wait until it is implemented.



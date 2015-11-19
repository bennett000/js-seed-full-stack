Meal Calories
=============

This was a silly "make a basic app" type thing that was supposed to be a
simple calorie/meal tracker. Forget about that though, the _real_ point of this
project was to be a full stack JavaScript (ES5) seed.  Some of the calorie app
stuff gets in the way of this, and there are tags that revert the seed to
more basic stages; deleting works also.

```
npm start
```

Will start a server on port 3000, hopefully that "just works"™, if not there is
a working docker file, and it can be run with:

```
cd /path/to/this/repo
docker build ./
```

Depending on your cache, `docker build ./` could a few minutes.  Once it's done
it will print out a unique identifier.  That identifier needs to be pasted into
the next step:

```
docker run -d -p 3000:3000 <unique-identifier>
```

http://localhost:3000 (or something like http://192.168.100.99:3000 for Mac)
should have a running copy

## LICENSE

Copyright 2015 Michael J. Bennett
[MIT License][MIT]

[MIT]: ./LICENSE "MIT License"

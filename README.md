# gulp-behat-stream
Streaming Behat Plugin for Gulp

## Usage

Behat must be installed to use this plugin.

Current Behat installation instructions:
[behat.org](http://docs.behat.org/en/v2.5/quick_intro.html#installation)

Install `gulp-behat-stream` as a development dependency:

```shell
npm install --save-dev gulp-behat-stream
```

Then, add it to your `gulpfile.js`:

```javascript
var behat = require('gulp-behat-stream');

// Example 1: Default
gulp.task('behat', function() {
	gulp.src('./tests/**/*.feature')
    .pipe(behat());
});

// Example 2: Define custom behat binary, disabling debug
gulp.task('behat', function() {
	var options = {exec: './vendor/bin/behat', debug: 'false'};
	gulp.src('./behat/**/*.php')
    .pipe(behat(options));
});

// Example 3: Error Catching and Streaming Output
gulp.task('behat', function() {
    options = {format: 'pretty', colors: ''};

	gulp.src('./behat/**/*.php')
    .pipe(behat(options))
    .on('message', function(data)
        {
            process.stdout.write(data.toString('utf8'));
        })
    .on('error', function(data)
        {
            handleError(data.toString('utf8'));
        });
});

```

## Options:

All behat options can be passed to Gulp Behat Stream. Just pass them as a json object; Option as the key, value as the value.
Currently all values must be strings.

For all available Behat options, check out the behat commandline utility:
```shell
$ behat --help
```

If the option does not have an acceptable value (eg colors), just pass
a blank string (or boolean false)

**Custom Behat Bianry Location**

If your behat bianry is located somewhere besides

'./vendor/bin/behat'

Just pass the key "exec" with the pass to your behat binary. (Shown in Example 2 above)

## Emitters:

**Error:** Any output on stderr -- You can pipe this to your Error Handler.

**Message:** Anything behat is outputting (text, formatting). Emits under 'message' so default 'data' emitter still available for use.

*Please Note:*

**All emissions are streams. To convert them to text simply add a .toString('enctype')**

*See example 3 above*

## Issues / Requests:
Please use Github to submit any issues or feature requests.

Pull requests always welcome.

*Inspired by Mike Erickson's gulp-behat*

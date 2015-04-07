gutil = require 'gulp-util'
os = require 'os'
spawn = require('child_process').spawn
through = require 'through'

module.exports = (opts) ->
	if opts.exec
		behatCommand = opts.exec
		delete opts.exec
	else
		behatCommand = './vendor/bin/behat'
		if os.platform is 'win32'
			behatCommand = behatCommand.replace /[/]/g, '\\'

	if typeof behatCommand is not 'string' 
		throw new gutil.PluginError 'gulp-behat-stream', 'Invalid Behat Command. Expecting string.'

	behatOpts = []

	for option, value of opts
		if typeof value is 'string' and value.length > 0
			behatOpts.push "--#{option}=#{value}"
		else
			behatOpts.push "--#{option}"

	through (file) -> 
			this.queue file
		, ->
			stream = this
			behat = spawn behatCommand, behatOpts
			behat.stdout.on 'message', (chunk) ->
				stream.emit 'data', chunk

			behat.stderr.on 'data', (chunk) ->
				stream.emit 'error', chunk
				# throw new gutil.PluginError 'gulp-behat-stream', chunk.toString('utf8')
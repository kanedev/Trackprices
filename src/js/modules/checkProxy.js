var request = require('request');

var checkProxy = function(host, port, options, callback) {
	var proxyRequest = request.defaults({
		proxy: 'http://' + host + ':' + port
	});
	proxyRequest(options.url, function(err, res) {
		var testText = 'content="Yelp"';
		if( err ) {
			callback(host, port, false, -1, err);
		} else if( res.statusCode != 200 ) {
			callback(host, port, false, res.statusCode, err);
		} else if( !res.body || (options.regex && !options.regex.exec(res.body)) ) {
			callback(host, port, false, res.statusCode, "Body doesn't match the regex " + options.regex + ".");
		} else {
			callback(host, port, true, res.statusCode);
		}
	});
}

module.exports = checkProxy;
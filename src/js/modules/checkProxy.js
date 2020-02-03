var request = require('request');

var checkProxy = function(host, port, options, callback) {
return new Promise((resolve, reject) => {
	var proxyRequest = request.defaults({
		proxy: 'http://' + host + ':' + port
	});
	proxyRequest(options.url, function(err, res) {
		var testText = 'content="Yelp"';
		if( err ) {
			//callback(host, port, false, -1, err);
			resolve(false);
		} else if( res.statusCode != 200 ) {
		//	 callback(host, port, false, res.statusCode, err);
			 resolve(false);
		} else {
			callback(host, port, true, res.statusCode);
			resolve(true)
		}
	});
})

}

/*
} else if( !res.body || (options.regex && !options.regex.exec(res.body)) ) {
	callback(host, port, false, res.statusCode, "Body doesn't match the regex " + options.regex + ".");
*/

module.exports = checkProxy;
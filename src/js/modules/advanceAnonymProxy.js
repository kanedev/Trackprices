var ProxyLists = require('proxy-lists');
 
var options = {
    anonymityLevels: ['elite'],
    filterMode: 'strict',
    countries: ['De']
};
//   countries: ['fr']
let tab=[];
// `gettingProxies` is an event emitter object.
var gettingProxies = ProxyLists.getProxies(options);

/* var sources = ProxyLists.listSources();
console.log(sources) */




gettingProxies.on('data', function(proxies) {
	// Received some proxies.
    //console.log('PROXIES : ',proxies);
    console.log('Loading PROXIES ...');
    tab=[...tab,proxies]
});

gettingProxies.on('error', function(error) {
	// Some error has occurred.
	//console.error(error);
});

gettingProxies.once('end', function() {
    // Done getting proxies.
    console.log('TAB = ',tab);

});



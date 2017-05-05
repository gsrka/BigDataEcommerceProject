var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var redis = require("redis");
var AzureSearch = require('azure-search');

// Add your cache name and access key.
var client = redis.createClient(6380, 'ecommgrp1.redis.cache.windows.net', { auth_pass: 'SoXLQ7AJqIfLVpYvZQwuJfUBESd1FY5lxkVD/Giu5ZE=', tls: { servername: 'ecommgrp1.redis.cache.windows.net' } });


// Storing objects in Redis Cache

/*Product.find(function(err, docs){
		var productChunks = [];
		var chunkSize = 3;
		for (var i = 0; i < docs.length; i += chunkSize) {
			productChunks.push(docs.slice(i, i + chunkSize));
			client.set(productChunks[i], JSON.stringify(productChunks[i]), function (err, reply) {
            console.log('Object Stored in Redis Cache ');
		});
		}
	});*/

router.get('/', function(req, res, next) {
	Product.find(function(err, docs){
		var productChunks = [];
		var chunkSize = 3;
		for (var i = 0; i < docs.length; i += chunkSize) {
			productChunks.push(docs.slice(i, i + chunkSize));
		}
		console.log("Inside Main: "+productChunks);
		console.log(typeof productChunks);
		res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
	});
    });

	
/* GET productlist page. */
router.get('/searchproductlist', function (req, res) {
	
	console.log('Inside searchproductlist: '+req.query['searchtext']);
	
    var searchCrit = req.query['searchtext'];

    var client = AzureSearch({
        url: "https://ecommgrp1.search.windows.net",
        key: "198985811A7F83F6A928DA5FD468D8AF"
    });
   

   if (searchCrit === null || searchCrit === undefined) {
       searchCrit = '*';
   }
   else {
       searchCrit = searchCrit + '*';
   }

   console.log(searchCrit);

    // search the index 
    client.search('temp', { search: searchCrit}, function (err, results, raw) {
	
	var productChunks = [];
		var chunkSize = 3;
		for (var i = 0; i < results.length; i += chunkSize) {
			productChunks.push(results.slice(i, i + chunkSize));
		}

        res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
    });
});
	
module.exports = router;

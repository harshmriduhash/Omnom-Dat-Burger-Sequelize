var express = require("express");

var router = express.Router();

var db = require("../models");
var burger = db.burger;

router.get("/", function(req, res){

  //   burger.findAll({}).then(data =>{
  //     var hbsObject = {
		// 	burgers: data
		// };
		// console.log('Root Directory Request');
		// res.render("index", hbsObject);
  //   })
    burger.findAll({where:{devoured: 0}, limit: 50}).then(data =>{
    	var burgers = data;
	    burger.findAll({where:{devoured: 1}, limit: 50}).then(data =>{
	    	var hbsObject = {
	    		burgers: burgers,
	    		boogers: data
	    	}
	    	console.log(hbsObject);
	    	res.render("index", hbsObject);	
	    })
    })
	console.log('Root Directory Request');
	// res.render("index");
})

router.get("/api/all", function(req, res){
	getAll(req, res);
});

function getAll(req, res){
    burger.findAll().then(data =>{
		return res.json(data);
    })
	console.log('API requested');
};

router.put("/api/devour", function(req, res){
	var id = req.body.id;
	var dod = req.body.dod;
	console.log('id to devour '+id);
	burger.update(
	{
		devoured: 1,
		dod: req.body.dod
	},
	{ 
		where: { id: req.body.id }
	})
	.then((result)=>{
		return res.json(result);
	}).catch((error)=>{
		console.log(error);
		return res.json(error);
	})
})

router.post("/api/delete", function(req, res){
	var id = req.body.id;
	console.log('id to delete' +id);

	burger.destroy({where: {id:id}})
	.then((data)=>{
		return res.json(data);	
	}).catch((error)=>{
		console.log(error);
		return res.json(error);
	})
})

router.post("/api/new", function(req, res){
	var burgerInfo = req.body;
	console.log('adding burger' +burgerInfo.name);
	burger.create(burgerInfo).then((result)=>{
      res.json(result);
    })
    .catch((error)=>{
		console.log(error);
		// res.json(error);
		return;
	});
})

module.exports = router;
var mongoose = require("mongoose") ;
var express = require("express") ; 
var app = express()  ; 


var bodyParser = require("body-parser") ; 
var bp = bodyParser.urlencoded({extended:false})




var db = mongoose.connect("mongodb://localhost:27017/base2") ; 

//schema cours
var SchemaCours = mongoose.Schema({

     titre : String,
     description : String ,
     listeEnseignants: [{
        type : mongoose.Schema.Types.ObjectId ; 
        ref : "ens"
    }] 
}) ; 
var cours = mongoose.model("cours" , SchemaCours) ;


//schema enseignant 
var SchemaEns = mongoose.Schema({

    nom : String,
    prenom : String ,
    listeCours: [{
        type : mongoose.Schema.Types.ObjectId ; 
        ref : "cours"
    }] 
}) ; 
var ens = mongoose.model("ens" , SchemaEns) ;



app.post("/ajouterCours" , bp , function(req , res){

    var titre = req.body.titre ; 
    var description = req.body.description ; 
    var listeEnseignants = req.body.listeEnseignants ; 
    var cour = new cours({titre : titre , description :description ,  listeEnseignants :  listeEnseignants }) ; 
    cour.save(function(){
        res.redirect("/cours")
    }) ; 
}) ; 

app.post("/ajouterEns" , bp , function(req , res){

    var nom = req.body.nom ; 
    var prenom = req.body.presnom ; 
    var listeCours = req.body.listeCours ; 
    var cens = new ens({nom: nom , prenom:prenom ,  listeCours :  listeCours }) ; 
    cour.save(function(){
        
        res.redirect("/ens")
    }) ; 
}) ; 


app.get("/cours" , function(req,res){
    cours.find().then( function(cours){
    res.json(cours)
   }) ; 
}) ; 

app.get("/ens" , function(req,res){
    ens.find().then( function(ens){
    res.json(ens)
   }) ; 
}) ; 


app.post("/update" , bp , function(req , res){
    
    var filtre= req.body.filtre ; 
    var description = req.body.description ;

    console.log(filtre)
    console.log(description)
     
    cours.updateMany( {titre : filtre} , {$set:{ description : description}})
    .then (function (){  res.redirect("/cours") }) ;
}) ; 

app.post("/remove/:titre" , bp , function(req , res){
    var titre= req.params.titre ; 
    console.log (titre)
    cours.deleteMany({ titre : titre})
    .then (function (){
        res.redirect("/cours");
    });
}) ; 





app.listen(3000); 
console.log("serveur lencé sur le port 3000"); 
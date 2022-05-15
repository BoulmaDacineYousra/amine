var mongoose = require("mongoose") ;
var express = require("express") ; 
var app = express()  ; 


var bodyParser = require("body-parser") ; 
var bp = bodyParser.urlencoded({extended:false})




var db = mongoose.connect("mongodb://localhost:27017/andrew") ; 

//schema cours
var SchemaCours = mongoose.Schema({

     titre : String,
     description : String ,
     listeEnseignants: [String] 
}) ; 
var cours = mongoose.model("cours" , SchemaCours) ;


//schema enseignant 
var SchemaEnseignant = mongoose.Schema({

    
    prenom : String ,
    listeCours: [String] 
}) ; 
var enseignant = mongoose.model("enseignant" , SchemaEnseignant) ;



app.post("/ajouterCours" , bp , function(req , res){

    var titre = req.body.titre ; 
    var description = req.body.description ; 
    var listeEnseignants = req.body.listeEnseignants ; 
    
    var cour = new cours({titre : titre , description :description ,  listeEnseignants :  listeEnseignants }) ; 
    cour.save(function(){
        res.redirect("/cours")
    }) ; 
}) ; 

app.post("/ajouterEnseignant" , bp , function(req , res){

    
    var prenom = req.body.prenom ; 
    var listeCours = req.body.listeCours ; 
    var ens = new enseignant({ prenom:prenom ,  listeCours :  listeCours }) ; 
    ens.save(function(){

        
        
        res.redirect("/enseignant")
    }) ; 
}) ; 


app.get("/cours" , function(req,res){
    cours.find().then( function(cours){
    res.json(cours)
   }) ; 
}) ; 

app.get("/enseignant" , function(req,res){
    enseignant.find().then( function(enseignant){
    res.json(enseignant)
   }) ; 
}) ; 


app.post("/update" , bp , function(req , res){
    
    var id= req.body.id ; 
    var titre = req.body.titre ;

     
    cours.updateMany( {_id: id} , {$set:{ titre : titre}})
    .then (function (){  res.redirect("/cours") }) ;
}) ; 

app.post("/remove/:id" , bp , function(req , res){
    var id= req.params.id ; 
    
    cours.deleteMany({ _id : id })
    .then (function (){
        res.redirect("/cours");
    });
}) ; 





app.listen(3000); 
console.log("serveur lencé sur le port 3000"); 
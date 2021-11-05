const express=require("express");
const bodyparser=require("body-parser");

const date= require(__dirname +"/date.js");

//console.log(date()); here date(), not date, then only the function will run in the module
const app=express();
let items = ["hey"];
let workitems=[];

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));
app.set('view engine', 'ejs');//says that app shud use ejs as view engine  adn this line shud alwayss be below the above one!

app.get("/",function(req,res){
    
   
//var currentday=today.getDay();


/*if(currentday===6 || currentday===0){
        day="day"+currentday;
 
        
    }
else{
       day="day"+currentday;
    
    }
    
    var resday="";
 switch(currentday)  {
     case 0:
         resday="sunday";
         break;
         case 1:
             resday="monday";
             break;
             case 2:
                 resday="tuesday";
                 break;
             case 3:
                 resday="wednesday";
                 break;
                 case 4:
                     resday="thursday";
                     break;
                     case 5:
                         resday="friday";
                         break;
                         case 6:
                             resday="saturday";
                             break;

                             default:
                                 console.log("error, current day is"+currentday);


 }
 */
  let day= date.getdate();
    
    res.render("list",{listtitle:day, newlistitems:items});//generally people use kindofday and day, both to be the same, but here i have used different variablr to avoid confusion and here the "list" is the template file name list.ejs
    
}); 

app.post("/",function(req, res){

    
    let item =req.body.newitem;

    if(req.body.list==="Work List"){
        workitems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
    

        res.redirect("/");

    }
   
});

//the above code is when they are targetting the home route, 
//the below code os whent they are targetting the work route

app.get("/work",function(req,res){
    res.render("list",{listtitle:"Work List",newlistitems: workitems})
});


/*app.post("/work",function(req,res){
    let item=req.body.newitem;
    workitems.push(item);
    res.redirect("/work");
});
*/

app.get("/about",function(req,res){
    res.render("about");
});


app.listen(3000,function(){
    console.log("seems fine")
});


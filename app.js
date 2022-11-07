const express=require("express");
const bodyparser=require("body-parser");

// const date= require(__dirname +"/date.js");

const mongoose = require("mongoose");
//console.log(date()); here date(), not date, then only the function will run in the module
const app=express();
// let items = ["hey"];
// let workitems=[];

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));
app.set('view engine', 'ejs');//says that app shud use ejs as view engine  adn this line shud alwayss be below the above one!

//create a new database
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

//create new itesm schema
const itemsSchema = {
    name : String

}
//creating mongoose model based on new schema
const Item = mongoose.model(
    "Item", itemsSchema
);

const item1 = new Item({
    name: "welcome to the todolist"
});
const item2 = new Item({
    name: "hit the + button to add new item"
});
const item3 = new Item({
    name: "<-- hit this to delete the item"
});

const defaultItems = [item1, item2, item3];

//insert many items in items collecitons
//each time the ncode runs, these items are added to the todolist and hence the listsize will keep on grwing
//to, do somwthing to avoid this repeatiation of the ocde ,, lilke it has to be done at onne time only
// if list is empty  then only we are goig to add the deafult items in the list 
//else we wont add the defaulat items
// if we comment out the below code, then the dtabse will have an emtpty array, before that we have to clear the database throught he mongo shell
// Item.insertMany(defaultItems, function(err){
//     if(err)console.log(err);
//     else console.log("successfully added");
// });

app.get("/",function(req,res){
    
   //reading from the database from the nodejs  module
Item.find( {}, function(err, founditem){
    // 
    if(founditem.length === 0){
        // if no item in the colletion, then add the default list
        Item.insertMany(defaultItems, function(err){
         if(err)console.log(err);
         else console.log("successfully added");
         // but here only the databse is added , it is not rendered on the broweser, 
         // to do so, redirect  again to the home route and this time , it will enter in else statemetn
         res.redirect("/");
     });
    }else{

    
    res.render("list",{listtitle:"Today", newlistitems:founditem});
    }
});
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
//   let day= date.getdate();
    
    // res.render("list",{listtitle:"Today", newlistitems:items});//generally people use kindofday and day, both to be the same, but here i have used different variablr to avoid confusion and here the "list" is the template file name list.ejs
    
}); 
//post route is where we put something on tosolost and that content is posted on the server
app.post("/",function(req, res){

    
    let itemName =req.body.newitem;

    //create a new item doc based on model in mongodb

    const item = new Item ({
        name : itemName
    });

    item.save();

// now redirect this saved database to home route , this will help ous to show the data on broweser other than the console also

    res.redirect("/");
    // if(req.body.list==="Work List"){
    //     workitems.push(item);
    //     res.redirect("/work");
    // }
    // else{
    //     items.push(item);
    //     //console.log(item);
    

    //     res.redirect("/");

    // }
   
});

app.post("/delete",function(req, res){
    
    const deleteItem = req.body.checkbox;

    Item.findByIdAndRemove(deleteItem, function(err){
        if(!err){
            console.log("deleted");
            res.redirect("/");
        }
       // res.redirect("/");
    });
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


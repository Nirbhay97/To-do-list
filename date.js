
//so this module behaves as a date finder and what is the day


 module.exports.getdate=getdate;
function getdate(){


var today=new Date();

let options ={
    weekday:"long",
    day:"numeric",
    month:"long"
};

let day =today.toLocaleDateString("en-US",options);

//or
// return today.toLocaleDateString("en-US",options);

return day;

}
//we can also set a function equivalent to a variable

/* the code changes accoringly

 module.exports.getdate=getdate; //so it can be,module.exports.getdate=function......and remaining part
var getdate=function getdate(){


var today=new Date();

let options ={
    weekday:"long",
    day:"numeric",
    month:"long"
};

let day =today.toLocaleDateString("en-US",options);

//or
// return today.toLocaleDateString("en-US",options);

return day;

}

*/

//what if we wnated to have more than 2 functions to be executed and the data to transfered
//ex

//the second functin i have implemented using shortcut method to avoid more code
exports.getday=function getday(){
    let today=new Date();
    let options={
        weekday:"long"
    };

    let day =today.toLocaleDateString("en-US",options);
    return day;
}

//console.log(module);
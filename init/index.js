const mongoose = require("mongoose");
const listing = require("../models/listing.js");
const initData = require("./data.js");


//function to make connection to database through mongoose.connect
async function main(){
   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//actual connection to database
main().then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
});

async function insertData(){
   await listing.deleteMany({});
    await listing.insertMany(initData.data);
};

insertData();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type : String,
        required:true
    },
    description:{
        type : String,
        default:"Description not available"
    },
    image:{
        filename:{
            type:String,
            default:"listingimage"
        },
        url:{
            type:String,
            default:"https://imgs.search.brave.com/93-8VwQK8BA9BiT7Ez54wb6QXAeAtbwJ8DYCHmVMDyo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTk4/NzA4Nzk3OS9waG90/by9uZXctc3VzdGFp/bmFibGUtc2luZ2xl/LWZhbWlseS1ob21l/LXdpdGgtYS1nYXJk/ZW4uanBnP2I9MSZz/PTYxMng2MTImdz0w/Jms9MjAmYz03VmJQ/WlZncGtSVURQNXFQ/cU9hVDlrNG01ZFpX/dnZpN0RXMGNRVXJL/U1FzPQ"
        }
    },
    price: {
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String
    }
});

//making model of the schema to use in app.js
const listing = mongoose.model("listing",listingSchema);

//exporting the model to use in app.js
module.exports = listing;
//requiring packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const listingSchema = require("./schema.js");


//setting
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);

//function to make connection to database through mongoose.connect
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//actual connection to database
main().then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log(err);
});

//route for all listings
//index route
app.get("/listings", wrapAsync(async (req, res, next) => {

    let listings = await Listing.find({});
    // console.log(listings);
    res.render("./listing/index.ejs", { listings });

}));



//edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("./listing/edit.ejs", { listing });
}));



//update route
app.put("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { title, description, price, location, country } = req.body;
    await Listing.findByIdAndUpdate(id, {
        title: title,
        description: description,
        price: price,
        location: location,
        country: country
    });
    res.redirect(`/listings/${id}`);
}));

//route for creating new listing
app.get("/listings/new", (req, res) => {
    res.render("./listing/new.ejs");
});

//create route
app.post("/listings", wrapAsync(async (req, res, next) => {
   const result= listingSchema.validate(req.body);
   console.log(result);

   const newlisting = new listing(req.body.listing);

    await listing.save();
    res.redirect("/listings");
}));

//show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let details = await Listing.findById(id);
    res.render("./listing/show.ejs", { details });
}));


//delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));


//home
app.get("/", (req, res) => {
    res.send("working");
});


//route for other all
app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Error Occured"));
});


//middleware 
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });
});


//to start server on port 8080
app.listen(port, () => {
    console.log("listening to port 8080");
});
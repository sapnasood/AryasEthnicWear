//Imports express package and sets it up for use
const express = require("express");
//Path module to work with directory and file paths
const path = require("path");
//Starts the http server to except request and send resposne
const app = express();
//Imports apiRoutes and htmlRoutes js files and sets it up for use
const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");
//Import sequelize package and sets it up for use
const db = require("./models");
//Define port for the server to listen for request
const PORT = process.env.PORT || 8080;
//Sets up our server to parse our request body for usage
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// //Sets our server to use public directory for static assets
app.use(express.static('./public'));
// // Routes
app.use(apiRoutes);
app.use(htmlRoutes);

//Sync the database first
db.sequelize.sync().then(function(){
//Starts the server at the predefined port
// Only starts if the db successfully syncs
app.listen(PORT, function(){
    console.log(`App is now listening on PORT ${PORT}`);
});
})

/* Import packages */
("use strict");
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

/* Set the app to work with this */
const app = express();
app.use(morgan("common"));
app.use(cors());
// app.use(express.json())

/* Work with x-www-form-urlencoded solititudes */
// app.use(express.urlencoded({extended: true}))

/* Midleware when using Vue.js */
// import history from "connect-history-api-fallback"
// app.use(history())

/* Specify the folder to use */
app.use(express.static(path.join(__dirname, "public")));

/* Set the port */
app.set("port", process.env.PORT || 3000);

/* Start the server on the assigned port */
app.listen(app.get("port"), () => {
  console.log("Application running and listening on port", app.get("port"));
});

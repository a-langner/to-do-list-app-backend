const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
require("dotenv").config();

const toDoRoutes = require("./routes/todo.routes.js");
const registerRoute = require("./routes/register.routes.js");
const userRoutes = require("./routes/user.routes.js")


const uri = process.env.URI_DB

const app = express();
const PORT = 4000;

mongoose.connect(uri, (err) => {
    if (err) console.log(err);
    console.log('Connected to DB');
});

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(toDoRoutes);
app.use(registerRoute);
app.use(userRoutes);


app.listen(PORT, () => {
    console.log("Server started");
})
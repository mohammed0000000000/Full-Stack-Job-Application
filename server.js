require('dotenv').config();
require("express-async-errors");

const helmet = require("helmet");
const cors = require("cors");
const xxs = require("xss-clean");
const rateLimit = require("express-rate-limit");
const {corsOptions,LimiterOptions} = require("./config/security");


const path = require('path')

const mongoose = require("mongoose");
const DBConnection = require("./Database/connectDatabase");


const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000


DBConnection();

const Limiter = rateLimit({...LimiterOptions});
// app.set('trust proxy' , 1)
// app.use(Limiter);
// app.use(helmet());
// app.use(cors(corsOptions));
// app.use(xxs());

// app.use(express.urlencoded({ exteded: false }));
app.use(express.json());

// app.set("view engine",'ejs');

app.use(express.static(path.join(__dirname, './public')))
app.use('/public',express.static(path.join(__dirname,'public')))
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')))

// Routers
const mainRoute = require("./routes/route")
// const RenderPages = require("./routes/view");
const authRouter = require("./routes/authRoute");
const jobRouter = require("./routes/jobRoute");

// middlewares
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleWare = require("./middleware/authentication");

// routes
app.use("/api/v1/view",mainRoute);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/jobs", authMiddleWare, jobRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



mongoose.connection.once('open',()=>{
    console.log("Connection to Database");
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    })
})

mongoose.connection.on('error',(err)=>{
    console.log(`Connection to Database Error ${err}`);
})







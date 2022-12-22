import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import cors from "cors"

import router from "./api/index.js" 

const app = express();
const PORT = process.env.PORT || 5000

// Config Body Parser
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(express.json())
app.use(cors());

const uri = process.env.MONGODB_URI || "mongodb+srv://sachin4219:Texas4holdem@cluster0.3ov0bjf.mongodb.net/hackback?retryWrites=true&w=majority"

// Database connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`)
}))
.catch((error) => {
  console.log(`${error} did not connect`)
}
);

app.use(router)
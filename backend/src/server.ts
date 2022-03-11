import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import "express-async-errors";

import routes from "./routes";

const app = express();

mongoose.connect('mongodb://database:27017/customer');

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`🔥 Server started at http://localhost:${PORT}`));

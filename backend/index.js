import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";

//load .env into process.env
dotenv.config({});

//create instance of express js app
const app = express();

//middlewares
//parse incoming json payloads from http request body
app.use(express.json());
//parse url-encoded data-form from http request extended-nested objects
app.use(express.urlencoded({ extended: true }));
//parse client cookies and make available in request.cookies
app.use(cookieParser());
//cross-origin-resourse-sharing
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
//get requests from :5173 react to :3000 express
app.use(cors(corsOptions));
//hosting provider can dynamically assing port
const PORT = process.env.PORT || 3000;

// api's
// http://localhost:8000/api/v1/user/...router
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("api/v1/job", jobRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port: ${PORT}`);
});

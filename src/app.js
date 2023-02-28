require("dotenv").config();
///applies try and catch to all controllers automatically
require("express-async-errors");

///import express
const express = require("express");
const app = express();

///Rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
///set up database
const connectDB = require("./db/connect");

/// routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const mealRouter = require("./routes/mealRoutes");
const reviewRouter = require("./routes/reviewRoutes");

/// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

/// This lets me see what routes I visited on the browser
/// it also gives me the status code.
app.use(morgan("tiny"));
///express json
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());

///routes/requests
app.get("/", (req, res) => {
  res.send("Food-Hub!");
});
app.get("/api/v1", (req, res) => {
  // console.log(req.cookies);
  console.log(req.signedCookies);
  res.send("Food-Hub!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/meals", mealRouter);
app.use("/api/v1/reviews", reviewRouter);

///use middleware...this is placed after the routes
///because it runs to see if the routes exist before executing the middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

/// set up port
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();



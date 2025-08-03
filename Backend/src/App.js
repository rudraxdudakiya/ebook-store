const express = require("express");
require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");
const { createAdminAccount } = require("./utils/common");
const authRoute = require("./routes/auth/authRoutes");
const adminBookRoute = require("./routes/admin/bookRoute");

const customerBookRoute = require("./routes/customer/bookRoute");
const customerCartRoute = require("./routes/customer/cartRoute");
const customerOrderRoute = require("./routes/customer/orderRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URL;
const corsOrigin = process.env.CORS_ORIGIN;

const corsOption = {
  origin: corsOrigin,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

mongoose
  .connect(mongoURI, {})
  .then(() => {
    console.log("database is conectde ");
    createAdminAccount();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  try {
    res.send("welcome  to the express");
  } catch (error) {}
});

app.use("/api/auth", authRoute);

//admin Routes
app.use("/api/admin/book", adminBookRoute);

//customer Routes
app.use("/api/customer/book", customerBookRoute);
app.use("/api/customer/cart", customerCartRoute);
app.use("/api/customer/order", customerOrderRoute);

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });

module.exports = app;

require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const workStationRoutes = require("./routes/workStationRoutes");
const lineRoutes = require("./routes/lineRoutes");
const facilityRoutes = require("./routes/facilityRoutes");
const errorHandler = require("./middleware/errorHandler");
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
require("./models/User");
require("./models/Group");
require("./models/WorkStation");
require("./models/Line");
require("./models/Facility");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users",userRoutes);
app.use("/groups",groupRoutes);
app.use("/workstation", workStationRoutes);
app.use("/line",lineRoutes);
app.use("/facility",facilityRoutes);
app.use(errorHandler);


sequelize.sync().then(()=>{
    console.log("DataBase Connected");
    app.listen(5000,()=>{
        console.log("Server running on port 5000");
    });
}).catch((err)=>{
    console.log(err);
});
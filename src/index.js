const express = require("express");
const dotenv = require("dotenv");
const routes = require("../routes/routes");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

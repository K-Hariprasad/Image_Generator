const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/openai", require("./routes/openaiRoute"));

app.listen(port, () => {
  console.log(`Server started running on ${port}`);
});

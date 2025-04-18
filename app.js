const PORT = process.env.PORT || 3001;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/newsExplorer_backend"
).then(()=>{
  console.log("connected to DB");
}).catch(console.error)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

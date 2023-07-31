require("dotenv").config();

//Importamos las dependencias

const express = require("express");
/*const cors = require("cors");
const morgan = require("morgan");*/

// creamos servidor

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Servidos escuchandose en http://localhost:${process.env.PORT}`);
});

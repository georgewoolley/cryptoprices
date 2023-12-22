import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3013;
const API_URL = "https://api.coinranking.com/v2/coins";

// Set the view engine to EJS
app.set("view engine", "ejs");

// Middleware for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  try {
    
    const response = await axios.get(API_URL);

    const coins = response.data.data.coins;
    console.log("Coins:" + coins);

    res.render("index.ejs", { coins });
  } catch (error) {
    // Handle errors
    console.error('Error fetching data from the API:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
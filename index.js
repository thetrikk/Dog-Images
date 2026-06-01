import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// HOME PAGE
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://dog.ceo/api/breeds/image/random"
    );

    const breedList = await axios.get(
      "https://dog.ceo/api/breeds/list/all"
    );

    res.render("index.ejs", {
      content: response.data.message,
      breeds: Object.keys(breedList.data.message),
      selectedBreed: ""
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while rendering the page.");
  }
});


// RANDOM DOG BUTTON
app.get("/get-random-dog", async (req, res) => {
  try {
    const response = await axios.get(
      "https://dog.ceo/api/breeds/image/random"
    );

    const breedList = await axios.get(
      "https://dog.ceo/api/breeds/list/all"
    );

    res.render("index.ejs", {
      content: response.data.message,
      breeds: Object.keys(breedList.data.message),
      selectedBreed: ""
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while rendering the page.");
  }
});


// BREED SELECTOR
app.post("/choose-breed", async (req, res) => {
  try {
    const breed = req.body.breed;

    const response = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );

    const breedList = await axios.get(
      "https://dog.ceo/api/breeds/list/all"
    );

    res.render("index.ejs", {
      content: response.data.message,
      breeds: Object.keys(breedList.data.message),
      selectedBreed: breed
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while rendering the page.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
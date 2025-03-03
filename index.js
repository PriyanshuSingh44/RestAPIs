import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourBearerToken = "dbe0a036-886a-428a-ab11-89c0241f0bd4";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(`${API_URL}/secrets/${searchId}`, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  try{
    const data = req.body;
    console.log(data);
    const response = await axios.post(`${API_URL}/secrets/${data}`, config);
    res.render("index.ejs",{content : JSON.stringify(response.data) });
  }catch(error){
    console.error("error posting secrets:",error.message);
    res.render("index.ejs",{content : JSON.stringify(error.response.data) });
  }
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
});

app.post("/put-secret", async (req, res) => {
  try{
    const searchId = req.body.id;
    const data = req.body;
    console.log(data);
    const response = await axios.put(API_URL+"/secrets/"+searchId, data, config);
    res.render("index.ejs",{content : JSON.stringify(response.data) });
  }catch(error){
    console.error("error puting secret:", error.message);
    res.render("index.ejs",{content : JSON.stringify(error.response.data) });
  }
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
});

app.post("/patch-secret", async (req, res) => {
  try{
    const searchId = req.body.id;
    const data = req.body;
    console.log(data);
    const response = await axios.patch(API_URL+"/secrets/"+searchId, data, config);
    res.render("index.ejs",{content : JSON.stringify(response.data) });
  }catch(error){
    console.error("failed to patch secret",error.message);
    res.render("index.ejs",{content : JSON.stringify(error.response.data) });
  }
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
});

app.post("/delete-secret", async (req, res) => {
  try{
    const searchId = req.body.id;
    const response = await axios.delete(API_URL+"/secrets/"+searchId, config);
    res.render("index.ejs",{content : JSON.stringify(response.data) });
  }catch(error){
    console.error("failed to delete secret",error.message);
    res.render("index.ejs",{content : JSON.stringify(error.response.data) });
  }
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

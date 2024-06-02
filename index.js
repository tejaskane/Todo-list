import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var items = [{ id: 1, title: 'Take out trash' }, { id: 2, title: 'Buy milk' }];
var total = items.length;

app.get("/", async (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  var newItem = { id: total + 1, title: req.body.newItem };
  items.push(newItem);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  items[req.body.updatedItemId - 1] = { id: req.body.updatedItemId, title: req.body.updatedItemTitle };
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  var del_item = req.body.deleteItemId - 1;
  items.splice(del_item, 1);
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

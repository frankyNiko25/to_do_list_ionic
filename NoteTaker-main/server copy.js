// Dependencies

const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const notes = require(`${__dirname}/db/db.json`);
var uniqueID = require("uniqid");
const { parse } = require("path");
var _ = require("underscore");

// Sets up the Express App

const app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

// example note:
// {
// "title": "Test Title",
// "text": "Test text"
// }

// Routes

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) =>
  res.sendFile(path.join(`${__dirname}/public`, "index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(`${__dirname}/public`, "notes.html"))
);

// Displays all notes
//app.get('/api/notes', (req, res) => res.json(notes));

app.get("/api/notes", (req, res) => {
  if (req.query.deleted) {
    let obj = parseData(notes);
    // let obj = JSON.parse(notes);
    var result = obj.filter(function (obj, index) {
      return obj.deleted == true;
    });
    return res.json(result);
  }

  if (req.query.archived) {
    let obj = parseData(notes);
    // let obj = JSON.parse(notes);
    var result = obj.filter(function (obj, index) {
      return obj.archived == true && obj.deleted == false;
    });
    return res.json(result);
  }

  if (!req.query.deleted || !req.query.archived) {
    let obj = parseData(notes);
    // let obj = JSON.parse(notes);
    var result = obj.filter(function (obj, index) {
      return obj.archived == false && obj.deleted == false;
    });
    return res.json(result);
  }

  return res.json(notes);
});

app.post("/api/notes", (req, res) => {
  // req..because hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNotes = req.body;
  // use uniqid() to generate random id to note.
  newNotes.id = uniqueID();
  newNotes.archived = false;
  newNotes.deleted = false;
  console.log(newNotes);
  // Checks to see if new note is object or string
  let newObj = parseData(newNotes);
  // checks to see if original notes from db.json file is object or string.
  let obj = parseData(notes);
  console.log(obj);
  // let obj = JSON.parse(notes);

  // Since the data found in db.json is now parsed into workable array, we push new note into array
  obj.push(newObj);
  // old db.json is overwritten with new file containing new array.
  fs.writeFile(
    `${__dirname}/db/db.json`,
    JSON.stringify(obj, null, "\t"),
    (err) => (err ? console.error(err) : console.log("New Note logged!"))
  );

  res.json(newNotes);
});

app.post("/api/notes/update/:id", (req, res) => {
  const newNotes = req.body;
  let updateID = req.params.id;
  let oldNotes = parseData(notes);
  for (var i = 0; i < oldNotes.length; i++) {
    oldNotes.find((x) => x.id == updateID).title = req.body.title;
    oldNotes.find((x) => x.id == updateID).text = req.body.text;
    fs.writeFile(
      `${__dirname}/db/db.json`,
      JSON.stringify(oldNotes, null, "\t"),
      (err) => (err ? console.error(err) : console.log("Nota aggiornata"))
    );
    return res.json({ updated: true });
  }
});

app.delete("/api/notes/trash/:id", (req, res) => {
  let deleteID = req.params.id;

  // Runs logic to compare id from req to what is in the db.json. Splices result that matches req.
  let oldNotes = parseData(notes);
  for (var i = 0; i < oldNotes.length; i++) {
    oldNotes.find((x) => x.id == deleteID).deleted = true;
    fs.writeFile(
      `${__dirname}/db/db.json`,
      JSON.stringify(oldNotes, null, "\t"),
      (err) => (err ? console.error(err) : console.log("Nota cestinata"))
    );
    return res.json({ trashed: true });
  }
});

//cambia il flag 'archived' in true su db.json
app.delete("/api/notes/archive/:id", (req, res) => {
  let deleteID = req.params.id;

  // Runs logic to compare id from req to what is in the db.json. Splices result that matches req.
  let oldNotes = parseData(notes);
  for (var i = 0; i < oldNotes.length; i++) {
    oldNotes.find((x) => x.id == deleteID).archived = true;
    fs.writeFile(
      `${__dirname}/db/db.json`,
      JSON.stringify(oldNotes, null, "\t"),
      (err) => (err ? console.error(err) : console.log("Nota archiviata"))
    );

    return res.json({ archived: true });
  }
});

app.get("/api/notes/restore/:id", (req, res) => {
  let deleteID = req.params.id;

  // Runs logic to compare id from req to what is in the db.json. Splices result that matches req.
  let oldNotes = parseData(notes);
  for (var i = 0; i < oldNotes.length; i++) {
    oldNotes.find((x) => x.id == deleteID).deleted = false;
    fs.writeFile(
      `${__dirname}/db/db.json`,
      JSON.stringify(oldNotes, null, "\t"),
      (err) => (err ? console.error(err) : console.log("Nota ripristinata"))
    );

    return res.json({ restore: true });
  }
});

app.get("/api/notes/dearchive/:id", (req, res) => {
  let deleteID = req.params.id;

  // Runs logic to compare id from req to what is in the db.json. Splices result that matches req.
  let oldNotes = parseData(notes);
  for (var i = 0; i < oldNotes.length; i++) {
    oldNotes.find((x) => x.id == deleteID).archived = false;
    fs.writeFile(
      `${__dirname}/db/db.json`,
      JSON.stringify(oldNotes, null, "\t"),
      (err) => (err ? console.error(err) : console.log("Nota dearchiviata"))
    );

    return res.json({ dearchive: true });
  }
});

// This route will listen for the DELETE req from web page front end. It will read the id passed in and compare it to what is in the db.json file. It remove the object in the array that matches it.
// Then the json file is rewritten using file system.
app.delete("/api/notes/:id", (req, res) => {
  let deleteID = req.params.id;

  // Runs logic to compare id from req to what is in the db.json. Splices result that matches req.
  let oldNotes = parseData(notes);
  for (var i = 0; i < oldNotes.length; i++) {
    if (oldNotes[i].id == deleteID) {
      oldNotes.splice(i, 1);
      fs.writeFile(
        `${__dirname}/db/db.json`,
        JSON.stringify(oldNotes, null, "\t"),
        (err) => (err ? console.error(err) : console.log("Note Deleted"))
      );
      return res.json({ deleted: true });
    } else {
      // DO NOTHING
    }
  }
});

// Checks to see if data received is either string or object.
function parseData(data) {
  if (!data) return {};
  if (typeof data === "object") return data;
  if (typeof data === "string") return JSON.parse(data);

  return {};
}

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

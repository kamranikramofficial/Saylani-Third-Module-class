const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// ---------- MongoDB Connection ----------
const uri = "mongodb+srv://kamranikram706_db_user:XyGa42EJhhvB9RQA@cluster0.w4hyuxv.mongodb.net/";
const client = new MongoClient(uri);

let todosCollection;

// Function to connect DB
async function connectDB() {
  try {
    await client.connect();
    const db = client.db("todoApp"); // Database
    todosCollection = db.collection("todos"); // Collection
    console.log(" MongoDB Connected");

    // Server start tabhi hoga jab DB connected ho jaye
    app.listen(port, () => {
      console.log(` Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error(" MongoDB Connection Error:", err.message);
    process.exit(1); // Fatal error -> exit process
  }
}
connectDB();

// ---------- CRUD APIs ----------

//  Create Todo
app.post("/api/todos", async (req, res) => {
  try {
    if (!req.body.title) {
      console.log("❌ Title is required");
      return res.sendStatus(400);
    }

    const todo = { title: req.body.title, completed: false };
    const result = await todosCollection.insertOne(todo);

    console.log(" Todo Created:", result.insertedId);
    res.sendStatus(201);
  } catch (err) {
    console.error(" Create Error:", err.message);
    res.sendStatus(500);
  }
});

//  Get All Todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await todosCollection.find().toArray();
    console.log("📋 All Todos:", todos);
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Get Error:", err.message);
    res.sendStatus(500);
  }
});

//  Update Todo
app.put("/api/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      console.log(" Invalid ID:", id);
      return res.sendStatus(400);
    }

    const result = await todosCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { completed: req.body.completed } }
    );

    if (result.matchedCount === 0) {
      console.log("Todo not found:", id);
      return res.sendStatus(404);
    }

    console.log(" Todo Updated:", id);
    res.sendStatus(200);
  } catch (err) {
    console.error(" Update Error:", err.message);
    res.sendStatus(500);
  }
});

//  Delete Todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      console.log("❌ Invalid ID:", id);
      return res.sendStatus(400);
    }

    const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      console.log("❌ Todo not found:", id);
      return res.sendStatus(404);
    }

    console.log(" Todo Deleted:", id);
    res.sendStatus(200);
  } catch (err) {
    console.error(" Delete Error:", err.message);
    res.sendStatus(500);
  }
});

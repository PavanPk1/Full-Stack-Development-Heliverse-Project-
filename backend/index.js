import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = process.env.PORT || 7000;
const MONGOURL = "mongodb://localhost:27017/heliverse";
console.log(MONGOURL);

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  avatar: String,
  domain: String,
  available: Boolean,
});

const UserModel = mongoose.model("users", userSchema);

{/*app.get("/api/users/", async (req, res) => {
  const userData = await UserModel.find();
  res.json(userData);
});*/}

app.get("/api/users/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await UserModel.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    UserModel.init();
    const {
      id,
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
      available,
    } = req.body;
    // Create a new user document
    const newUser = await UserModel.create({
      _id: new mongoose.Types.ObjectId(),
      id,
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
      available,
    });

    // Send response with the created user
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const updatedUserData = req.body;
    const updatedUser = await UserModel.findOneAndUpdate(
      { id: userId },
      updatedUserData,
      { new: true } 
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const deletedUser = await UserModel.findOneAndDelete({ id: userId });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



//Implement filtering, searching, and pagination logic:
app.get("/filtering", async (req, res) => {
  try {
    let query = {};
    
    // Filtering logic
    if (req.query.domain) {
      query.domain = req.query.domain;
    }
    if (req.query.gender) {
      query.gender = req.query.gender;
    }
    if (req.query.availability) {
      query.availability = req.query.availability === "true";
    }
    
    // Searching logic
    if (req.query.search) {
      query.$or = [
        { first_name: { $regex: req.query.search, $options: "i" } },
        { last_name: { $regex: req.query.search, $options: "i" } }
      ];
    }
    
    // Pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const users = await UserModel.find(query).skip(skip).limit(limit);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//create a team using ids

app.post("/api/team", async (req, res) => {
  try {
    const { teamId,userIds } = req.body;
    const users = await UserModel.find({ id: { $in: userIds } });
    res.json({ message: "Team created successfully", users });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.get("/api/team/:id", async (req, res) => {
  try {
    const teamId = parseInt(req.params.id);
    res.json({ message: "Team details retrieved successfully" });
  } catch (error) {
    console.error("Error fetching team details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

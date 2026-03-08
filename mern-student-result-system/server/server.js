
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/resultdb")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const Student = mongoose.model("Student",{
  name:String,
  roll:String,
  marks:Number
});

app.get("/",(req,res)=>{
  res.send("Student Result System Backend Running");
});

app.get("/students", async(req,res)=>{
  const students = await Student.find();
  res.json(students);
});

app.post("/students", async(req,res)=>{
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

app.listen(5000,()=>console.log("Server running on port 5000"));

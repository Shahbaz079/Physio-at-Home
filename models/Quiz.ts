
import mongoose from 'mongoose'

const QuizSchema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
  },
  score:{
    type: Number, required: true
  },
  correctAnswer:[{type:Number,required:true}],
  wrongAnswer:[{
    type:Number,required:true
  }]
},{timestamps:true})

export const Quiz=mongoose.models?.Quiz || mongoose.model("Quiz",QuizSchema);
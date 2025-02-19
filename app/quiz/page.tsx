'use client'
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AnimatedCircularProgressBar } from '@/components/timer/Timer';
import { NumberTicker } from '@/components/magicui/number-ticker';
import QuizComplete from '@/components/quizComplete/QuizComplete';
import { motion } from 'framer-motion';

const questions = [
  {
    question: 'Which planet is closest to the Sun?',
    options: ["Venus", "Mercury","Earth",
       "Mars"
      ],
    correctAnswer: 'Mercury'
  },
  {
    question: ' Which data structure organizes items in a First-In, First-Out (FIFO) manner?',
    options: ['Stack','Queue','Tree','Graph'],
    correctAnswer: 'Queue'
  },

  {
    question: 'Which of the following is primarily used for structuring web pages?',
    options: ['Python','Java','HTML','C++'],
    correctAnswer: 'HTML'
  },
  {
    question: 'Which chemical symbol stands for Gold?',
    options: ['Au','Gd','Ag','Pt'],
    correctAnswer: 'Au'
  },
  {
    question: 'Which of these processes is not typically involved in refining petroleum?',
    options: ['Fractional Distillation','Cracking','Polymerization','Filtration'],
    correctAnswer: 'Filtration'
  },
  {
    question: 'What is the value of 12 + 28',
    
    correctAnswer:40
  },
  {
    question: 'How many states are there in the United States?',
    
    correctAnswer:50
  },
  {
    question:'In which year was the Declaration of Independence signed?',
   
    correctAnswer: 1776
  },

  {
    question: 'What is the value of pi rounded to the nearest integer?',
   
    correctAnswer: 3
  },
  {
    question: 'If a car travels at 60 mph for 2 hours, how many miles does it travel?',
   
    correctAnswer: 120
  }
  
]

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [inputAnswer,setInputAnswer]=useState<number>();

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const [correctAnswers,setCorrectAnswers]=useState<number[]>([]);  //for keeping the track of correct answers that user has given as array of question numbers 

  const [wrongAnswers,setWrongAnswers]=useState<number[]>([]);       //for keeping the track of incorrect answers that user has given as array of question numbers 
        
  useEffect(() => {
    if (timeLeft === 0) handleNextQuestion();
    const timer = setInterval(() => setTimeLeft(prev => Math.max(prev - 1, 0)), 1000);  // after every 1 sec deducting 1 sec from timeLeft
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNextQuestion = () => {
    setSelectedAnswer("");
    setTimeLeft(30);
    setCurrentQuestionIndex(prev => prev + 1); 
  };

  const handleAnswerSelection = (option:string) => {
    setSelectedAnswer(option);
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
      correctAnswers.push(currentQuestionIndex);
      toast.success("Correct!");
    } else {
      wrongAnswers.push(currentQuestionIndex);
      toast.error("Wrong Answer!");
    }
    setTimeout(handleNextQuestion, 1000); // delaying the next question by 1 sec so that user can get time to see answer was correct or not 
  };

  const handleInputCheck=()=>{
    if(inputAnswer){
      const res=inputAnswer===questions[currentQuestionIndex].correctAnswer;
      if(res){
        setScore(score+1);
        toast.success("Correct!");
        correctAnswers.push(currentQuestionIndex);
             }else{

              wrongAnswers.push(currentQuestionIndex);
              toast.error("Wrong Answer!");
             }
             setInputAnswer(undefined);
             setTimeLeft(30);
       setCurrentQuestionIndex(currentQuestionIndex+1);      
    }else{
      toast.error("No answer found")
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6'>
      {currentQuestionIndex < questions.length ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-2xl bg-white text-black shadow-xl rounded-xl p-6'
        >
          <h2 className='text-2xl font-bold text-center mb-4'>{questions[currentQuestionIndex].question}</h2>
          <div className='flex flex-col space-y-3'>
            {questions[currentQuestionIndex]?.options ? questions[currentQuestionIndex].options.map((option) => (
              <motion.button 
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 px-4 text-lg font-medium rounded-lg transition duration-300 shadow-md ${selectedAnswer === option ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleAnswerSelection(option)}
              >
                {option}
              </motion.button>
            )):<div>
              <input
  type="number"
  className="text-black border border-blue-500 rounded-lg py-2 px-4 focus:outline-none mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
  onChange={(e) => setInputAnswer(Number(e.target.value))}
/>  
<button className='px-4 py-2 bg-green-500 rounded-lg mx-4' onClick={()=>handleInputCheck()}>Save</button>
<button className='px-4 py-2 bg-red-500 rounded-lg mx-4' onClick={()=>setCurrentQuestionIndex(currentQuestionIndex+1)}>Skip</button>
              </div>}
          </div>
          <div className='flex justify-between items-center mt-6'>
            <div className='flex flex-col items-center'>
              <AnimatedCircularProgressBar min={0} value={timeLeft} max={100} gaugePrimaryColor='rgb(79 70 229)' gaugeSecondaryColor="rgba(0, 0, 0, 0.1)" />
              <h2 className='mt-2 text-lg font-semibold'>Time Left</h2>
            </div>
            <div className='flex flex-col items-center'>
              <NumberTicker value={score} className='text-4xl font-bold text-indigo-700' />
              <h2 className='mt-2 text-lg font-semibold'>Score</h2>
            </div>
          </div>
        </motion.div>
      ) : (
        <QuizComplete score={score} totalQuestion={questions.length} wrongAnswers={wrongAnswers} correctAnswers={correctAnswers}/>
      )}
    </div>
  );
};

export default QuizPage;

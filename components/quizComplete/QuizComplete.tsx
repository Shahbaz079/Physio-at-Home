import React from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const QuizComplete = ({ score, totalQuestion, wrongAnswers, correctAnswers }: { score: number, totalQuestion: number, wrongAnswers: number[], correctAnswers: number[] }) => {
  const { user } = useUser();
  const mongoId: string = user?.publicMetadata?.mongoId as string;

  const submitHandler = () => {   // by submiting this data will get saved to mongoDB database
    const submission = async () => {
      const res = await fetch('/api/quiz', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: mongoId, score, correctAnswers, wrongAnswers })
      });
      if (res.ok) {
        toast.success("Quiz submitted successfully!");
        redirect('/');
      } else {
        toast.error("Failed to submit quiz.");
      }
    };
    submission();
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen text-white p-6'>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-2xl bg-white text-black shadow-xl rounded-xl p-6 text-center'
      >
        <h1 className='text-3xl font-bold mb-4'>Final Score: <span className='text-blue-600'>{score}</span> / {totalQuestion}</h1>
        <div className="flex flex-wrap justify-center items-center mb-4">
          <h2 className='text-lg font-semibold mb-2'>Incorrect Answers</h2>
          <div className='flex flex-wrap gap-2'>
            {wrongAnswers?.map((w) => (
              <span key={w} className='bg-red-500 text-white px-4 py-2 rounded-lg text-lg'>{w + 1}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center mb-4">
          <h2 className='text-lg font-semibold mb-2'>Correct Answers</h2>
          <div className='flex flex-wrap gap-2'>
            {correctAnswers?.map((c) => (
              <span key={c} className='bg-green-500 text-white px-4 py-2 rounded-lg text-lg'>{c + 1}</span>
            ))}
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='bg-pink-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-pink-700 transition duration-300'
          onClick={submitHandler}
        >
          Submit
        </motion.button>
      </motion.div>
    </div>
  );
};

export default QuizComplete;

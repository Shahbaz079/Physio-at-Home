'use client';

import React, { useEffect, useState } from 'react';
import { InteractiveHoverButton } from '@/components/buttons/HoverButton';
import InstructModal from '@/components/modals/InstructModal';
import { IQuiz } from './api/quiz/route';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';

const Page = () => {
  const [start, setStart] = useState<boolean>(false);
  const [userQuizs, setUserQuizs] = useState<IQuiz[]>([]);
  const { user, isLoaded } = useUser();

  useEffect(() => {  //gfetching the data of previous Quizes a particular user have already submitted
    const mongoId = user?.publicMetadata.mongoId;
    const getUserQuizs = async () => {
      const res = await fetch(`/api/quiz?id=${mongoId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUserQuizs(data);
      }
    };
    getUserQuizs();
  }, [isLoaded]);

  const closeHandler = () => {
    setStart(!start);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex flex-col items-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">Welcome to the Ultimate Quiz Challenge!</h1>
        <p className="text-lg mb-4">Test your knowledge and see how well you score.</p>
        <InteractiveHoverButton onClick={() => setStart(true)}>Take Quiz</InteractiveHoverButton>
      </motion.div>
      {start && <InstructModal isOpen={start} closeHandler={closeHandler} />}

      <div className="mt-12 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-6">Your Previous Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userQuizs?.map((quiz) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              key={quiz?._id?.toString()}
              className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-lg p-6 text-center"
            >
              <h1 className="text-xl font-bold mb-4">
                Score: <span className="text-yellow-400">{quiz?.score}</span> / 10
              </h1>
              <div className="flex flex-wrap justify-center mb-4">
                <h2 className="text-red-300 font-semibold mr-2">Incorrect:</h2>
                {quiz?.wrongAnswers?.map((w) => (
                  <span key={w} className="mx-2 bg-red-500 text-white px-4 py-2 rounded-lg mb-2">{w + 1}</span>
                ))}
              </div>
              <div className="flex flex-wrap justify-center">
                <h2 className="text-green-300 font-semibold mr-2">Correct:</h2>
                {quiz?.correctAnswers?.map((c) => (
                  <span key={c} className="mx-2 bg-green-500 text-white px-4 py-2 rounded-lg mb-2">{c + 1}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

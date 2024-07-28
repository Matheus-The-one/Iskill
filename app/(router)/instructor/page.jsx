"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quizzes = [
  {
    name: "ზოგადი",
    icon: "1️⃣",
    questions: [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris"
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        correctAnswer: "Mars"
      },
    ]
  },
  {
    name: "უნარები",
    icon: "2️⃣",
    questions: [
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
      },
      {
        question: "What is 10 * 5?",
        options: ["40", "50", "60", "70"],
        correctAnswer: "50"
      },
    ]
  },
  {
    name: "ქცევა და ეთიკა",
    icon: "3️⃣",
    questions: [
      {
        question: "როგორ უნდა მოიქცეს სასტუმროს თანამშრომელი, როდესაც სტუმარი საჩივარს გამოთქვამს?",
        options: [
          "იგნორირება გაუკეთოს საჩივარს",
          "მოუსმინოს ყურადღებით და შეეცადოს პრობლემის გადაჭრას",
          "დაადანაშაულოს სხვა თანამშრომლები",
          "უთხრას სტუმარს, რომ გადაჭარბებულად რეაგირებს"
        ],
        correctAnswer: "მოუსმინოს ყურადღებით და შეეცადოს პრობლემის გადაჭრას",
        img: "/4.gif"
      },
      {
        question: "Table-service ეხება:",
        options: [
          "მხოლოდ ოთხი ვარსკვლავიანი რესტორნები",
          "ძვირადღირებული რესტორნები",
          "რესტორნები, რომლებიც მუშაობენ სერვერებზე",
          "სწრაფი კვების ადგილები"
        ],
        correctAnswer: "რესტორნები, რომლებიც მუშაობენ სერვერებზე",
        img: "/2.gif"
      },
      {
        question: "რა არის სწორი ქმედება, როდესაც თანამშრომელი ხედავს კოლეგას, რომელიც არღვევს სასტუმროს წესებს?",
        options: [
          "იგნორირება გაუკეთოს სიტუაციას",
          "განიხილოს საკითხი სხვა თანამშრომლებთან",
          "აცნობოს მენეჯმენტს კონფიდენციალურად",
          "საჯაროდ გააკრიტიკოს კოლეგა"
        ],
        correctAnswer: "აცნობოს მენეჯმენტს კონფიდენციალურად",
        img: "/3.gif"
      },
      {
        question: "რა უნდა გააკეთოს მიმტანმა, თუ მომხმარებელი ჩივის, რომ მათი საკვები ძალიან ცივია?",
        options: [
          "ბოდიში მოიხადეთ და შესთავაზეთ საკვების შეცვლა ან გაცხელება",
          "უგულებელყოთ საჩივარი და განაგრძეთ სხვა ამოცანები",
          "შეფს დააბრალე შეცდომა",
          "უთხარი მომხმარებელს, რომ მაინც შეჭამოს "
        ],
        correctAnswer: "ბოდიში მოიხადეთ და შესთავაზეთ საკვების შეცვლა ან გაცხელება",
        img: "/1.gif"
      },
      {
        question: "როგორ უნდა უპასუხოს მიმტანმა მომხმარებლის სპეციალურ დიეტურ მოთხოვნას?",
        options: [
          "უგულებელყავით მოთხოვნა",
          "შეატყობინეთ მომხმარებელს, რომ მათი მოთხოვნა ვერ განხორციელდება",
          "თავაზიანად გაითვალისწინეთ მოთხოვნა და აცნობეთ სამზარეულოს პერსონალს",
          "სთხოვეთ მომხმარებელს შეცვალოს შეკვეთა"
        ],
        correctAnswer: "თავაზიანად გაითვალისწინეთ მოთხოვნა და აცნობეთ სამზარეულოს პერსონალს",
        img: "./5.gif"
      },
      {
        question: "რა არის მიმტანის როლი სუფთა სასადილო გარემოს უზრუნველყოფაში?",
        options: [
          "მხოლოდ მაშინ ასუფთავებენ მაგიდებს, როცა ამის სურვილი აქვთ",
          "დასუფთავების ამოცანების დელეგირება მომხმარებლებზე",
          "რეგულარულად გაასუფთავეთ მაგიდები და დარწმუნდით, რომ სასადილო ადგილი მოწესრიგებულია",
          "ფოკუსირება მოახდინეთ მხოლოდ საკვების მირთმევაზე და დასუფთავება სხვას მიანდეთ"
        ],
        correctAnswer: "რეგულარულად გაასუფთავეთ მაგიდები და დარწმუნდით, რომ სასადილო ადგილი მოწესრიგებულია",
        img: "/4.gif"
      },
      {
        question: "ჩამოთვლილთაგან რომელია წარმატებული მიმტანისთვის მთავარი უნარი?",
        options: [
          "მთელი მენიუსა და ღვინის სიის დამახსოვრება",
          "მომხმარებლის უკუკავშირის იგნორირება",
          "ცვლაში პირადი ზარების განხორციელება",
          "სამსახურში დაგვიანებით მისვლა"
        ],
        correctAnswer: "მთელი მენიუსა და ღვინის სიის დამახსოვრება",
        img: "/2.gif"
      },
      {
        question: "რა უნდა გააკეთოს მიმტანმა, თუ მომხმარებლის შეკვეთა დაგვიანებულია?",
        options: [
          "მოერიდეთ კლიენტის მაგიდას",
          "დააბრალე სამზარეულოს პერსონალი",
          "ბოდიშს გიხდით დაგვიანებისთვის და მიაწოდეთ განახლება",
          "გთავაზობთ ფასდაკლებას ნებართვის გარეშე"
        ],
        correctAnswer: "ბოდიშს გიხდით დაგვიანებისთვის და მიაწოდეთ განახლება",
        img: "/3.gif"
      }
    ]
  }
];

const QuizGame = ({ quiz, onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (timeLeft > 0 && !selectedAnswer && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !selectedAnswer) {
      handleNextQuestion();
    }
  }, [timeLeft, selectedAnswer, showResult]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setTimeLeft(15);
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white p-8 rounded-lg shadow-lg text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-2xl mb-4">Your score: {score} out of {quiz.questions.length}</p>
        <button 
          onClick={onFinish}
          className="bg-violet-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-violet-600 transition duration-300 transform hover:scale-105"
        >
          Back to Quiz List
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{quiz.name}</h2>
        <div className="text-xl font-semibold">
          Question {currentQuestion + 1}/{quiz.questions.length}
        </div>
      </div>
      <div className="mb-4 w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-black h-2.5 rounded-full" style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
      </div>
      {quiz.questions[currentQuestion].img && (
        <img src={quiz.questions[currentQuestion].img} alt="Question related visual" className="mb-4 max-w-30 h-30" />
      )}
      <p className="text-lg mb-6">{quiz.questions[currentQuestion].question}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quiz.questions[currentQuestion].options.map((option, index) => (
          <motion.button 
            key={index} 
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 text-left rounded-lg transition duration-300 ${
              selectedAnswer === null
                ? 'bg-gray-200 hover:bg-gray-300'
                : selectedAnswer === option
                  ? option === quiz.questions[currentQuestion].correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-gray-200'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>
      {selectedAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <p className={`text-center mb-4 text-lg font-semibold ${
            selectedAnswer === quiz.questions[currentQuestion].correctAnswer
              ? 'text-green-600'
              : 'text-red-600'
          }`}>
            {selectedAnswer === quiz.questions[currentQuestion].correctAnswer ? "Correct!" : "Incorrect!"}
          </p>
          <button 
            onClick={handleNextQuestion}
            className="w-full bg-violet-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-violet-600 transition duration-300 transform hover:scale-105"
          >
            {currentQuestion < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

const Page = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const finishQuiz = () => {
    setSelectedQuiz(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">ქვიზლეტი</h1>
        <AnimatePresence mode="wait">
          {selectedQuiz ? (
            <QuizGame key="quiz" quiz={selectedQuiz} onFinish={finishQuiz} />
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6">Select a Quiz</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quizzes.map((quiz, index) => (
                  <motion.button
                    key={index}
                    onClick={() => startQuiz(quiz)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-violet-500 to-violet-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center"
                  >
                    <span className="text-4xl mb-2">{quiz.icon}</span>
                    <span className="text-xl font-semibold">{quiz.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Page;

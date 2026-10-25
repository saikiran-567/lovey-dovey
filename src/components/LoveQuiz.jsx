import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Heart, RotateCcw, Sparkles } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import { writeStorage } from '../utils';
import HeartButton from './HeartButton';

export default function LoveQuiz() {
  const questions = loveConfig.quiz || [];
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const reducedMotion = useReducedMotion();
  const question = questions[questionIndex];
  const scoredQuestionCount = questions.filter((item) => item.scored).length;
  const maxScore = scoredQuestionCount * (loveConfig.quizScoring?.pointsPerCorrect ?? 10);
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const resultMessage = [...(loveConfig.quizScoring?.thresholds || [])].sort((a, b) => b.min - a.min).find((item) => percentage >= item.min)?.message || 'Every answer is another little moment together. ❤️';

  useEffect(() => {
    if (finished) writeStorage('loveLatestQuizScore', { score, percentage, completedAt: new Date().toISOString() });
  }, [finished, score, percentage]);

  const begin = () => { setQuestionIndex(0); setSelected(null); setScore(0); setFinished(false); setStarted(true); };
  const chooseAnswer = (choice) => {
    if (selected !== null || !question) return;
    setSelected(choice);
    if (question.scored && choice === question.correctAnswer) setScore((value) => value + (loveConfig.quizScoring?.pointsPerCorrect ?? 10));
  };
  const continueQuiz = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((value) => value + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="quiz-shell">
      {questions.length === 0 ? <div className="quiz-intro"><p className="eyebrow">A LITTLE GAME FOR TWO</p><h3>Your quiz is waiting for its questions.</h3><p>Add at least one question in <code>src/config/loveConfig.js</code> and it will be ready to play.</p></div> : <AnimatePresence mode="wait">
        {!started ? (
          <motion.div key="intro" className="quiz-intro" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <div className="quiz-heart-orbit"><span className="quiz-orbit-dot dot-one" /><span className="quiz-orbit-dot dot-two" /><Heart size={42} fill="currentColor" strokeWidth={0.8} /></div>
            <p className="eyebrow">A TINY GAME FOR TWO</p>
            <h3>How well do you know<br /><em>our little world?</em></h3>
            <p>There are no bad answers here. Just a few questions, a few smiles, and a reason to make even more memories.</p>
            <HeartButton onClick={begin}>Let's Play, My Love</HeartButton>
            <span className="quiz-footnote"><Sparkles size={13} /> {questions.length} little questions · endless affection</span>
          </motion.div>
        ) : finished ? (
          <motion.div key="result" className="quiz-result" initial={reducedMotion ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <p className="eyebrow">AND THE MOST IMPORTANT PART IS…</p>
            <div className="score-ring" style={{ '--score-percent': `${percentage}%` }}><div><strong>{percentage}%</strong><span>love score</span></div></div>
            <h3>{score} <span>/ {maxScore}</span> points</h3>
            <p className="quiz-result-message">{resultMessage}</p>
            <div className="quiz-result-actions"><HeartButton onClick={begin}><RotateCcw size={15} /> Play Again</HeartButton><button className="text-action" onClick={() => document.getElementById('surprise')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })}>Continue our story <span>→</span></button></div>
            <p className="quiz-score-saved"><Check size={13} /> Your latest score is saved on this device.</p>
          </motion.div>
        ) : question ? (
          <motion.div key={`question-${questionIndex}`} className="quiz-question" initial={reducedMotion ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: reducedMotion ? 0 : 0.22 }}>
            <div className="quiz-topline"><span>OUR LITTLE QUIZ</span><span>{String(questionIndex + 1).padStart(2, '0')} <i>/</i> {String(questions.length).padStart(2, '0')}</span></div>
            <div className="quiz-progress"><span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
            <div className="quiz-score-label"><Heart size={13} fill="currentColor" /> {score} points so far</div>
            <h3>{question.question}</h3>
            <p className="quiz-type-note">{question.scored ? 'Choose the answer you remember best.' : 'A just-for-fun question — there are no wrong answers.'}</p>
            <div className="quiz-choices">
              {question.choices.map((choice, index) => {
                const isChosen = selected === choice;
                const isCorrect = question.scored && selected !== null && choice === question.correctAnswer;
                const isWrongChosen = question.scored && isChosen && choice !== question.correctAnswer;
                return <button type="button" key={`${choice}-${index}`} className={`quiz-choice ${isChosen ? 'chosen' : ''} ${isCorrect ? 'answer-correct' : ''} ${isWrongChosen ? 'answer-wrong' : ''}`} onClick={() => chooseAnswer(choice)} disabled={selected !== null}>
                  <span className="choice-letter">{String.fromCharCode(65 + index)}</span><span>{choice}</span>{isCorrect && <Check size={17} className="choice-feedback-icon" />}{isWrongChosen && <span className="choice-heart">♡</span>}
                </button>;
              })}
            </div>
            <AnimatePresence>
              {selected !== null && <motion.div className={`answer-feedback ${question.scored && selected !== question.correctAnswer ? 'feedback-soft' : ''}`} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                <span className="feedback-heart"><Heart size={15} fill="currentColor" /></span><p>{question.scored && selected === question.correctAnswer ? question.correctFeedback : question.scored ? question.incorrectFeedback : (question.correctFeedback || 'There is no wrong answer when it comes to us. ❤️')}</p>
                <button onClick={continueQuiz}>{questionIndex === questions.length - 1 ? 'See our little result' : 'Next little question'} <span>→</span></button>
              </motion.div>}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div key="empty" className="quiz-intro"><h3>Your quiz is waiting for its questions.</h3><p>Add at least one question in <code>src/config/loveConfig.js</code>.</p><HeartButton onClick={begin}>Try again</HeartButton></motion.div>
        )}
      </AnimatePresence>}
    </div>
  );
}

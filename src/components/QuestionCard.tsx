import React from 'react'
import { UserAnswer } from '../App';

type QuestionCardProps = {
    question: string;
    answers: string[];
    callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: UserAnswer | undefined;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answers, callBack, userAnswer, questionNumber, totalQuestions }) =>
(
    <div>
        <p className='number'>
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p className='question' dangerouslySetInnerHTML={{ __html: question }}></p>
        <div>
            {answers.map(answer => (
                <div key={answer}>
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callBack}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </div>
            ))} 
        </div>
    </div>
)

export default QuestionCard;
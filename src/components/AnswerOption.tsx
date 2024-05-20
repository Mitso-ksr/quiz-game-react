import { useQuiz } from '../QuizContext';
import './AnswerOption.scss';
import { decode } from 'html-entities';


function AnswerOption({answer}: {answer : string}) {

    const {state, dispatch} = useQuiz();
    return (
        <>  
            {
                answer &&
                <div className="answer-option">
                    <p 
                        className= {state.userAnswer === answer ? 'selected' : ''}
                        onClick={() => dispatch({type: 'setUserAnswer', payload: answer})}> 
                       {decode(answer)}
                    </p>
                </div>
            }
            
        </>
    )
}

export default AnswerOption

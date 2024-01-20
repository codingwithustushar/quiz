
import React,{useState} from 'react'
import questions from '../questions'
import Result from './Result';


export default function QuestionBox() {
  const[currentQue ,setCurrentQue] = useState(0);
  const[highlight,sethighlight] =useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [resultShow, setResultShow] = useState(false);

  //Conditions for changing the questions
  const changeQue = () => {
    if(currentQue<questions.length-1){

      setCurrentQue(currentQue + 1);
      sethighlight(false);
      setSelectedOption(null);
    }
    else {
      setResultShow(true);
    }
  };
  //when options is clicked
  const handleOptionClick = (e) => {
    if(e.target.value==='true'){
      setScore(score+1)
      console.log(score)  
    }  
      changeQue();
      scoreUpdate();
    
  };

  //For Highlighting the question
  const handlehighlight = ()=>{
    sethighlight(true);
  }
  //for remove the highlight of the question
  const removehightlight = ()=>{
    sethighlight(false)
  }
 //updating score when clicked on correct option
  const scoreUpdate = () => {
    const correctOptionIndex = questions[currentQue].options.findIndex((option) => option.isCorrect);

    if (selectedOption === correctOptionIndex) {
      setScore(score + 1);
    }
  };
//After clicking on restart game it starts from the beginning
  const restartGame = () => {
    setCurrentQue(0);
    sethighlight(false);
    setScore(0);
    setSelectedOption(null);
    setResultShow(false);
  };
  return (
    
    <div>
      <p className='name'>QUIZZARD</p>
     <div className='container'>
     {resultShow ? (
          <Result score={score} totalScore={questions.length} onRestart={restartGame} />
        ) : (
          <>
        <div className='question'>
        <div className='question' style={{ color: highlight ? '#D22727' : 'black' }}>
        <span id='quenum'>Questions:{currentQue+1}of5</span><br></br>
        <span id='quetext'>{questions[currentQue].text}</span>
        </div>
        </div>

        <div className='options'>
          {questions[currentQue].options.map((options,i)=>{
            return(
              <button key={i} className='opt_btn' value={options.isCorrect} onClick={handleOptionClick}>
                {options.text}
              </button>
            )
          })}
          </div>
          <div>
           <button onClick={handlehighlight} className='high'>Highlight</button>
        <button onClick={removehightlight} className='high'>Remove Highlight</button>
        </div>
          </>
        )}
     </div>
    </div>
    
    )
  }




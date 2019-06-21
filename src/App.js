import React, {Component} from 'react';
import './App.scss';

const newQuiz = [{
  name: "Food Quiz",
  author: "Joel",
  questions: [
    {
      questionName: "What do you like most?",
      answers: [
        {
          text: "Bananas"
        },
        {
          text: "Apples"
        },
        {
          text: "Oranges"
        }
      ]
    },
    {
      questionName: "What is the best state?",
      answers: [
        {
          text: "Texas"
        },
        {
          text: "Texas"
        },
        {
          text: "Texas"
        }
      ]
    },
    {
      questionName: "What office are you in?",
      answers: [
        {
          text: "Austin"
        },
        {
          text: "Dallas"
        },
        {
          text: "Houston"
        }
      ]
    }
  ]
}]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: newQuiz
    }
  }
/*
  componentDidMount(){
    fetch('http://localhost:8080/get-all-quizzes')
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      this.setState({
        quizzes: myJson
      }, () => {
        console.log(this.state.quizzes);
      })
    });
  }
*/
  handleAddQuiz = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/add-quiz', {
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      method:"POST",
      body: JSON.stringify(newQuiz)
    })
    .then(res => {
      if(res.status === 200){
        console.log("quiz added")
      } else {
        console.log("something died")
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  render(){
    return (
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">Openquiz</span>
          <i onClick={e => this.handleAddQuiz(e)} className="far fa-plus-square"></i>
        </nav>
        {this.state.quizzes.map((quiz, index) => {
          return(
            <div key={index}>
              <p>Quiz name: {quiz.name}</p>
              <p>Author: {quiz.author}</p>
              {quiz.questions.map((question, index) => {
                return(
                  <div key={index}>
                    <p>Question {index + 1}: {question.questionName}</p>
                    {question.answers.map((answers, index) => {
                      return(
                        <p key={index}>
                          {index + 1}: {answers.text}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
              <hr/>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;

import React, {Component} from "react";
import classes from "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

class Quiz extends Component {

    retryHandler = () => {
        this.setState({
            
        })
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    async componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    render() {
        const {quiz, isFinished, results, loading, activeQuestion, quizAnswerClick, retryQuiz, answerState} = this.props
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        loading || !quiz 
                          ? <Loader />
                          : isFinished 
                            ? <FinishedQuiz 
                                results={ results }
                                quiz={quiz}
                                onRetry={retryQuiz}
                            />
                            : <ActiveQuiz 
                                answers={quiz[activeQuestion].answers}
                                question={quiz[activeQuestion].question}
                                onAnswerClick={quizAnswerClick}
                                quizLength={quiz.length}
                                answerNumber={activeQuestion + 1}
                                state={answerState}
                                />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results, // {[id]: 'success' 'error'}
        activeQuestion: state.quiz.activeQuestion,
        isFinished: state.quiz.isFinished,
        answerState: state.quiz.answerState, // {[id]: 'success' 'error'}
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
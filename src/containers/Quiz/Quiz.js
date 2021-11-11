import React, {Component} from "react";
import classes from "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

class Quiz extends Component {

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
    const {results, activeQuestion, isFinished, answerState, quiz, loading} = state.quiz
    return {
        results, // {[id]: 'success' 'error'}
        activeQuestion,
        isFinished,
        answerState, // {[id]: 'success' 'error'}
        quiz,
        loading
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
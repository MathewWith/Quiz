import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-c4ac8-default-rtdb.europe-west1.firebasedatabase.app/'
})
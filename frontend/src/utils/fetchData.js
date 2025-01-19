import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get("https://opentdb.com/api.php?amount=15");
    const formattedQuestions = response.data.results.map((question) => ({
      question: question.question,
      options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
      correct: question.correct_answer,
    }));
    return formattedQuestions;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;

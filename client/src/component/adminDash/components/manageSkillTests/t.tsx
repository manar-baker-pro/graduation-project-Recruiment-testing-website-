import React, { useState } from 'react';
import { Typography, TextField, IconButton, Button, Box } from '@mui/material';
import { AddCircleOutline, DeleteOutlineOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';

interface Question {
  question: string;
  options: string[];
}

const fadeInAnimation = {
  animation: 'fadeIn 0.3s ease-in-out',
};

const QuestionContainer = styled('div')({
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '8px',
  marginBottom: '8px',
  ...fadeInAnimation,
});

const OptionContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginTop: '1px',
  ...fadeInAnimation,
});

const SurveyCreator: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([{ question: '', options: [] }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: [] }]);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push('');
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Create Survey
      </Typography>
      {questions.map((question, questionIndex) => (
        <QuestionContainer key={questionIndex}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 2,
              ...fadeInAnimation,
            }}
          >
            <Typography variant="body1">Question {questionIndex + 1}</Typography>
            <IconButton
              aria-label="Delete"
              onClick={() => handleRemoveQuestion(questionIndex)}
            >
              <DeleteOutlineOutlined />
            </IconButton>
          </Box>
          <TextField
            label="Question"
            value={question.question}
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
            variant="outlined"
            margin="dense"
          />
          {question.options.map((option, optionIndex) => (
            <OptionContainer key={optionIndex}>
              <TextField
                label={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(questionIndex, optionIndex, e.target.value)
                }
                variant="outlined"
                margin="dense"
              />
              <IconButton
                aria-label="Delete"
                onClick={() => handleRemoveOption(questionIndex, optionIndex)}
              >
                <DeleteOutlineOutlined />
              </IconButton>
            </OptionContainer>
          ))}
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={() => handleAddOption(questionIndex)}
            sx={{
              ...fadeInAnimation,
            }}
          >
            Add Option
          </Button>
        </QuestionContainer>
      ))}
      <Button variant="contained" color="primary">
        Create Survey
      </Button>
    </div>
  );
};

export default SurveyCreator;

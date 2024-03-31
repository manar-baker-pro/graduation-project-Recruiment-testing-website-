import React, { useState } from "react";
import {
  QuestionTest,
  Test,
} from "../../../../setup/store/reducers/testReducers/testReducers.Models";
import { Technology } from "../../../../setup/store/reducers/technologyReducers/technologyReducerModels";
import { createTest } from "../../../../setup/store/actionsCreators/testActionCreators/crudTest";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../setup/store/store";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import styles from "../../adminDash.module.css";
import {
  Accordion,
  AccordionDetails,
  Box,
  Button,
  Divider,
  IconButton,
  Slider,
  TextareaAutosize,
  styled,
  Grid,
} from "@mui/material";
import {
  AddCircleOutline,
  CloseOutlined,
  OndemandVideoRounded,
} from "@mui/icons-material";
import SelectSkill from "./selectSkill";

export const CreateTest = () => {
  const dispatch = useDispatch();
  const technologyReducer = useSelector(
    (state: RootState) => state.technologyReducer
  );
  const { technologies } = technologyReducer;
  const [test, setTest] = useState<Test>({
    technology: {} as Technology,
    questionsTest: [
      {
        questionText: "Question",
        options: [],
        points: 0,
      },
    ],
    successRate: 0,
    duration: 0,
  });

  const handleSuccessRateChange = (event: any) => {
    const value = event.target.value;
    setTest((prevTest) => ({ ...prevTest, successRate: value }));
    console.log(test.successRate);
  };

  const handleCreateTest = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    console.log(test);
    dispatch(createTest(test));
  };

  const handleChangeQues = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    setTest((prevTest) => {
      const updatedQuestions = [...prevTest.questionsTest];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [name]: value,
      };
      return { ...prevTest, questionsTest: updatedQuestions };
    });
    console.log(test.questionsTest);
  };

  const addQuestion = () => {
    setTest((prevTest) => {
      return {
        ...prevTest,
        questionsTest: [
          ...prevTest.questionsTest,
          {
            questionText: "Question",
            options: [],
            points: 0,
          },
        ],
      };
    });
  };

  const removeQuestion = (index: number) => {
    if (test.questionsTest.length > 1) {
      setTest((prevTest) => {
        const removeQues = [...prevTest.questionsTest];
        removeQues.splice(index, 1);
        return { ...prevTest, questionsTest: removeQues };
      });
    }
  };

  const handleChangeTech = (newTech: string) => {
    const tech = technologies.find(
      (t: Technology) => t.TechnologyName === newTech
    );

    tech &&
      setTest((prevTest) => {
        return { ...prevTest, technology: tech };
      });
    console.log(test);
  };

  const setOptionAnswer = (index: number, indexOp: number, ans: boolean) => {
    setTest((prevTest) => {
      const copyQuestion = [...prevTest.questionsTest];
      const options = copyQuestion[index].options.map((option, i) => ({
        ...option,
        isTrue: i === indexOp ? true : false,
      }));
      copyQuestion[index].options = options;
      return { ...prevTest, questionsTest: copyQuestion };
    });
  };

  const setQuestionPoint = (index: number, points: number) => {
    setTest((prevTest) => {
      const copyQuestion = [...prevTest.questionsTest];
      copyQuestion[index].points = points;
      return { ...prevTest, questionsTest: copyQuestion };
    });
    console.log(test.questionsTest[index].points);
  };

  const setDuration = (durationIn: number) => {
    setTest((prevTest) => {
      return { ...prevTest, duration: durationIn };
    });
    console.log(test.duration);
  };

  const handleChangeOption = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    indexOp: number
  ) => {
    setTest((prevTest) => {
      const upadatedQuestionOp = [...prevTest.questionsTest];
      upadatedQuestionOp[index].options[indexOp] = {
        ...upadatedQuestionOp[index].options[indexOp],
        optionText: event.target.value,
      };
      return { ...prevTest, questionsTest: upadatedQuestionOp };
    });
    console.log(test.questionsTest[index].options[indexOp].optionText);
  };

  const removeOption = (index: number, indexOp: number) => {
    if (test.questionsTest[index].options.length > 1) {
      setTest((prevTest) => {
        const removOptionQues = [...prevTest.questionsTest];
        removOptionQues[index].options.splice(indexOp, 1);
        return { ...prevTest, questionsTest: removOptionQues };
      });
    }
  };

  const addOption = (index: number) => {
    if (test.questionsTest[index].options.length < 5) {
      setTest((prevTest) => {
        const addOptionQues = [...prevTest.questionsTest];
        addOptionQues[index].options.push({
          optionText: `option ${addOptionQues[index].options.length + 1}`,
          isTrue: false,
        });
        return { ...prevTest, questionsTest: addOptionQues };
      });
    } else {
      console.log("max 5 options");
    }
  };

  function valuetext(value: number) {
    return `${value}%`;
  }

  return (
    <Grid
      container
      spacing={4}
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      style={{
        backgroundColor: "var(--base-color)",
        paddingTop: "120px",
      }}
    >
      <Grid item xs={12} md={6} >
        <h3 className={styles.titleSection}>Create Test</h3>
      </Grid>
      <Grid item xs={12} md={6}>
        <Accordion>
          <AccordionDetails>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={4}>
                <label style={{ marginRight: "10px" }}>
                  Enter The Desired Skill:
                </label>
                <SelectSkill
                  technologies={technologies}
                  handleChangeTech={handleChangeTech}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <label>Enter The Desired Success Rate:</label>
                <Slider
                  aria-label="Custom SuccessRate"
                  value={test.successRate}
                  onChange={handleSuccessRateChange}
                  defaultValue={20}
                  getAriaValueText={valuetext}
                  step={10}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <label>Enter The Duration of Test:</label>
                <input
                  type="number"
                  min={1}
                  step={0.5}
                  placeholder="0"
                  onChange={(e) => setDuration(+e.target.value)}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      {test.questionsTest.map((ques: QuestionTest, index: any) => {
        return (
          <Grid item xs={12} md={8}>
            <Accordion key={index}>
              <AccordionDetails>
                <input
                  type="text"
                  className={styles.question}
                  placeholder="Question"
                  value={ques.questionText}
                  name="questionText"
                  onChange={(e) => handleChangeQues(e, index)}
                />
                {ques.options.map((option, indexOp) => {
                  return (
                    <div style={{ display: "flex", marginRight: "10px" }}>
                      <input
                        type="radio"
                        name={index}
                        value={option.optionText}
                        style={{ marginRight: "10px" }}
                        onChange={(e) => {
                          setOptionAnswer(index, indexOp, e.target.checked);
                        }}
                      />
                      <input
                        type="text"
                        className={styles.textInput}
                        placeholder="Option"
                        value={option.optionText}
                        onChange={(e) => handleChangeOption(e, index, indexOp)}
                      />
                      {ques.options.length > 2 && (
                        <IconButton
                          aria-label="delete"
                          onClick={() => removeOption(index, indexOp)}
                        >
                          <CloseOutlined />
                        </IconButton>
                      )}
                    </div>
                  );
                })}

                <div>
                  <Button
                    style={{
                      fontSize: "10px !important",
                      textTransform: "none",
                      color: "#6842f4",
                      fontWeight: "600",
                    }}
                    onClick={() => addOption(index)}
                  >
                    Add Option
                  </Button>
                </div>
                <Divider />
                <div style={{ display: "flex", height: "50px" }}>
                  <div className={styles.questionEdit}>
                    <AddCircleOutline onClick={addQuestion} />
                  </div>
                  <input
                    type="number"
                    className={styles.points}
                    min={0}
                    step={1}
                    placeholder="0"
                    onChange={(e) => setQuestionPoint(index, +e.target.value)}
                  />

                  <IconButton
                    aria-label="delete"
                    onClick={() => removeQuestion(index)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </div>
              </AccordionDetails>
            </Accordion>
          </Grid>
        );
      })}
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          color="primary"
          type="submit"
          style={{
            backgroundColor: "#d31182",
            color: "#ffffff",
            margin: "10px",
            padding: "10px 40px",
          }}
          onClick={(e) => handleCreateTest(e)}
        >
          Create Test
        </Button>
      </div>
    </Grid>
  );
};

export default CreateTest;

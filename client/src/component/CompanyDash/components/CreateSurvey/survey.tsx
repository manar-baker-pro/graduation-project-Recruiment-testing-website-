import React, { useEffect, useState } from "react";
import styles from "./survey.module.css";
import {
  Question,
  RequiredTechnologies,
  Survey,
  techWithExpLevel,
} from "../../../../setup/store/reducers/surveyReducer/surveyReducerModels";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { createSurvey } from "../../../../setup/store/actionsCreators/surveyActionCreators/survey.actionCreator";
import { Button, TextareaAutosize, Typography } from "@mui/material";
import QuestionComponent from "./Question/questionComponent";
import { Technology } from "../../../../setup/store/reducers/technologyReducers/technologyReducerModels";
import DurationSurvey from "./DurationSurvey";
import TechModalSelect from "./technologies/modalSelectTech";
import { RootState } from "../../../../setup/store/store";
export default function SurveyComp(props: any) {
  const dispatch = useDispatch();
  const technologyReducer = useSelector(
    (state: RootState) => state.technologyReducer
  );
  const { technologies } = technologyReducer;
  const [isHovered, setIsHovered] = useState(false);
  const [addQues, setAddQues] = useState<boolean>(false);
  const [survey, setSurvey] = useState<Survey>({
    title: "Job Title",
    description: "",
    requiredExperiences: [],
    questions: [],
  });
  useEffect(() => {
    if (props.surveyUp) {
      setSurvey(props.surveyUp);
    }
  }, [props.surveyUp]);
  const initQuestion = () => {
    const initQues = {
      questionText: "",
      questionType: "radio",
      options: [],
      points: 0,
      open: true,
      required: false,
    };
    setSurvey({ ...survey, questions: [...survey.questions, initQues] });
  };

  const handleUpdateSurvey = (event: React.FormEvent<HTMLButtonElement>) => {
    console.log("from update");
  };
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSurvey({ ...survey, title: value });
  };
  const handeAddExpireDate = (value: Date) => {
    setSurvey({ ...survey, expireDate: value });
  };
  const handleChangeDescription = (event: any) => {
    const value = event.target.value;
    setSurvey({ ...survey, description: value });
  };
  const handleCreateSurvey = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    dispatch(createSurvey(survey));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  // questions
  const expandCloseAll = () => {
    const copyQues = [...survey.questions];
    copyQues.forEach((ques) => {
      ques.open = false;
    });
    setSurvey({ ...survey, questions: copyQues });
  };
  const handleExpand = (index: number) => {
    const copyQues = [...survey.questions];
    copyQues.forEach((ques, indexQ) => {
      ques.open = index === indexQ;
    });
    setSurvey({ ...survey, questions: copyQues });
  };
  const handleChangeQues = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const element = event.target;
    const updatedQuestions = [...survey.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [element.name]: element.value,
    };
    setSurvey({ ...survey, questions: updatedQuestions });
    console.log(updatedQuestions);
  };
  const addQuestion = () => {
    expandCloseAll();
    setSurvey({
      ...survey,
      questions: [
        ...survey.questions,
        {
          questionText: "Question?",
          questionType: "radio",
          options: [],
          points: 0,
          open: true,
          required: false,
        },
      ],
    });
  };
  const copyQuestion = (index: number) => {
    expandCloseAll();
    const copyQuestion = { ...survey.questions[index] };
    setSurvey({ ...survey, questions: [...survey.questions, copyQuestion] });
    console.log(survey.questions);
  };
  const removeQuestion = (index: number) => {
    const removeQues = [...survey.questions];
    if (survey.questions.length > 1) {
      removeQues.splice(index, 1);
      setSurvey({ ...survey, questions: removeQues });
      console.log(removeQues);
    }
  };
  const requiredQues = (index: number) => {
    const reqQues = [...survey.questions];
    reqQues[index].required = !reqQues[index].required;
    setSurvey({ ...survey, questions: reqQues });
    console.log(reqQues[index].required);
  };
  const handleClickQuesType = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
    typeValue: string
  ) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      questionType: typeValue,
    };
    setSurvey({ ...survey, questions: updatedQuestions });
    console.log(survey.questions[index].questionType);
    console.log(updatedQuestions);
  };
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    let item = [...survey.questions];
    const orderItem = reorder(
      item,
      result.source.index,
      result.destination.index
    );
    setSurvey({ ...survey, questions: orderItem });
  };
  const reorder = (list: any, start: number, end: number): any => {
    const result = Array.from(list);
    const [removed] = result.splice(start, 1);
    result.splice(end, 0, removed);
    return result;
  };
  const handleAddTech = (newTech: techWithExpLevel[]) => {
    console.log(newTech);
    const techsMerge: RequiredTechnologies[] = newTech.map((tech) => {
      const t = technologies.find((t) => t.TechnologyName === tech.techName);
      return {
        technology: t,
        experienceLevel: tech.experienceLevel,
      } as RequiredTechnologies;
    });
    setSurvey({
      ...survey,
      requiredExperiences: techsMerge,
    });
  };
  const handleRemoveTech = (techName: string) => {
    console.log(techName);
    const updatedTechs = survey.requiredExperiences?.filter(
      (tech: any) => tech.technology.TechnologyName !== techName
    );
    console.log(updatedTechs);
    setSurvey({
      ...survey,
      requiredExperiences: updatedTechs,
    });
    // console.log(survey.requiredExperiences)
  };

  // answer
  const setOptionAnswer = (index: number, indexOp: number, ans: boolean) => {
    console.log("index is " + ans);
    const copyQuestion = [...survey.questions];
    const options = copyQuestion[index].options.map((option, i) => ({
      ...option,
      isTrue: i === indexOp ? true : false,
    }));
    copyQuestion[index].options = options;
    setSurvey({ ...survey, questions: copyQuestion });
  };
  const setOptionPoint = (index: number, points: number) => {
    let copyQuestion = [...survey.questions];
    copyQuestion[index].points = points;
    setSurvey({ ...survey, questions: copyQuestion });
    console.log(survey.questions[index].points);
  };
  const answerDone = (index: number) => {
    // let copyQuestion = [...survey.questions];
    // copyQuestion[index].answer = !copyQuestion[index].answer;
    // setSurvey({ ...survey, questions: copyQuestion });
    // console.log(survey.questions[index].answer);
  };

  // options
  const handleChangeOption = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    indexOp: number
  ) => {
    console.log("hello from handleChangeOption");
    const upadatedQuestionOp = [...survey.questions];
    upadatedQuestionOp[index].options[indexOp] = {
      ...upadatedQuestionOp[index].options[indexOp],
      optionText: event.target.value,
    };
    setSurvey({ ...survey, questions: upadatedQuestionOp });
    console.log(upadatedQuestionOp[index].options[indexOp].optionText);
  };
  const removeOption = (index: number, indexOp: number) => {
    let removOptionQues: Question[] = [...survey.questions];
    console.log(removOptionQues[index]);
    if (removOptionQues[index].options.length > 1) {
      removOptionQues[index].options.splice(indexOp, 1);
      setSurvey({ ...survey, questions: removOptionQues });
    }
  };
  const addOption = (index: number) => {
    let addOptionQues: Question[] = [...survey.questions];
    if (addOptionQues[index].options.length < 5) {
      addOptionQues[index].options.push({
        optionText: `option ${addOptionQues[index].options.length + 1}`,
        isTrue: false,
      });
      setSurvey({ ...survey, questions: addOptionQues });
    } else {
      console.log("max 5 options");
    }
  };
  return (
    <div className={styles.surveyContainer}>
      
      <div className={styles.surveyGlobalInfo}>
        <input
          type="text"
          name="title"
          className={styles.jobTitle}
          placeholder="Job Title"
          value={survey.title}
          style={{ color: "black" }}
          onChange={handleChangeTitle}
        />
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Job Description"
          name="description"
          className={styles.jobDescription}
          onChange={handleChangeDescription}
        />
      </div>
      <div className={styles.surveyGlobalInfo} style={{ marginTop: "30px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1" style={{ padding: "10px 0" }}>
            Select Required Technologies
          </Typography>

          <TechModalSelect
            handleAddTech={handleAddTech}
            RequiredExperiences={survey.requiredExperiences}
            technologies={technologies}
            handleRemoveTech={handleRemoveTech}
          />
        </div>
      </div>
      <div className={styles.surveyGlobalInfo} style={{ marginTop: "30px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",

            justifyContent: "space-between",
          }}
        >
          <div>
            {" "}
            <DurationSurvey handeAddExpireDate={handeAddExpireDate} />
          </div>
        </div>
      </div>
      {survey.questions.length === 0 && (
        <Button
          style={{
            width: "90%",
            backgroundColor: "#5548ce",
            margin: "10px 5%",
            color: "white",
          }}
          onClick={() => {
            setAddQues(!addQues);
            initQuestion();
          }}
        >
          ADD Question
        </Button>
      )}

      {addQues && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <QuestionComponent
                  survey={survey}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  handleChangeOption={handleChangeOption}
                  addOption={addOption}
                  removeOption={removeOption}
                  answerDone={answerDone}
                  setOptionPoint={setOptionPoint}
                  setOptionAnswer={setOptionAnswer}
                  handleClickQuesType={handleClickQuesType}
                  requiredQues={requiredQues}
                  removeQuestion={removeQuestion}
                  copyQuestion={copyQuestion}
                  handleChangeQues={handleChangeQues}
                  addQuestion={addQuestion}
                  handleExpand={handleExpand}
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {props.surveyUp ? (
          <Button
            color="primary"
            type="submit"
            style={{
              backgroundColor: "#d31182",
              color: "#ffffff",
              margin: "10px",
              padding: "10px 40px",
            }}
            onClick={(e) => handleUpdateSurvey(e)}
          >
            Edit Survey
          </Button>
        ) : (
          <Button
            color="primary"
            type="submit"
            style={{
              backgroundColor: "#d31182",
              color: "#ffffff",
              margin: "10px",
              padding: "10px 40px",
            }}
            onClick={(e) => handleCreateSurvey(e)}
          >
            Create Survey
          </Button>
        )}
      </div>
    </div>
  );
}

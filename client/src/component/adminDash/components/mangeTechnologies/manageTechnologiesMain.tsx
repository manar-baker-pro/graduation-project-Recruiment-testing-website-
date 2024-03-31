import { Fab } from "@mui/material";
import styles from "./manageTechnologies.module.css";
import ReadTechnologies from "./readTechnologies";
import AddIcon from "@mui/icons-material/Add";
import TechModalInfo from "./technologyInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../setup/store/store";
import { useEffect, useState } from "react";
import { Technology } from "../../../../setup/store/reducers/technologyReducers/technologyReducerModels";
import {
  addTechnology,
  deleteTechnology,
  getTechnologies,
  updateTechnology,
} from "../../../../setup/store/actionsCreators/technologyActionCreators/technology.actionCreators";
export const ManageTechnologiesMain = () => {
  const dispatch = useDispatch();
  const technologyReducer = useSelector(
    (state: RootState) => state.technologyReducer
  );
  const { technologies } = technologyReducer;

  useEffect(() => {
    dispatch(getTechnologies());
  }, [dispatch]);
  const [technology, setTechnology] = useState<Technology>({
    TechnologyName: "",
    description: "",
    picture: "",
  });
  const [editTechnology, setEditTechnology] = useState<Technology>({
    TechnologyName: "",
    description: "",
    picture: "",
  });
  const handleAddTechnology = () => {
    dispatch(addTechnology(technology));
    setTechnology({
      TechnologyName: "",
      description: "",
      picture: "",
    });
  };
  const handleUpdateTechnology = (id:string) => {
    dispatch(updateTechnology({...editTechnology,_id:id}));
  };
  const handleEditTechnology = () => {};
  const handleDeleteTechnology = (id: string) => {
    dispatch(deleteTechnology(id));
  };

  const handleChangeTechnology = (name: string, value: string) => {
    console.log("from" + value);
    setTechnology({ ...technology, [name]: value });
  };
  // ???
  const handleInitEditTechnology  = (tech:Technology) => {
  
    setEditTechnology({ ...editTechnology, ...tech });
  };
  const handleChangeEditTechnology = (name: string, value: string) => {
    console.log("from" + value);
    setEditTechnology({ ...editTechnology, [name]: value });
  };
  return (
    <div className={styles.manageTechContainer}>
      <div className={styles.manageTechContent}>
        <div className={styles.HeaderTitle}>Technologies</div>
        <div className={styles.cardsContainer}>
          {technologies?.map((tech, indexTech) => {
            return (
              <ReadTechnologies
                key={indexTech}
                editTechnology={editTechnology}
                handleChangeEditTechnology={handleChangeEditTechnology}
                handleEditTechnology={handleEditTechnology}
                id={tech._id}
                TechnologyName={tech.TechnologyName}
                description={tech.description}
                picture={tech.picture}
                handleInitEditTechnology={handleInitEditTechnology}
                handleDeleteTechnology={handleDeleteTechnology}
                handleUpdateTechnology={handleUpdateTechnology}
              />
            );
          })}
        </div>

        <TechModalInfo
          element={
            <Fab
              variant="extended"
              style={{
                position: "fixed",
                bottom: "36px",
                right: "36px",
                fontSize: "16px",
                color: "#fff",
                backgroundColor: "var(--purple-to-blue)",
              }}
            >
              <AddIcon style={{ fontSize: "18px" }} /> Add Technology
            </Fab>
          }
          handleChangeTechnology={handleChangeTechnology}
          technology={technology}
          handleAddTechnology={handleAddTechnology}
          operation={"add"}
        />
      </div>
    </div>
  );
};

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Technology } from "../../../../setup/store/reducers/technologyReducers/technologyReducerModels";
import { getTechnologies } from "../../../../setup/store/actionsCreators/technologyActionCreators/technology.actionCreators";

export default function SelectSkill(props: any) {
  const dispatch = useDispatch();
  const [tech, setTech] = React.useState("");
  const { technologies, handleChangeTech } = props;
  const handleChange = (event: SelectChangeEvent) => {
    handleChangeTech(event.target.value);
  };
  useEffect(() => {
    dispatch(getTechnologies());
  }, [dispatch]);
  return (
    <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-simple-select-filled-label">Technologies</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={tech}
        onChange={(e) => {
          handleChange(e);
          setTech(e.target.value);
        }}
      >
        {technologies?.map((tech: any, indexTech: number) => {
          return (
            <MenuItem key={indexTech} value={tech.TechnologyName}>
              {tech.TechnologyName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../setup/store/store";
import styles from "../survey.module.css";
import { getTechnologies } from "../../../../../setup/store/actionsCreators/technologyActionCreators/technology.actionCreators";
import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { techWithExpLevel } from "../../../../../setup/store/reducers/surveyReducer/surveyReducerModels";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
      fontSize: 16,
    },
  },
};
function getStyles(
  tech: string,
  techSelected: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      techSelected.indexOf(tech) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SELECTTECH(props: any) {
  const theme = useTheme();
  const { handleAddTech, handleClose, RequiredExperiences,handleRemoveTech } = props;
  const dispatch = useDispatch();
  const technologyReducer = useSelector(
    (state: RootState) => state.technologyReducer
  );
  const { technologies } = technologyReducer;
  const [techSelected, setTechSelected] = React.useState<techWithExpLevel[]>(
    RequiredExperiences?.map((tech: any) => {
      return {
        techName: tech.technology.TechnologyName,
        experienceLevel: tech.experienceLevel,
      };
    })
  );
  const [sel, setSel] = React.useState<string[]>(
    RequiredExperiences?.map((tech: any) => {
      return tech.technology.TechnologyName;
    })
  );
  React.useEffect(() => {
    dispatch(getTechnologies());
  }, [dispatch]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const selectedTech = typeof value === "string" ? value.split(",") : value;
    setSel(selectedTech);
    const tempTech = selectedTech.map((techSel) => {
      return { techName: techSel, experienceLevel: "" };
    });
    setTechSelected(tempTech);
  };
  const handleAddTechWithExp = (expLevel: string, index: number) => {
    let techs: techWithExpLevel[] = [...techSelected];
    techs[index].experienceLevel = expLevel;
    setTechSelected(techs);
  };
  return (
    <div>
      <FormControl sx={{ m: 0, width: 300, minHeight: "60px", border: "none" }}>
        <InputLabel
          id="demo-multiple-chip-label"
          sx={{ fontSize: "16px !important", BorderBottom: "none" }}
        >
          Technologies
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={sel}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Technologies" />
          }
          MenuProps={MenuProps}
          sx={{ minHeight: "20px" }}
        >
          {technologies?.map((tech, indexTech) => (
            <MenuItem
              key={indexTech}
              value={tech.TechnologyName}
              style={getStyles(tech.TechnologyName, sel, theme)}
            >
              {tech.TechnologyName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        {techSelected?.map((tech, indexTech) => {
          return (
            <div style={{ margin: "10px", display: "flex" }} key={indexTech}>
              <FormControl
                sx={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  style={{
                    width: "18%",
                    margin: "010px",
                    cursor: "pointer",
                    backgroundColor: "#939eff",
                    color: "white",
                    padding: "10px 20px",
                    textAlign: "center",
                  }}
                >
                  {tech.techName}
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  style={{ width: "80%" }}
                >
                  <FormControlLabel
                    value="junior"
                    control={<Radio size="small" />}
                    label="Junior"
                    style={{ fontSize: "10px " }}
                    checked={tech.experienceLevel === "junior"}
                    onChange={() => handleAddTechWithExp("junior", indexTech)}
                  />
                  <FormControlLabel
                    value="intermidate"
                    control={<Radio size="small" />}
                    label="Intermidate"
                    checked={tech.experienceLevel === "intermidate"}
                    onChange={() =>
                      handleAddTechWithExp("intermidate", indexTech)
                    }
                  />
                  <FormControlLabel
                    value="senior"
                    control={<Radio size="small" />}
                    label="Senior"
                    checked={tech.experienceLevel === "senior"}
                    onChange={() => handleAddTechWithExp("senior", indexTech)}
                  />
                  <FormControlLabel
                    value="whatever"
                    control={<Radio size="small" />}
                    label="Whatever"
                    checked={tech.experienceLevel === "whatever"}
                    onChange={() => handleAddTechWithExp("whatever", indexTech)}
                  />
                </RadioGroup>
              </FormControl>
              {/* <CloseOutlined
                style={{ fontSize: "18px" }}
                onClick={() => handleRemoveTech(tech.techName)}

              /> */}
            </div>
          );
        })}

        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            margin: "15px 0",
          }}
        >
          <Button
            className={styles.technologyBtn}
            style={{
              backgroundColor: "var(--purple-to-blue)",
              border: "none !important",
            }}
            onClick={() => {
              handleClose();
              handleAddTech(techSelected);
            }}
          >
            <span style={{ fontSize: "14px", color: "#ffff" }}>Done</span>
          </Button>
          <Button className={styles.technologyBtn} onClick={handleClose}>
            <span style={{ fontSize: "14px", color: "var(--purple-to-blue)" }}>
              cancel
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Slider } from "@mui/material";

const SelectTech = (props: any) => {
  const { technologies } = props;
  const [techSelected, setTechSelected] = React.useState("");
  const [successRate, setSuccessRate] = React.useState(50);
  const handleChange = (event: SelectChangeEvent) => {
    setTechSelected(event.target.value);
  };
  const handleSuccessRateChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setSuccessRate(newValue as number);
  };
  return (
    <>
      <FormControl required sx={{ m: 100, width: 200 }}>
        <InputLabel id="demo-simple-select-required-label">Technology</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={techSelected}
          label="Technology *"
          onChange={handleChange}
        >
          {technologies?.map((tech: any, indexTech: any) => {
            return <MenuItem>{tech.TechnologyName}</MenuItem>;
          })}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      {techSelected && (
        <Slider
          value={successRate}
          onChange={handleSuccessRateChange}
          aria-labelledby="success-rate-slider"
          valueLabelDisplay="auto"
          marks
          min={0}
          max={100}
        />
      )}
    </>
  );
};

export default SelectTech;

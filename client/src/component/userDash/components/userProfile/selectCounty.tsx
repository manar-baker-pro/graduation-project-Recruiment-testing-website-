import { FormControl, InputLabel,Select, MenuItem } from "@mui/material";
import React from "react";
// import Select from "react-select";
import CountryList from "react-select-country-list";
import { styled } from "@mui/system";
const CountrySelect = (props: any) => {
  const { coValue, handleChangeProfile, disabled } = props;
  const countryOptions = CountryList().getData();

  const CustomSelect = styled(Select)`
  
      border-radius: 5px;
      /* padding: 10px; */
      font-size: 14px !important;
      width: 100% !important;
      transition: border-color 0.3s ease;
      box-shadow:0 0 3px #5c2be2" : "none;
      &:focus{
        border: 2px solid #5c2be2;

      }
  `;
 

  return (
    <div style={{ width: "100%" }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="country-select">Country</InputLabel>
        <CustomSelect
          id="country-select"
          value={coValue}
          disabled={disabled}
          onChange={(event) =>
            handleChangeProfile("country", event.target.value)
          }
          label="Country"
        >
          {countryOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CustomSelect>
      </FormControl>
      {/* <Select
        id="country-select"
        options={countryOptions}
        value={coValue}
        isDisabled={disabled}
        styles={customStyles}
        onChange={(selectedOption:any) =>
          handleChangeProfile("country", selectedOption.value)
        }
      /> */}
    </div>
  );
};

export default CountrySelect;

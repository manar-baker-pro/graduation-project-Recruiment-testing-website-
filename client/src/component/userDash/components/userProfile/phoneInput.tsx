import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { format } from "libphonenumber-js";
import { styled } from "@mui/system";
// const Container = styled(div)`
//   width: 100%;
// `;

const StyledPhoneInput = styled(PhoneInput)`
  border: none;
  outline: none;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  background: red;
  transition: border-color 0.3s ease;

  & input[type="tel"] {
    height: 50px;
    outline: none;
    width: 100%;
  }
  & input[type="tel"]:focus {
    outline: none;
    border-color: #5c2be2;
    box-shadow: 0 0 3px #5c2be2;
  }
  & .selected-flag {
    background: #dbe8f0 !important;
  }
  & .country {
    transition: all 0.3s linear;
  }
  & .country:hover {
    background: #cfc8f7 !important;
  }
  & .country.highlight {
    background: #a78cf1 !important;
  }
  & .country-list {
    width: 350px !important;
    overflow: scroll;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }

  & .country-list::-webkit-scrollbar {
    width: 6px;
  }

  & .country-list::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 3px;
  }

  & .country-list::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const PhoneNumberInput = (props: any) => {
  const { edit, handleChangeProfile, userProfile } = props;
  const [selectedCountry, setSelectedCountry] = useState(1);

  const handlePhoneNumberChange = (value: string, data: any) => {
    handleChangeProfile("phoneNumber", value);
  };

  return (
    <div>
      <StyledPhoneInput
        country={selectedCountry}
        value={userProfile.phoneNumber}
        inputProps={{ name: "phoneNumber" }}
        onChange={handlePhoneNumberChange}
        disabled={!edit}
        buttonStyle={{ color: "black" }}
      />
    </div>
  );
};

export default PhoneNumberInput;

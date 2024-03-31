import * as React from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Box, FormHelperText} from "@mui/material"

export default function DurationSurvey(props:any) {
  const currentDateTime = dayjs();
  const {handeAddExpireDate}=props;
  const [selectedDateTime, setSelectedDateTime] = React.useState<Dayjs | null>(
    null
  );
  const [validationError, setValidationError] = React.useState<string>("");
  const handleDateTimeChange = (newDate: Dayjs | null) => {
    // if (dayjs(newDate).isValid()) {
    //   const formattedDateTime = dayjs(newDate).format();
    setSelectedDateTime(newDate);
    console.log(selectedDateTime);
    // }else{
    //   setValidationError("Date and Time is not valid ")
    // }
  };
  const validateDateTime = () => {
    if (!selectedDateTime) {
      setValidationError("should detect the date and time");
      return false;
    }

    if (selectedDateTime.isBefore(currentDateTime)) {
      setValidationError("should detect the date and time in future");
      return false;
    }

    return true;
  };
  const handleAcceptDateTime = (newDate:Dayjs|null) => {
    const isValid = validateDateTime();
    if (isValid) {
      handeAddExpireDate(newDate);
      setValidationError("");
    }
  };
  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
 
        }}
      >
        <div>
          <div>Select expire date</div>
          <FormHelperText>if you dont select date the survey will remain available</FormHelperText>
        </div>
        <div style={{ fontSize: "14px", color: "#868585" }}>Optional *</div>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["MobileDateTimePicker "]}>
          <DemoItem>
            <MobileDateTimePicker
              orientation="portrait"
              value={selectedDateTime}
              onChange={handleDateTimeChange}
              onAccept={handleAcceptDateTime}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
      {validationError && (
        <FormHelperText style={{ color: "red" }}>
          {validationError}
        </FormHelperText>
      )}
    </div>
  );
}

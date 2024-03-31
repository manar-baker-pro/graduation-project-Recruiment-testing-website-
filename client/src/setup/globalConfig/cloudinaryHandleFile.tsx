import axios, { AxiosResponse } from "axios";
import React from "react";

const UploadFileComponent = (props: any) => {
  const { handleUploadCv, element } = props;
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const [progress, setProgress] = React.useState<number>(0);
  const handleClick = () => {
    hiddenFileInput?.current?.click();
  };
  const handlePdfUpload = async (file: File | undefined) => {
    if (file) {
      const cloudName = "db2jgtrwm";
      const uploadPreset = "ctwksivr";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const response: AxiosResponse<any> = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        const { secure_url } = response.data;
        console.log(response.data);
        props.ques
          ? props.handleAnswerChange(props.ques._id, secure_url, props.ques)
          : props.handleUploadF(secure_url, "license");
        handleUploadCv && handleUploadCv("cv", secure_url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  return (
    <div style={{ marginTop: "8px" }}>
      {/* {progress ? <CircularProgressWithLabel value={progress} /> : ""} */}
      <div onClick={handleClick}>{element}</div>
      <input
        name={props.ques?._id ? props.ques?._id : "license"}
        type="file"
        accept="application/pdf"
        onChange={(e) => handlePdfUpload(e.target.files?.[0] || undefined)}
        ref={hiddenFileInput}
        disabled={props.edit !== undefined ? !props.edit : false}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UploadFileComponent;

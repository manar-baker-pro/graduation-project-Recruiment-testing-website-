
import axios from "axios";
import React from "react";
import { CircularProgressWithLabel } from "../../component/CompanyDash/components/companyprofile/progress";
export default function Cloudinary(props: any) {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const [progress, setProgress] = React.useState<number>(0);
  const { element } = props;
  const handleClick = () => {
  
    hiddenFileInput?.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("change coooo")
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      const typeOfImage = image.type.substring(0, 5);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "fxqmthwf");
      console.log(formData);
      axios
        .request({
          method: "post",
          url: `http://api.cloudinary.com/v1_1/db2jgtrwm/${typeOfImage}/upload`,
          data: formData,
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            if (total) {
              const percentCompleted = Math.round((loaded * 100) / total);
              setProgress(percentCompleted);
            }
          },
        })
        .then((res: any) => {
          console.log(res);
          props.handleSetImage(event.target.name, res.data.secure_url);
          setProgress(0);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      {progress ? <CircularProgressWithLabel value={progress} /> : ""}
      <div onClick={handleClick}>{element}</div>
      

      <input
        type="file"
        name={props.name}
        onChange={(e) => handleImageUpload(e)}
        ref={hiddenFileInput}
        disabled={props.edit!==undefined?!props.edit:false}
        style={{ display: "none" }}
      />
    </div>
  );
}

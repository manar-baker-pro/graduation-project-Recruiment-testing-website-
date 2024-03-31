import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Button } from "@mui/material";
import styles from "./manageTechnologies.module.css";
// import { color } from "@cloudinary/url-gen/qualifiers/background";
import TechModalDelete from "./modelTechDelete";
import TechModalInfo from "./technologyInfo";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ReadTechnologies(props: any) {
  const [expanded, setExpanded] = React.useState(false);
  const {
    editTechnology,
    handleChangeEditTechnology,
    TechnologyName,
    description,
    picture,
    handleDeleteTechnology,
    handleInitEditTechnology,
    handleUpdateTechnology,
    id,
  } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        width: ["300px", "440px"],
        margin: "10px",
        "@media screen and (max-width: 800px)": {
          width: "360px",
        },
      }}
    >
      <CardHeader
        avatar={<Avatar src={picture ? picture : ""}>R</Avatar>}
        action={
          <CardActions>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        }
        title={TechnologyName}
        subheader={description}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <TechModalInfo
              element={
                <Button
                  className={styles.technologyBtn}
                  onClick={()=>handleInitEditTechnology({
                    TechnologyName: TechnologyName,
                    description: description,
                    picture: picture,
                  })}
                >
                  <EditRoundedIcon
                    style={{
                      fontSize: "14px",
                      margin: "3px",
                      color: "#4533ec",
                    }}
                  />
                  <span style={{ fontSize: "14px", color: "#4533ec" }}>
                    Edit
                  </span>
                </Button>
              }
              TechnologyName={TechnologyName}
              description={description}
              picture={picture}
              editTechnology={editTechnology}
              handleChangeEditTechnology={handleChangeEditTechnology}
              operation={"edit"}
              id={id}
              handleUpdateTechnology={handleUpdateTechnology}
            />
            <TechModalDelete id={id} handleDelete={handleDeleteTechnology} />
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}

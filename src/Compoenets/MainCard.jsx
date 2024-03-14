import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Box, Tooltip } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import { useNavigate } from "react-router-dom";
import JobDetails from "../pages/JobDetails";
import { useState } from "react";

export default function MainCard(props) {
  const nav = useNavigate();
  function hoursAgo(isoDateString) {
    if (!isoDateString) {
      return <Typography>{"..."}</Typography>;
    }
    const date = new Date(isoDateString);
    const now = new Date();
    const difference = now - date; // This gives difference in milliseconds
    const hoursAgo = Math.floor(difference / (1000 * 60 * 60)); // Convert milliseconds to hours

    return <Typography>{`${hoursAgo} hours ago`}</Typography>;
  }

  const [Show, setShow] = useState(false);
  const toggleModal = () => {
    setShow(!Show);
  };

  return (
    <>
      <Tooltip title="Open details" placement="left" arrow followCursor>
        <Card className="mt-6 border-2 rounded-lg shadow-xl p-4  mx-[1rem] hover:scale-[1.04] hover:shadow-2xl duration-200 ease-in cursor-pointer">
          <CardBody onClick={() => setShow(true)}>
            <Box
              variant="h5"
              className="mb-2 gap-y-2 lg:gap-y-0 md:gap-y-0 font-bold  flex md:flex-row lg:flex-row md:justify-between justify-between"
            >
              {props.title}
              <Typography className="bg-purple-600 p-3 text-white rounded-full">
                {props.feas}
              </Typography>
            </Box>
            <Box
              variant="h5"
              className="mb-2 gap-y-2 lg:gap-y-0 md:gap-y-0  flex md:flex-row lg:flex-row md:justify-between justify-between"
            >
              {props.type}
              {hoursAgo(props.createAt)}
            </Box>
            <Box
              variant="h5"
              className="mb-2 gap-y-1 lg:gap-y-0 md:gap-y-0 text-purple-900 font-bold  flex md:flex-row lg:flex-row md:justify-between justify-between"
            >
              {props.comp}
              <Typography className="text-slate-700">{props.pos}</Typography>
            </Box>
            <Typography className="mt-4 text-slate-500">
              {props.desc.length >= 160
                ? props.desc.slice(0, 159) + "..."
                : props.desc}
            </Typography>
          </CardBody>
          <CardFooter className="mt-4 flex-col lg:flex-row md:flex-row flex md:justify-between justify-between">
            {props.apply ? (
              <Tooltip title="Click To apply" arrow>
                <Button className="text-slate-50 hover:scale-[1.04] bg-purple-500 p-2 duration-100 ease-in">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=${
                      props.apply ? props.apply : "hr@notfound"
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply
                  </a>
                </Button>
              </Tooltip>
            ) : (
              <DoNotDisturbAltOutlinedIcon />
            )}

            <Typography className="flex justify-end mt-4 lg:mt-0 md:mt-0">
              {props.city}
            </Typography>
          </CardFooter>
          <Box className="text-purple-950  mt-4 flex gap-2">
            Skills :{" "}
            <Typography className="text-slate-500 font-bold">
              {props.skill.map((skill, ind) => `${skill}`).join(" ")}
            </Typography>
          </Box>
          <Box className="text-slate-400 mt-4 flex justify-between">
            {props.hash.map((hash, ind) => `#${hash}`).join(" ")}
            <Box className="text-slate-700 gap-2 flex">
              <Typography>{props.views}</Typography>
              <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon>
            </Box>
          </Box>
        </Card>
      </Tooltip>
      <JobDetails
        show={Show}
        toggleModal={toggleModal}
        mainDesc={props.main}
        load={props.load}
      />
    </>
  );
}

import React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalOverflow from "@mui/joy/ModalOverflow";
import ModalDialog from "@mui/joy/ModalDialog";
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { propTypesSelected } from "@material-tailwind/react/types/components/select";

const index = (props) => {
  return (
    <Modal open={props.show ? props.show : false} color="secondary">
      <ModalOverflow>
        <ModalDialog
          color="primary"
          layout="center"
          size="lg"
          variant="outlined"
        >
          <ModalClose onClick={props.toggleModal} />
          {props.load ? (
            <Stack
              sx={{ color: "grey.500" }}
              mt={10}
              spacing={2}
              direction="row"
            >
              <CircularProgress color="secondary" />
            </Stack>
          ) : (
            <Box>
              {props.Ulocation && !props.load ? (
                <Box
                  key={props.uuid}
                  component={"div"}
                  className="flex flex-col"
                >
                  <Typography> We are Hiring !!</Typography>
                  <Box component={"br"} />

                  <Box>
                    <Typography>
                      We are Looking for{" " + props.Upos + " "}
                      <Box component={"strong"}>{props.Utitle}</Box> for our{" "}
                      {props.Ucomp} company
                    </Typography>
                    <Typography>
                      <Box component={"strong"}>{props.Uexp}</Box> years of
                      experience required
                    </Typography>
                    <Box component={"br"} />
                    <Typography>
                      Good Skills of :{" "}
                      <Box component={"strong"}>
                        {props.Uskill.map((skill, ind) => `${skill}`).join(
                          ", "
                        )}
                      </Box>{" "}
                      are required although
                    </Typography>
                    <Typography>
                      this is an <Box component={"strong"}>{props.Ufeas}</Box>{" "}
                      opportunity
                    </Typography>
                    <Box component={"br"} />
                    <Typography>
                      Location :{" "}
                      <Box component={"strong"}>
                        {props.Ulocation + " "},{" " + props.Ucity}
                      </Box>
                    </Typography>
                    <Box component={"br"} />
                    <Box component={"br"} />
                    <Typography>
                      If you are willing to join us appy on{" "}
                      <Box component={"strong"}>{props.Uapply}</Box>
                    </Typography>
                  </Box>
                </Box>
              ) : props.load ? (
                <CircularProgress />
              ) : (
                props.mainDesc ? (<Typography
                  dangerouslySetInnerHTML={{ __html: props.mainDesc }}
                ></Typography>) : (<CircularProgress/>)
              )}
            </Box>
          )}
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};

export default index;

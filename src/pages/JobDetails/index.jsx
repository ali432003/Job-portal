import React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalOverflow from "@mui/joy/ModalOverflow";
import ModalDialog from "@mui/joy/ModalDialog";
import { Box, Typography } from "@mui/material";

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
              <Typography
                dangerouslySetInnerHTML={{ __html: props.mainDesc }}
              ></Typography>
            </Box>
          )}
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};

export default index;

import { Avatar, Container, Stack, Typography } from "@mui/material";
import React from "react";

const BasicInfoDisplay = ({ userInfo }) => {
  console.log(userInfo, "IN Basic Info Display");
  return (
    <Container>
      <Stack alignItems={"center"}>
        <Avatar>RP</Avatar>
        <Typography variant="h6">
          {userInfo?.firstName} {userInfo?.lastName}
        </Typography>
        <Typography variant="body2">{userInfo?.username}</Typography>
        <Typography variant="body2">{userInfo?.email}</Typography>
        <Typography variant="body2">{userInfo?.level}</Typography>
      </Stack>
    </Container>
  );
};

export default BasicInfoDisplay;

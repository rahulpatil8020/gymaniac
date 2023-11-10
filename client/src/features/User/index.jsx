import { Container, Box, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "features/User/userSlice";
import { useGetUserInfoByUsernameQuery } from "./userApiSlice";
import { useEffect } from "react";
const ProfilePage = () => {
  const currentUser = useSelector(selectUserInfo);
  const pathname = window.location.pathname;
  const parts = pathname.split("/");
  const username = parts[parts.length - 1];

  const {
    data: userInfo,
    error,
    isLoading,
  } = useGetUserInfoByUsernameQuery(username);

  console.log(userInfo);

  return (
    <Container maxWidth="md">
      <WidgetWrapper sx={{ marginTop: 5 }}>
        <Box>
          <Typography>This is Profile Page of {username}</Typography>
          {currentUser?.username === username && (
            <Typography>This user is currently logged in</Typography>
          )}
        </Box>
      </WidgetWrapper>
    </Container>
  );
};

export default ProfilePage;

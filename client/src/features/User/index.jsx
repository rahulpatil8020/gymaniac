import { Container, Box, Typography, Stack } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "features/User/userSlice";
import { useGetUserInfoByUsernameQuery } from "./userApiSlice";
import { useEffect } from "react";
import PersonalInfoForm from "./PersonalInfoForm";
import PersonalInfoDisplay from "./PersonalInfoDisplay";
import BasicInfoDisplay from "./BasicInfoDisplay";
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

  return (
    <Container maxWidth="md">
      <Stack sx={{ marginTop: 3 }} direction="column" spacing={3}>
        {!userInfo?.PersonalInfo?.age > 12 &&
          currentUser?.username === username && (
            <PersonalInfoForm userInfo={userInfo} />
          )}
        <WidgetWrapper>
          <BasicInfoDisplay userInfo={userInfo} />
        </WidgetWrapper>
        {currentUser?.username === username && (
          <WidgetWrapper>
            <PersonalInfoDisplay personalInfo={userInfo?.personalInfo} />
          </WidgetWrapper>
        )}
      </Stack>
    </Container>
  );
};

export default ProfilePage;

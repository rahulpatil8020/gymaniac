import { Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const PersonalInfoDisplay = ({ personalInfo }) => {
  console.log(personalInfo);
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <TextField disabled label="Age" defaultValue={personalInfo?.age} />
        </Grid>
        <Grid item xs={3}>
          <TextField
            disabled
            label="Height"
            defaultValue={personalInfo?.height}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            disabled
            label="Weight"
            defaultValue={personalInfo?.weight}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            disabled
            label="Gender"
            defaultValue={personalInfo?.gender}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            disabled
            label="Desired Physique"
            defaultValue={personalInfo?.desiredPhysique}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            disabled
            label="Fitness Level"
            defaultValue={personalInfo?.fitnessLevel}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            disabled
            label="Specific Goal"
            defaultValue={personalInfo?.specificGoal}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PersonalInfoDisplay;

import {
  useTheme,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import InputField from "components/InputField";
import InputFieldLabel from "components/InputFieldLabel";
import { useUpdateUserInfoMutation } from "./userApiSlice";

const PersonalInfoForm = ({ userInfo }) => {
  const [
    updateUserInfo,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateUserInfoMutation();
  const theme = useTheme();
  const [personalInfo, setPersonalInfo] = useState({
    age: 18,
    height: 140,
    weight: 150,
    gender: "Male",
    fitnessLevel: "Beginner",
    desiredPhysique: "Bulky",
    workoutLocation: "Indoor",
    specificGoal: "",
    physicalLimitation: "",
  });
  const [validationError, setValidationError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const heightInputProps = {
    type: "number",
    inputProps: {
      min: 0,
      max: 250,
      step: 1,
    },

    endAdornment: <InputAdornment position="end">cms</InputAdornment>,
  };
  const ageInputProps = {
    type: "number",
    inputProps: {
      min: 0,
      max: 80,
      step: 1,
    },
  };
  const bmiInputProps = {
    type: "number",
    inputProps: {
      min: 0,
      max: 100,
      step: 1,
    },
  };
  const weightInputProps = {
    type: "number",
    endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
    inputProps: {
      min: 0,
      max: 400,
      step: 1,
    },
  };
  const handlePersonalInfoChange = (event) => {
    const { name, value } = event.target;

    // Validation functions for each input
    const validateAge = (value) => {
      const min = 0;
      const max = 80;
      return value >= min && value <= max;
    };

    const validateHeight = (value) => {
      const min = 0;
      const max = 250;
      return value >= min && value <= max;
    };

    const validateWeight = (value) => {
      const min = 0;
      const max = 400;
      return value >= min && value <= max;
    };

    const validateBMI = (value) => {
      // Assuming BMI is calculated using height and weight
      const height = personalInfo?.height || 0;
      const weight = personalInfo?.weight || 0;

      const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
      return !isNaN(bmi) && bmi >= 0; // Basic check for a valid numeric BMI
    };

    // Update state based on input name and validation
    switch (name) {
      case "age":
        if (validateAge(value)) {
          setPersonalInfo((prevInfo) => ({ ...prevInfo, age: value }));
        } else {
          setValidationError("Invalid age. Please enter a valid age.");
          setSnackbarOpen(true);
        }
        break;
      case "height":
        if (validateHeight(value)) {
          setPersonalInfo((prevInfo) => ({ ...prevInfo, height: value }));
        } else {
          setValidationError("Invalid height. Please enter a valid height.");
          setSnackbarOpen(true);
        }
        break;
      case "weight":
        if (validateWeight(value)) {
          setPersonalInfo((prevInfo) => ({ ...prevInfo, weight: value }));
        } else {
          setValidationError("Invalid weight. Please enter a valid weight.");
          setSnackbarOpen(true);
        }
        break;
      case "bmi":
        if (validateBMI(value)) {
          setPersonalInfo((prevInfo) => ({ ...prevInfo, bmi: value }));
        } else {
          setValidationError("Invalid BMI. Please enter a valid BMI.");
          setSnackbarOpen(true);
        }
        break;
      // Add cases for other inputs as needed
      default:
        setPersonalInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const uploadpersonalInfo = async () => {
    if (
      personalInfo.age < 12 ||
      personalInfo.height < 100 ||
      personalInfo.weight < 80
    )
      return;

    const updatedUserInfo = { ...userInfo, personalInfo };
    console.log(updatedUserInfo);
    await updateUserInfo(updatedUserInfo);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent message={validationError} />
      </Snackbar>
      <WidgetWrapper>
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <InputFieldLabel htmlFor="age" labelText="Age" />
            <InputField
              value={personalInfo?.age}
              name="age"
              handleChange={handlePersonalInfoChange}
              type="number"
              inputProps={ageInputProps}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InputFieldLabel htmlFor="gender" labelText="Gender" />
            <Select
              name="gender"
              id="gender"
              defaultValue={"Male"}
              //   value={userInput.desiredPhysique}
              onChange={handlePersonalInfoChange}
              fullWidth
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <InputFieldLabel htmlFor="fitnessLevel" labelText="Fitness Level" />
            <Select
              name="fitnessLevel"
              id="fitnessLevel"
              defaultValue={"Beginner"}
              onChange={handlePersonalInfoChange}
              //   onChange={handleInputChange}
              fullWidth
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <InputFieldLabel
              htmlFor="desiredPhysique"
              labelText="Desired Physique"
            />
            <Select
              name="desiredPhysique"
              id="desiredPhysique"
              defaultValue={"Bulky"}
              //   value={userInput.desiredPhysique}
              onChange={handlePersonalInfoChange}
              fullWidth
            >
              <MenuItem value="Bulky">Bulky</MenuItem>
              <MenuItem value="Muscular">Muscular</MenuItem>
              <MenuItem value="Lean Muscle">Lean Muscle</MenuItem>
              <MenuItem value="Toned">Toned</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <InputFieldLabel htmlFor="height" labelText="Height" />
            <InputField
              value={personalInfo?.height}
              name="height"
              handleChange={handlePersonalInfoChange}
              // label="Height"
              inputProps={heightInputProps}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InputFieldLabel htmlFor="weight" labelText="Weight" />
            <InputField
              value={personalInfo?.weight}
              name="weight"
              handleChange={handlePersonalInfoChange}
              // label="Weight"
              inputProps={weightInputProps}
            />
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <label htmlFor="bmi" style={{ marginBottom: "8px" }}>
              BMI
            </label>
            <InputField
              value={personalInfo?.bmi}
              name="bmi"
              handleChange={handlePersonalInfoChange}
              // label="BMI"
              inputProps={bmiInputProps}
            />
          </Grid> */}
          <Grid item xs={12} md={4}>
            <InputFieldLabel htmlFor="specificGoal" labelText="Specific Goal" />
            <InputField
              value={personalInfo?.specificGoal}
              name="specificGoal"
              handleChange={handlePersonalInfoChange}
              // label="Specific Goal"
              type="text"
              notRequired
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InputFieldLabel
              htmlFor="physicalLimitation"
              labelText="Any Physical Limitation"
            />
            <InputField
              value={personalInfo?.physicalLimitation}
              name="physicalLimitation"
              handleChange={handlePersonalInfoChange}
              // label="Any Physical Limitation"
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InputFieldLabel
              htmlFor="workoutLocation"
              labelText="Workout Location"
            />
            <Select
              name="workoutLocation"
              id="workoutLocation"
              defaultValue={"Indoor"}
              //   value={userInput.desiredPhysique}
              onChange={handlePersonalInfoChange}
              fullWidth
            >
              <MenuItem value="Indoor">Indoor</MenuItem>
              <MenuItem value="Outdoor">Outdoor</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Button
          onClick={uploadpersonalInfo}
          fullWidth
          type="submit"
          sx={{
            m: "2rem 0 1rem",
            p: "1rem",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.alt,
            "&:hover": {
              backgroundColor: theme.palette.neutral.dark,
              color: theme.palette.primary.main,
            },
          }}
        >
          Upload
        </Button>
      </WidgetWrapper>
    </>
  );
};

export default PersonalInfoForm;

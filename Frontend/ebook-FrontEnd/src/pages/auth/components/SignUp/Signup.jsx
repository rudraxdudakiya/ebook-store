import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Typography,
  TextField,
  Link,
  Paper,
  Avatar,
  Backdrop,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutline";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signup } from "../../services/auth/Auth";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const defaultTheme = createTheme();

export default function Signup() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [formData, setFormdata] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormdata({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = { ...formErrors };
    switch (name) {
      case "firstname":
        errors.firstname =
          value.trim() === ""
            ? "First Name is required"
            : value.trim().length < 3
            ? "First Name must be more than 3 characters"
            : "";
        break;
      case "lastname":
        errors.lastname =
          value.trim() === ""
            ? "Last Name is required"
            : value.trim().length < 3
            ? "Last Name must be more than 3 characters"
            : "";
        break;
      case "email":
        errors.email =
          value.trim() === ""
            ? "Email is required"
            : !/\S+@\S+\.\S+/.test(value)
            ? "Invalid email address"
            : "";
        break;
      case "password":
        errors.password =
          value.trim() === ""
            ? "Password is required"
            : value.length < 6
            ? "Password must be at least 6 characters"
            : !/[A-Z]/.test(value)
            ? "Password must contain at least one uppercase letter"
            : !/[0-9]/.test(value)
            ? "Password must contain at least one number"
            : !/[!@#$%^&*(),.?":{}|<>]/.test(value)
            ? "Password must contain at least one special character"
            : "";
        break;
      case "confirmPassword":
        errors.confirmPassword =
          value !== formData.password ? "Passwords do not match" : "";
        break;
    }
    setFormErrors(errors);
  };

  const isFormValid = () => {
    return (
      formData.firstname.trim().length >= 3 &&
      formData.lastname.trim().length >= 3 &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.password.length >= 6 &&
      /[A-Z]/.test(formData.password) &&
      /[0-9]/.test(formData.password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) &&
      formData.confirmPassword === formData.password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const errors = {};
    // Object.keys(formData).forEach((field) => {
    //     validateField(field, formData[field]);
    //     if (formData[field].trim() === "") {
    //         errors[field] = `${field} is required`;
    //     }
    // });
    // setFormErrors(errors);

    // if (Object.values(errors).some((error) => error)) {
    //     setLoading(false);
    //     return;
    // }

    // console.log("Form submitted successfully:", formData);
    console.log("Form data being sent:", formData);

    try {
      const response = await signup(formData);
      if (response.status === 201) {
        navigate("/login");
        enqueueSnackbar("Login Successfully !", {
          variant: "success",
          autoHideDuration: 5000,
        });
      }
    } catch (error) {
      if (error.response && error.response.statuse === 406) {
        enqueueSnackbar("Email already Exist !", {
          variant: "error",
          autoHideDuration: 5000,
        });
      } else {
        enqueueSnackbar("Sign Up failed !", {
          variant: "error",
          autoHideDuration: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* <GoogleOAuthProvider clientId=""> */}

      <ThemeProvider theme={defaultTheme}>
        <Container
          maxWidth="md"
          sx={{
            height: "110vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CssBaseline />
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 0, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>

              <Typography
                variant="h5"
                sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
              >
                Sign Up
              </Typography>
            </Box>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <div className="mb-0">
                <Typography variant="body1" sx={{ my: 2, fontWeight: "bold" }}>
                  Name :
                </Typography>

                <div className="flex space-x-4" style={{ gap: "16px" }}>
                  <TextField
                    name="firstname"
                    required
                    fullWidth
                    label="First Name"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    error={!!formErrors.firstname}
                    helperText={formErrors.firstname}
                  />
                  <TextField
                    name="lastname"
                    required
                    fullWidth
                    label="Last Name"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    error={!!formErrors.lastname}
                    helperText={formErrors.lastname}
                  />
                </div>
              </div>

              <div className="mb-0">
                <Typography variant="body1" sx={{ my: 2, fontWeight: "bold" }}>
                  Email :
                </Typography>

                <TextField
                  name="email"
                  required
                  fullWidth
                  label="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </div>

              <div className="mb-0">
                <Typography variant="body1" sx={{ my: 2, fontWeight: "bold" }}>
                  Password :
                </Typography>
                <div className="flex space-x-4" style={{ gap: "16px" }}>
                  <TextField
                    name="password"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                  />
                  <TextField
                    name="confirmPassword"
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                  />
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  color: "#fff",
                  background: isFormValid()
                    ? "linear-gradient(to right, #6a11cb, #2575fc)"
                    : "rgba(128, 128, 128, 0.5)",
                  cursor: isFormValid() ? "pointer" : "not-allowed",
                  transition: "background 0.3s ease",
                }}
                disabled={!isFormValid() || loading}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Sign Up"
                )}
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid>
                  <Link
                    href="/login"
                    variant="body2"
                    sx={{
                      cursor: "pointer",
                      color: "#6a11cb",
                      fontWeight: "bold",
                    }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>

      <Backdrop
        sx={{ color: "efff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="success" />
      </Backdrop>
      {/*  </GoogleOAuthProvider> */}
    </>
  );
}

// <ThemeProvider theme={defaultTheme}>
// <Container maxWidth="xl" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//     <CssBaseline />
//                             {/* Right Section */}
//         <Box sx={{ width: '700px', maxHeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
//             <Paper elevation={6} sx={{ width: '650px', maxHeight: 700, p: 4, borderRadius: 3 }}>

//             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
//                 <LockOutlinedIcon />
//             </Avatar>
//             </Box>

//             <Typography variant="h4" sx={{ mb: 0.5, textAlign: 'center', fontWeight: 'bold' }}>
//                 Sign Up
//             </Typography>

//             <hr /><br />
//                 {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> */}
//                     {/* <GoogleLogin/> */}
//                     {/* <Typography variant="body1" sx={{ my: 2 }}>OR</Typography> */}
//                     <Box component="form" noValidate onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

//                     <div className="flex flex-col  space-y-4  w-full mb-2">

// <div className="mb-0.5">
// <Typography variant="body1" sx={{ my: 2,  fontWeight: 'bold' }}>Name :</Typography>

// <div className="flex space-x-4" style={{ gap: '16px' }}>

//         <TextField
//             name="firstname"
//             required
//             fullWidth
//             label="First Name"
//             value={formData.firstname}
//             onChange={handleInputChange}
//             error={!!formErrors.firstname}
//             helperText={formErrors.firstname}
//         />
//         <TextField
//             name="lastname"
//             required
//             fullWidth
//             label="Last Name"
//             value={formData.lastname}
//             onChange={handleInputChange}
//             error={!!formErrors.lastname}
//             helperText={formErrors.lastname}
//         />

//     </div>
// </div>

//     <div className="mb-0.5">
//     <Typography variant="body1" sx={{ my: 2,  fontWeight: 'bold' }}>Email :</Typography>

//             <TextField
//                 name="email"
//                 required
//                 fullWidth
//                 label="Email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 error={!!formErrors.email}
//                 helperText={formErrors.email}
//             />
//     </div>

//     <div className="mb-0.5">
//     <Typography variant="body1" sx={{ my: 2,  fontWeight: 'bold' }}>Password :</Typography>
//     <div className="flex space-x-4" style={{ gap: '16px' }}>
//             <TextField
//                 name="password"
//                 required
//                 fullWidth
//                 label="Password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 error={!!formErrors.password}
//                 helperText={formErrors.password}
//             />
//             <TextField
//                 name="confirmPassword"
//                 required
//                 fullWidth
//                 label="Confirm Password"
//                 type="password"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 error={!!formErrors.confirmPassword}
//                 helperText={formErrors.confirmPassword}
//             />
//         </div>
//     </div>

// </div>
//     <Button
//         type="submit"
//         fullWidth
//         variant="contained"
//         sx={{
//             mt: 3,
//             mb: 2,
//             color: '#fff',
//             background: isFormValid()
//                 ? 'linear-gradient(to right, #6a11cb, #2575fc)'
//                 : 'rgba(128, 128, 128, 0.5)',
//             cursor: isFormValid() ? 'pointer' : 'not-allowed',
//             transition: 'background 0.3s ease',
//         }}
//         disabled={!isFormValid() || loading}
//     >
//         {loading ? <CircularProgress color="inherit" size={24} /> : "Sign Up"}
//     </Button>

//                         <Grid container justifyContent="flex-end">
//                             <Grid>
//                                 <Link href="/login" variant="body2" sx={{ cursor: 'pointer', color: '#6a11cb', fontWeight: 'bold' }}>
//                                     Already have an account? Sign in
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 {/* </Box> */}
//             </Paper>
//         </Box>

// </Container>
// </ThemeProvider>

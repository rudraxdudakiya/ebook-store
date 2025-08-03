import React, { useState } from 'react';
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
    Avatar,
    Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutline'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signin } from "../../services/auth/Auth";
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack";
import { saveToken, isAdminLoggedIn, isCustomerLoggedIn } from '../../../../util/common';

const defaultTheme = createTheme();

export default function Signin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };
    const validateField = (name, value) => {
        let errors = { ...formErrors };
        switch (name) {
            case "email":
                errors.email = value.trim() === "" ? "Email is required" : !/\S+@\S+\.\S+/.test(value) ? "Invalid email address" : "";
                break;
            case "password":
                errors.password =
                    value.trim() === "" ? "Password is required"
                        : value.length < 6 ? "Password must be at least 6 characters"
                            : !/[A-Z]/.test(value) ? "Password must contain at least one uppercase letter"
                                : !/[0-9]/.test(value) ? "Password must contain at least one number"
                                    : !/[!@#$%^&*(),.?":{}|<>]/.test(value) ? "Password must contain at least one special character"
                                        : "";
                break;
        }
        setFormErrors(errors);
    };
    
    const validateForm = () => {
        return (
            /\S+@\S+\.\S+/.test(formData.email) &&
            formData.password.length >= 6 &&
            /[A-Z]/.test(formData.password) &&
            /[0-9]/.test(formData.password) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) 
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log('Form submitted:', formData);
                
                try{
                    const response = await signin(formData);
                    if(response.status === 200) {
                        const token = response.data.token;
                        saveToken(token);

                        if(isAdminLoggedIn()) navigate("/admin/dashboard");
                        else if(isCustomerLoggedIn()) navigate("/customer/dashboard");

                        console.log(response);
                        enqueueSnackbar('Login Successfully !', {variant: 'success', autoHideDuration: 5000});
                    }
                } catch(error) {
                    console.log(error);
                    enqueueSnackbar('Log In failed Invalid Cradentials!', {variant: 'error', autoHideDuration: 5000});
                } finally {
                    setLoading(false);
                }
                
    };

    return (
        <>
        <ThemeProvider theme={defaultTheme}>
            <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CssBaseline />
                <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: '100%' }}>
                    
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>    
                </Box>
                    <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
                        Sign In
                    </Typography>
                    <hr /><br />
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        
                        
                    <Typography variant="p" sx={{ fontWeight: 'bold' }}>
                        Enter Email :
                    </Typography>
                        <TextField
                            name="email"
                            label="Email"
                            fullWidth
                            value={formData.email}
                            onChange={handleInputChange}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                        />

                        
                    <Typography variant="p" sx={{ fontWeight: 'bold' }}>
                        Enter Password :
                    </Typography>
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={formData.password}
                            onChange={handleInputChange}
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                color: '#fff',
                                background: validateForm()
                                    ? 'linear-gradient(to right, #6a11cb, #2575fc)'
                                    : 'rgba(128, 128, 128, 0.5)', // Gray color when form is invalid
                                cursor: validateForm() ? 'pointer' : 'not-allowed', // Change cursor based on validity
                                transition: 'background 0.3s ease',
                            }}
                            disabled={!validateForm() || loading} // Disable button if form is invalid or loading
                        >
                            {loading ? <CircularProgress color="inherit" size={24} /> : 'Sign In'}
                        </Button>
                        
                        <Grid container justifyContent="flex-end">
                            <Grid>
                                <Link href="/register" variant="body2" sx={{ color: '#6a11cb', fontWeight: 'bold' }}>
                                    Don't have an account? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
        </>
    );
}
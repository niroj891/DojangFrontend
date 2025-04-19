import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Paper, Divider, Alert } from "@mui/material";
import { API_BASE_URL } from "../config/api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/Auth/auth.action";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const LoginPage = () => {
    const [authError, setAuthError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        email: "",
        password: "",
    };

    const handleSubmit = (values, { setSubmitting }) => {
        setAuthError(null);
        dispatch(loginUser({
            data: values,
            navigate,
            onSuccess: () => { },
            onError: (error) => {
                if (error.response && error.response.data) {
                    setAuthError({
                        message: error.response.data.message,
                        isUsernameError: error.response.data.message === "Incorrect username"
                    });
                } else {
                    setAuthError({
                        message: "An error occurred. Please try again.",
                        isUsernameError: false
                    });
                }
            }
        }));
        setSubmitting(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
            {/* Decorative belt elements at top and bottom */}
            <div className="absolute top-0 w-full h-6 bg-black"></div>
            <div className="absolute top-6 w-full h-4 bg-red-600"></div>


            <Paper elevation={5} className="flex w-full max-w-4xl rounded-lg overflow-hidden shadow-xl opacity-95 border-2 border-gray-200">
                {/* Left Side - Image */}
                <div className="hidden md:flex w-1/2 bg-cover bg-center relative">
                    <img
                        src="/image/TaekwondoLogin.png.jpg"
                        alt="Taekwondo"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay with Taekwondo principles */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-6">
                        <Typography variant="h5" className="mb-4 font-bold">Taekwondo Tenets</Typography>
                        <div className="text-center space-y-2">
                            <p className="border-b border-red-500 pb-1">Courtesy</p>
                            <p className="border-b border-red-500 pb-1">Discipline</p>
                            <p className="border-b border-red-500 pb-1">Perseverance</p>
                            <p className="border-b border-red-500 pb-1">Self-Control</p>
                            <p className="border-b border-red-500 pb-1">Dedication</p>
                        </div>
                    </div>
                </div>
                <Divider orientation="vertical" flexItem className="hidden md:block bg-gray-300 w-[1px]" />

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 p-6 sm:p-10 bg-white flex flex-col justify-center relative">
                    {/* Decorative belt corner */}
                    <div className="absolute top-0 right-0 w-20 h-20">
                        <div className="absolute top-0 right-0 w-full h-8 bg-black"></div>
                        <div className="absolute top-8 right-0 w-full h-4 bg-red-600"></div>
                    </div>

                    <Box textAlign="center" mb={4}>
                        <div className="flex justify-center items-center mb-2 rounded-full ">
                            <img
                                src="/image/Taekwondo logo.png"
                                alt="Dojang Logo"
                                className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <Typography variant="h4" component="h1" className="text-red-600 font-bold">
                            DOJANG
                        </Typography>
                        <Typography variant="subtitle1" className="text-gray-600">
                            Welcome to the path of Taekwondo
                        </Typography>
                    </Box>

                    {/* Fixed height error container */}
                    <div className="min-h-[56px]">
                        {authError && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {authError.message}
                            </Alert>
                        )}
                    </div>

                    <Formik
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                {/* Email Field */}
                                <div className="min-h-[80px]">
                                    <Field
                                        as={TextField}
                                        name="email"
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        variant="outlined"
                                        required
                                        className="bg-white rounded-md"
                                        error={authError?.isUsernameError}
                                        helperText={authError?.isUsernameError ? "" : null}
                                        sx={{
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#dc2626',
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#dc2626',
                                            }
                                        }}
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="min-h-[80px]">
                                    <Field
                                        as={TextField}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        variant="outlined"
                                        required
                                        className="bg-white rounded-md"
                                        error={authError && !authError.isUsernameError}
                                        helperText={authError && !authError.isUsernameError ? "" : null}
                                        sx={{
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#dc2626',
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#dc2626',
                                            }
                                        }}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium"
                                    disabled={isSubmitting}
                                    sx={{
                                        backgroundColor: '#dc2626',
                                        '&:hover': {
                                            backgroundColor: '#b91c1c',
                                        },
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                                    }}
                                >
                                    {isSubmitting ? "Logging in..." : "Enter the Dojang"}
                                </Button>
                            </Form>
                        )}
                    </Formik>

                    <Typography variant="body2" className="text-center mt-6 text-gray-600">
                        New to Taekwondo?
                        <Button
                            onClick={() => navigate("/register")}
                            size="small"
                            sx={{
                                color: '#dc2626',
                                '&:hover': {
                                    backgroundColor: 'rgba(220, 38, 38, 0.04)',
                                },
                                fontWeight: '500',
                            }}
                        >
                            Begin Your Journey
                        </Button>
                    </Typography>

                    {/* Decorative belt element at bottom */}
                    <div className="mt-8 border-t border-gray-200 pt-4">
                        <div className="flex justify-center">
                            <div className="w-12 h-3 bg-black rounded-full mb-1"></div>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-12 h-2 bg-red-600 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default LoginPage;
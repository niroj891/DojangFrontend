import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Paper, Divider } from "@mui/material";
import { API_BASE_URL } from "../config/api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
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
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        email: "",
        password: "",
    };

    const handleSubmit = (values, {
        setSubmitting }) => {
        console.log(values);
        dispatch(loginUser({ data: values, navigate }));
        setSubmitting(false);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Paper elevation={3} className="flex w-full max-w-4xl rounded-lg overflow-hidden shadow-lg opacity-90">
                {/* Left Side - Image */}
                <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/image/TaekwondoLogin.png.jpg')" }}>
                    <img
                        src="/image/TaekwondoLogin.png.jpg"
                        alt="Taekwondo"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <Divider orientation="vertical" flexItem className="hidden md:block bg-gray-300 w-[1px]" />
                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 p-6 sm:p-10 bg-white flex flex-col justify-center">
                    <Box textAlign="center" mb={3}>
                        <Typography variant="h4" component="h1" className="text-blue-500 font-bold">
                            Dojang
                        </Typography>
                        <Typography variant="subtitle1" className="text-gray-500">
                            Welcome to the world of Taekwondo
                        </Typography>
                    </Box>

                    {error && <Typography color="error">{error}</Typography>}
                    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema} >

                        <Form className="space-y-4">
                            <Field as={TextField}
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                variant="outlined"
                                required
                                className="bg-white rounded-md"
                            />
                            <Field as={TextField}

                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                variant="outlined"

                                required
                                className="bg-white rounded-md"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className="bg-red-600 hover:bg-lime-700 text-white py-2 px-4 rounded-lg"
                            >
                                Login
                            </Button>
                        </Form>
                    </Formik>


                    <Typography variant="body2" className="text-center mt-4 text-gray-500">
                        Don't have account ?
                        <Button onClick={() => navigate("/register")} size="small">
                            SignUp
                        </Button>
                    </Typography>
                </div>
            </Paper>
        </div>
    );
};

export default LoginPage;

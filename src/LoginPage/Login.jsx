// src/LoginPage.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here (e.g., API call)
        console.log('Logging in:', { email, password });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-taekwondo bg-cover bg-center">
            <Paper
                elevation={3}
                className="p-6 sm:p-10 w-full max-w-md bg-white rounded-lg shadow-md"
            >
                <Box textAlign="center" mb={3}>
                    <Typography variant="h4" component="h1" className="text-red-600 font-bold">
                        Dojang
                    </Typography>
                    <Typography variant="subtitle1" className="text-gray-500">
                        Welcome Back, Martial Artist!
                    </Typography>
                </Box>
                <form onSubmit={handleLogin}>
                    <Box mb={3}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-white"
                        />
                    </Box>
                    <Box mb={3}>
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-white"
                        />
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                    >
                        Login
                    </Button>
                </form>
                <Typography
                    variant="body2"
                    className="text-center mt-4 text-gray-500"
                >
                    Don't have an account?{' '}
                    <a href="/register" className="text-red-600 hover:underline">
                        Sign Up
                    </a>
                </Typography>
            </Paper>
        </div>
    );
};

export default LoginPage;

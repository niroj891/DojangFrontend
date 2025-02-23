import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Divider } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        console.log('Logging in:', { email, password });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Main Container with Left and Right Sections */}
            <Paper elevation={3} className="flex w-full max-w-4xl rounded-lg overflow-hidden shadow-lg opacity-90">
                {/* Left Side - Image */}
                <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
                    <img
                        src="/image/TaekwondoLogin.png.jpg"
                        alt="Taekwondo"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                {/* Vertical Divider */}
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

                    <form onSubmit={handleLogin} className="space-y-4">
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-white rounded-md"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    </form>

                    <Typography variant="body2" className="text-center mt-4 text-gray-500">
                        Don't have an account?{' '}
                        <a href="/register" className="text-red-600 hover:underline">
                            Sign Up
                        </a>
                    </Typography>
                </div>
            </Paper>
        </div>
    );
};

export default LoginPage;


// import React, { useState } from 'react';
// import { TextField, Button, Typography, Box, Paper } from '@mui/material';
// import { loginUserAction } from '../Redux/Auth/auth.action';

// const LoginPage = () => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatch = useDispatch();

//     const handleLogin = (e) => {
//         e.preventDefault();
//         // Handle login logic here (e.g., API call)
//         const response = await axios.post("http//localhost:3000")
//         console.log('Logging in:', { email, password });
//         dispatch(loginUserAction({data:email,password}));
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-taekwondo bg-cover bg-center">
//             <Paper
//                 elevation={3}
//                 className="p-6 sm:p-10 w-full max-w-md bg-white rounded-lg shadow-md"
//             >
//                 <Box textAlign="center" mb={3}>
//                     <Typography variant="h4" component="h1" className="text-red-600 font-bold">
//                         Dojang
//                     </Typography>
//                     <Typography variant="subtitle1" className="text-gray-500">
//                         Welcome Back, Martial Artist!
//                     </Typography>
//                 </Box>
//                 <form onSubmit={handleLogin}>
//                     <Box mb={3}>
//                         <TextField
//                             label="Email"
//                             type="email"
//                             name='email'
//                             fullWidth
//                             variant="outlined"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             className="bg-white rounded-full"
//                         />
//                     </Box>
//                     <Box mb={3}>
//                         <TextField
//                             label="Password"
//                             type="password"
//                             name='password'
//                             fullWidth
//                             variant="outlined"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className="bg-white rounded-full"
//                         />
//                     </Box>
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         className="bg-red-600 hover:bg-lime-700 rounded-xl text-white py-2 px-4 "
//                     >
//                         Login
//                     </Button>
//                 </form>
//                 <Typography
//                     variant="body2"
//                     className="text-center mt-4 text-gray-500"
//                 >
//                     Don't have an account?{' '}
//                     <a href="/register" className="text-red-600 hover:underline">
//                         Sign Up
//                     </a>
//                 </Typography>
//             </Paper>
//         </div>
//     );
// };

// export default LoginPage;

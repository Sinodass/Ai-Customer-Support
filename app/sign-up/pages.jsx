'use client'
import { useState } from 'react';
import { useRouter } from 'next/router'; 
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '../firebase'
import { Container, TextField, Button, Typography, Box, Tabs, Tab, Paper } from '@mui/material';

const LoginSignupForm = () => {
  const [tab, setTab] = useState(0);
  const router = useRouter();

  //Firebase Hooks
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, userCreation, loadingCreation, errorCreation] = useCreateUserWithEmailAndPassword(auth);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (tab === 0) {
      // Simulate sign-in process
      await signInWithEmailAndPassword(email, password);
    } else {
        await createUserWithEmailAndPassword(email, password);
    }
  };

  if (user || userCreation) {
    router.push('../page');
  }

  return (
    <Container 
      component="main" 
      maxWidth="xs" 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#141414', // Dark background
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          borderRadius: 3, // Rounded corners
          backgroundColor: '#2c2c2c', // Slightly lighter dark background
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)', // Shadow for depth
        }}
      >
        <Typography 
          component="h1" 
          variant="h5" 
          sx={{ 
            color: 'white', 
            fontWeight: 'bold', 
            marginBottom: 2 
          }}
        >
          {tab === 0 ? 'Sign In' : 'Sign Up'}
        </Typography>
        <Box sx={{ width: '100%', marginTop: 2 }}>
          <Tabs 
            value={tab} 
            onChange={handleTabChange} 
            aria-label="login/signup tabs" 
            centered
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#e50914', // Red indicator for active tab
              },
              '& .MuiTab-root': {
                color: 'white', // Tab text color
              },
              '& .Mui-selected': {
                color: '#e50914', // Selected tab color
              },
            }}
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
        </Box>
        <Box
          sx={{
            width: '100%',
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {tab === 0 ? (
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
                sx={{
                  backgroundColor: '#333333',
                  color: 'white',
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555555',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#888888',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#aaaaaa',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#e50914',
                  },
                }}
              />
              <TextField
                name='password'
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                sx={{
                  backgroundColor: '#333333',
                  color: 'white',
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555555',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#888888',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#aaaaaa',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#e50914',
                  },
                }}
              />
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ 
                  mt: 2,
                  backgroundColor: '#e50914',
                  borderRadius: '20px',
                  '&:hover': {
                    backgroundColor: '#b0070e',
                  },
                }}
              >
                Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
                sx={{
                  backgroundColor: '#333333',
                  color: 'white',
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555555',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#888888',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#aaaaaa',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#e50914',
                  },
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="new-password"
                sx={{
                  backgroundColor: '#333333',
                  color: 'white',
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555555',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#888888',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#aaaaaa',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#e50914',
                  },
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                sx={{
                  backgroundColor: '#333333',
                  color: 'white',
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555555',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#888888',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#aaaaaa',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#e50914',
                  },
                }}
              />
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ 
                  mt: 2,
                  backgroundColor: '#e50914',
                  borderRadius: '20px',
                  '&:hover': {
                    backgroundColor: '#b0070e',
                  },
                }}
              >
                Sign Up
              </Button>
            </form>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginSignupForm;


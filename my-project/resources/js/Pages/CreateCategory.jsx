import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import { Link, useNavigate, useOutletContext } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';
import axios from 'axios';

const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function CreateCategory() {
//   const context = useOutletContext()

  // Manage state  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
//   const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      // Hit server login end point
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, { email, password });

      if (response.status === 200) {
        console.log("Login successful");
       !context.user && context.loginUser(response.data.id, response.data.userName, response.data.role);
        navigate('/')
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: {xs: 0, sm: 1, md: 8, lg: 8},
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AddCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add A Category
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Category Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="category"
              label="category"
              type="text"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                {/* <Typography variant="body2">
                  <Link to="/Register">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Typography> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer sx={{mt: {xs: 10, sm: 10, md: '27vh', lg: '27vh'}}} />
      </Container>
    </ThemeProvider>
  );
}

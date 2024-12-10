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
import { Select, MenuItem, FormHelperText } from '@mui/material';
import Footer from '../components/Footer';
import axios from 'axios';

const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function CreateItem() {
//   const context = useOutletContext()

  // Manage state 
  const [category, setCategory] = useState(""); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sku, setSku] = useState("");
  const [picture, setPicture] = useState("");
//   const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      // Hit server login end point
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, { email, password });

      if (response.status === 200) {
        console.log("Login successful");
       !context.user && context.loginUser(response.data.id, response.data.usertitle, response.data.role);
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
            Add a New Item
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormHelperText sx={{ fontSize: '1rem' }}>Category</FormHelperText>
          <Select
                    labelId="category"
                    id="demo-simple-select"
                    value={category}
                    label="Role"
                    required
                    onChange={(e) => setCategory(e.target.value)}
                    sx={{ width: '100%' }}
                >
                    <MenuItem value={"t-shirt"}>T-Shirts</MenuItem>
                    <MenuItem value={"pant"}>Pants</MenuItem>
                    <MenuItem value={"jacket"}>Jacket</MenuItem>
                </Select>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="description title"
              title="title"
              autoComplete="title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              title="description"
              label="description"
              type="text"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              title="price"
              label="price"
              type="text"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              title="quantity"
              label="quantity"
              type="text"
              id="quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              title="sku"
              label="sku"
              type="text"
              id="sku"
              onChange={(e) => setSku(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              title="picture"
              label="picture"
              type="text"
              id="picture"
              onChange={(e) => setPicture(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Item
            </Button>      
          </Box>
        </Box>
        <Footer sx={{mt: {xs: 10, sm: 10, md: '27vh', lg: '27vh'}}} />
      </Container>
    </ThemeProvider>
  );
}

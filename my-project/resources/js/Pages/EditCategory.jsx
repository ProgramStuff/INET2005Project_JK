import React, { useState, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import { usePage } from '@inertiajs/react';

const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function EditCategory() {
    const {categoryId} = usePage().props;
  // Manage state  
  const [name, setName] = useState("");
  const [catError, setCatError] = useState("");

  const [category, setCategory] = useState([{"" : ""}]);
    const [catId, setCatId] = useState(0);

  async function loadCategoryData() {
    try {
      const response = await axios.get(`/categories/edit/${categoryId}`, { catId });
      
      if (response.status === 200) {
        setCategory(response.data)
        setCatId(response.data.id);
        setName(response.data.name)
      }
    } catch (error) {
      if (error.status === 422){
        setCatError(`${name} category already exists`);
      }
      console.error("Add category failed:", error);
    }
  }
  

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(`/categories/updateCategory/${catId}`, { name });
      
      if (response.status === 200) {
        window.location='/categories';
      }
    } catch (error) {
      if (error.status === 422){
        setCatError(`${name} category already exists`);
      }
      console.error("Add category failed:", error);
    }
  }

  useEffect(() => {
    loadCategoryData();
  }, [])

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
            Edit Category
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"

              name="name"
              value={name}
              autoComplete="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
        
            

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Create
            </Button>
            {catError && <p style={{ color: 'red', marginTop: '1rem' }}>{catError}</p>}
            {console.log(category)}
          </Box>
        </Box>
        <Footer sx={{mt: {xs: 10, sm: 10, md: '27vh', lg: '27vh'}}} />
      </Container>
    </ThemeProvider>
  );
}

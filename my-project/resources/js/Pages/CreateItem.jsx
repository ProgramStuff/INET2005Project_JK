import React, { useState, useEffect, useRef } from 'react';
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
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import DrawerAppBar from '../components/DrawerAppBar';




const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



export default function CreateItem() {

  // Manage state 
  const [category, setCategory] = useState(""); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sku, setSku] = useState("");
  const [picture, setPicture] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [itemError, setItemError] = useState([]);
  const [categoriesData, setCategoriesData] = useState([{"" : ""}]);

  const [selectedFile, setSelectedFile] = useState("");

  function handleFileUpload(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPicture(event.target.files.name);
  };




async function handleSubmit(event) {

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('quantity', quantity);
  formData.append('sku', sku);
  formData.append('picture', selectedFile);
  formData.append('categoryId', categoryId);

  event.preventDefault();
  try {
    const response = await axios.post(`/items/createItem`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      });
    
    if (response.status === 200) {
      window.location='/items';
    }
  } catch (error) {
    if (error.status === 422){
      setItemError(`All fields required`);
      setPicture("");
      setSelectedFile(null);
      if (toast.current) {
        toast.current.clear();
      }    }
    console.error("Add category failed:", error);
  }
}

async function loadCategories() {
  try {
    const response = await axios.get(`/categories/allCategories`);
    if (response.status === 200) {
      setCategoriesData(response.data);
      console.log(response.data);
    }
  } catch (error) {
    console.error("Fetch categories failed:", error);
  }
}

useEffect(() => {
  loadCategories();
}, [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <DrawerAppBar/>
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
                    onChange={(e) => {
                      setCategoryId(categoriesData.find(cat => cat.name == e.target.value).id);
                      setCategory(e.target.value)}}

                    sx={{ width: '100%' }}
                >
                            {categoriesData == "" ? null : 
                            categoriesData.map((cat, index) =>{
                              return(
                                <MenuItem value={cat.name}>{cat.name}</MenuItem>
                              )

                            })
                          }
                </Select>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Item title"
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

            <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    multiple
                  />
                </Button>  

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Item
            </Button>     
  

            {itemError && <p style={{ color: 'red', marginTop: '1rem' }}>{itemError}</p>}
 
          </Box>
        </Box>
        <Footer sx={{mt: {xs: 10, sm: 10, md: '27vh', lg: '27vh'}}} />
      </Container>
    </ThemeProvider>
  );
}

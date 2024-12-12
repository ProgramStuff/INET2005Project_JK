import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Link } from '@inertiajs/react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FormControlLabel, FormControl, RadioGroup, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Radio } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import DrawerAppBar from '../components/DrawerAppBar';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';




const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Categories() {

  // Manage state  
    const [categoriesData, setCategoriesData] = useState([{"" : ""}]);
  

  async function loadCategories() {
    try {
      const response = await axios.get(`categories/allCategories`);
      if (response.status === 200) {
        setCategoriesData(response.data);
        console.log(response.data[0]);
        console.log(categoriesData)
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
            <FormatListBulletedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            All Categories
          </Typography>

            {categoriesData == "" ? null : 
              <FormControl sx={{ width: '100%', mt: { xs: 3, sm: 4, md: 5 } }}>
                <RadioGroup sx={{ padding: 0, margin: 0, width: '100%' }}>
                  <TableContainer sx={{
                    width: '100%',
                    overflowX: 'auto',
                    '& .MuiTable-root': {
                      minWidth: { xs: '600px', md: '100%' }
                    }
                  }} component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead sx={{ backgroundColor: 'black' }}>
                        <TableRow>
                          <TableCell>Category Name</TableCell>
                          <TableCell align="right">Edit</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        {/* Map though role and display them in a table with user names to confirm */}
                         {categoriesData.map((cat, index) => { 
                          {console.log(cat.id)}
                             return(
                            <TableRow
                            key={cat.id}
                          >
                            <TableCell component="th" scope="row">
                              {cat.name}
                            </TableCell>

                            <>              
                            <TableCell align="right">
                                {/* Button will redirect to category to edit */}
                              <Link href={`/categories/${cat.id}/edit`}>
                                <Button>Edit</Button>
                              </Link>
                            </TableCell>
                            </>
            
                          </TableRow>
                          )
                        })} 
                      </TableBody>
                    </Table>
                  </TableContainer>
                </RadioGroup>
              </FormControl>
            } 
            <Link href='/categories/create'>
                        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '30vh'}}
            >
              Create Category
            </Button>
            </Link>
          </Box>
        <Footer sx={{mt: {xs: 10, sm: 10, md: '27vh', lg: '27vh'}}} />
      </Container>
    </ThemeProvider>
  );
}

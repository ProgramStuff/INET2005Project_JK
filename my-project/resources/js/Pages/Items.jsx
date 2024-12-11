import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import { Link, useNavigate, useOutletContext } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FormControlLabel, FormControl, RadioGroup, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Radio } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';
import Paper from '@mui/material/Paper';
import axios, { all } from 'axios';

const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Items() {

  const [itemData, setItemData] = useState([{"" : ""}]);
    

    // allItems.map((cat) => {
    //     let newCat = {id: cat.id, title: cat.title}
    //     setCategories(prevCats => {
    //       return [...prevCats, newCat];
    //     });
    //   });

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     // Hit server login end point
  //     const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, { email, password });

  //     if (response.status === 200) {
  //       console.log("Login successful");
  //      !context.user && context.loginUser(response.data.id, response.data.userName, response.data.role);
  //       navigate('/')
  //     } else {
  //       console.log("Unexpected response:", response);
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  // }

  // async function handleClick(event) {
  //   // Send confirmed role to update endpoint
  //   event.preventDefault();
  //   const userid = userRole.userid
  //   const role = userRole.role
  //   try {
  //     // Hit role insert end point
  //     const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/role/update`, {userid: userid, role: role});
  //     if (response.status === 200) {
  //       console.log("Request successful");
  //     } else {
  //       console.log("Unexpected response:", response);
  //     }
  //   } catch (error) {
  //     console.error("Request failed:", error);
  //   }

  // }

  async function loadItems() {
    try {
      const response = await axios.get(`/items/allItems`);
      if (response.status === 200) {
        setItemData(response.data);
        console.log(response.data);
        console.log(itemData)
      }
    } catch (error) {
      console.error("Fetch categories failed:", error);
    }
  }

  useEffect(() => {
    loadItems();
  }, [])


  
  // function handleChange(event) {
  //   const [userid, role] = event.target.value.split(':'); // Split value into userid and role
  //   setUserRole(prevState => ({
  //     ...prevState,
  //     userid: userid, // Update userid
  //     role: role      // Update role
  //   }));
  // }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" sx={{maxWidth: {md: '62rem'}}}>
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
            All Items
          </Typography>
              <FormControl sx={{ width: '100%', mt: { xs: 3, sm: 4, md: 10 } }}>
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
                          <TableCell>Name</TableCell>
                          <TableCell align="left">ID</TableCell>
                          <TableCell align="left">Category</TableCell>
                          <TableCell align="left">Description</TableCell>
                          <TableCell align="left">Quantity</TableCell>
                          <TableCell align="left">SKU</TableCell>
                          <TableCell align="left">Price</TableCell>
                          <TableCell align="left">Image</TableCell>
                          <TableCell align="left">Edit</TableCell>
                          <TableCell align="left">Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        {/* Map though items and display them in a table with user names to confirm */}
                        {itemData == "" ? null : 

                         itemData.map((item, index) => { 
                             return(
                            <TableRow
                            key={item.id}
                          >
                            <TableCell component="th" scope="row">
                              {item.title}
                            </TableCell>

                            <TableCell align="left">
                                {/* Set the radio button selected as default */}
                            <FormControlLabel value={`${item.id}:${item.title}`} control={<Radio sx={{display: 'none'}} />} label={item.title}/>
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {item.categoryId}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {item.description}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {item.quantity}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {item.sku}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {item.price}
                            </TableCell>

                            
                            <TableCell component="th" scope="row">
                              <img sx={{width: '2vh'}} src={item.picture}/>
                            </TableCell>

                            <TableCell align="left">
                                {/* Button will redirect to that category to edit */}
                            <Button value={item.id} onClick={(e) => console.log(e.currentTarget.value)}>Edit</Button>
                            </TableCell>

                            <>              
                            <TableCell align="left">
                                {/* Button will redirect to that category to edit */}
                            <Button value={item.id} onClick={(e) => console.log(e.currentTarget.value)}>Delete</Button>
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
          </Box>
        <Footer sx={{mt: {xs: 10, sm: 10, md: '27vh', lg: '22vh'}}} />
      </Container>
    </ThemeProvider>
  );
}

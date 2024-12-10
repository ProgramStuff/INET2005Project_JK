import React, { useState } from 'react';
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
import axios from 'axios';

const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Items() {

  // Manage state  
    const [items, setItems] = useState([]);
    const allItems = [
        { id: 1, category: "t-shirt", title: "Item One", description: "A brown shirt", price: 12.50, quantity: 100, sku: 123456789, picture: "https://breadandboxersusa.com/pub_images/original/634earth-brown-91.jpg?extend=copy&width=800&method=fit&height=1200&type=webp"},
        { id: 2, category: "pant", title: "Item Two", description: "Blue Jeans", price: 24.00, quantity: 100, sku: 234567890, picture: "https://assets.burberry.com/is/image/Burberryltd/3F145B02-FE8C-4A7F-873A-67EAF16E3628?$BBY_V3_SL_1$&wid=1250&hei=1250"}
    ];
    

    // allItems.map((cat) => {
    //     let newCat = {id: cat.id, title: cat.title}
    //     setCategories(prevCats => {
    //       return [...prevCats, newCat];
    //     });
    //   });

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

  async function handleClick(event) {
    // Send confirmed role to update endpoint
    event.preventDefault();
    const userid = userRole.userid
    const role = userRole.role
    try {
      // Hit role insert end point
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/role/update`, {userid: userid, role: role});
      if (response.status === 200) {
        console.log("Request successful");
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }

  }


  
  function handleChange(event) {
    const [userid, role] = event.target.value.split(':'); // Split value into userid and role
    setUserRole(prevState => ({
      ...prevState,
      userid: userid, // Update userid
      role: role      // Update role
    }));
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" sx={{maxWidth: {md: '58rem'}}}>
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
            {/* {allItems == "" ? null :  */}
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
                        {/* Map though role and display them in a table with user names to confirm */}
                         {allItems.map((item, index) => { 
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
                              {item.category}
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
            {/* } */}
          </Box>
        <Footer sx={{mt: {xs: 10, sm: 10, md: '27vh', lg: '27vh'}}} />
      </Container>
    </ThemeProvider>
  );
}

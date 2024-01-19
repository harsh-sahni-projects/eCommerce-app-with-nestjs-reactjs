import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { userActions } from "../store/user-slice";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../assets/constants";

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Header from "./Header";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box } from "@mui/system";
import { Card, CardContent } from "@mui/material";


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user.user);


  const addItemToCart = (e) => {
    const bookDetails = JSON.parse(e.target.dataset.bookDetails)
    dispatch(cartActions.addItem(bookDetails))
  }

  const removeItem = (e) => {
    const bookDetails = JSON.parse(e.target.dataset.bookDetails)
    dispatch(cartActions.removeItem(bookDetails))
  }

  const placeOrder = async () => {
    try {
      const endpoint = SERVER_URL + '/users/place-order';
      const res = await axios.post(endpoint, {
        items: cart.items,
        amount: cart.amount,
        timestamp: new Date()
      })
      console.log(res.data);
      alert(res.data.status);
    } catch (err) {
      console.log(err)
      let status = err?.response?.status;
      let errMsg = err?.response?.data?.message ?? err.message;
      alert(errMsg);

      if (status && status == 401) {
        dispatch(userActions.setUser(null));
        navigate('/login');
      }
    }
  }

  return (
    <>
      <Header/>
      <Container>
        <Typography variant="h3" color="initial" sx={{my:2}} >Cart</Typography>
        <Button size="small" variant="text" sx={{mb:2}} onClick={e => navigate('/')}>
          <KeyboardBackspaceIcon sx={{ mr:1}} />
          Back to store
        </Button>
        {(cart.items.length == 0) && <Typography variant="body1">No items</Typography>}

        {(cart.items.length > 0) && 
        <Box>
          {cart.items.map((book,i) => (
            <Card key={i} sx={{ mb:2 }} elevation={2} >
              <CardContent>
                <Grid container spacing={1} sx={{'mtt': '1rem'}}>
                  <Grid item xs={3}>
                    <Typography variant="h6">{book.title}</Typography>
                    <Typography sx={{ mbb: 1.5 }} variant="body2" color="text.secondary" gutterBottom>
                        {book.author}
                      </Typography>
                  </Grid>
                  <Grid item xs={3}>Rs. {book.unitPrice} / book</Grid>
                  <Grid item xs={3}>
                    <ButtonGroup variant="outlined" >
                      <Button data-book-details={JSON.stringify(book)} onClick={removeItem}><RemoveIcon  sx={{ pointerEvents: 'none' }}/></Button>
                      <Box sx={{'px': '20px',
                                'border': '1px solid rgba(25, 118, 210, 0.5)',
                                'display': 'flex',
                                'alignItems': 'center',
                                'color':'#444'}}>
                        {book.quantity}
                      </Box>
                      <Button  data-book-details={JSON.stringify(book)} onClick={addItemToCart}><AddIcon  style={{ pointerEvents: 'none' }}/></Button>
                      
                    </ButtonGroup>
                  </Grid>
                  <Grid item xs={3}>Rs. {book.quantity * book.unitPrice}</Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Grid container spacing={1} sx={{my: 2, px: 2}}>
            <Grid item xs={9}><Typography variant="h6" sx={{fontWeight: 'bold'}}>Total</Typography></Grid>
            <Grid item xs={3}><Typography variant="h6" sx={{fontWeight: 'bold'}}>Rs. {cart.amount}</Typography></Grid>
          </Grid>

          {user && <Button onClick={placeOrder}>Place order</Button>}

          {!user &&
          <Box sx={{'mt': '1rem'}}>
            Please <Button onClick={e => navigate('/login')}>login</Button> to place order
          </Box>}
        </Box>}
      </Container>
    </>
  )
}

export default Cart;
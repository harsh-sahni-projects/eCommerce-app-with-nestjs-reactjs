import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid'

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import { Box } from "@mui/system";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { cartActions } from "../store/cart-slice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { SERVER_URL } from "../assets/constants";



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
      // const res = 
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  return (
    <>
      <Header/>
      <Container>
        <Typography variant="h3" color="initial">Your cart</Typography>
        {cart.items.map((book,i) => (
          <Grid container spacing={1} key={i} sx={{'mt': '1rem'}}>
            <Grid item xs={4}>{book.title}</Grid>
            <Grid item xs={2}>Rs. {book.unitPrice} / book</Grid>
            <Grid item xs={4}>
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
            <Grid item xs={2}>Rs. {book.quantity * book.unitPrice}</Grid>
          </Grid>
        ))}

        <Grid container spacing={1}
          sx={{'display': 'flex',
              'justifyContent': 'flex-end',
              'mt': '1rem'}}>
          <Grid item xs={4}>Total</Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={2}>Rs. {cart.amount}</Grid>
        </Grid>

        {user && <Button onClick={placeOrder}>Place order</Button>}

        {!user &&
        <Box sx={{'mt': '1rem'}}>
          Please <Button onClick={e => navigate('/login')}>login</Button> to proceed further
        </Box>}
      </Container>
    </>
  )
}

export default Cart;
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SERVER_URL } from '../assets/constants';
import { cartActions } from '../store/cart-slice';
import { Container } from '@mui/system';
import Header from './Header';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


const BookStore = () => {
  
  const dispatch = useDispatch();
  const [allBooks, setAllBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.user.user);
  
  const addItemToCart = (e) => {
    const bookDetails = JSON.parse(e.target.dataset.bookDetails)
    dispatch(cartActions.addItem(bookDetails))
  }

  useEffect(() => {
    // Fetch Books
    async function getAllBooks() {
      try {
        const endpoint = SERVER_URL + '/books';
        const res = await axios.get(endpoint);
        setAllBooks([...res.data]);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    setIsLoading(true);
    getAllBooks();

    console.log('The above error "A non-serializable value was detected..." can be handled. It is not handled currently due to lack of time.')
  }, []);
  return (
    <>
      <Header/>
      <Container sx={{my:6}}>
        {!isLoading  && user && 
          <Typography variant="h6" sx={{my:2}}>Hi {user.userDetails.username}, Happy Shopping</Typography>
        }
        {!isLoading  && !user && 
          <Typography variant="h6" sx={{my:2}}>Shop for your favourite books here</Typography>
        }
        {!isLoading && 
          <Grid container spacing={4}>
            {allBooks.map(book => (
              <Grid item xs={12} md={6} lg={3} sx={{}} key={book._id}>
                <Card sx={{ minWidth: 275 }} elevation={2} square>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {book.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                      {book.author}
                    </Typography>
                    <Typography variant="body2">
                      Rs {book.unitPrice}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" data-book-details={JSON.stringify(book)} onClick={addItemToCart}>Add to cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        }

        {!isLoading && !allBooks.length && 
          <div>Database has no books, please add some books details in db.</div>
        }

        {isLoading && 
          <div>Loading...</div>
        }
      </Container>
    </>
  )
}

export default BookStore;
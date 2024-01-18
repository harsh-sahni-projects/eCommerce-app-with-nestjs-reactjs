import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { IoIosLogOut } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import profileIcon from '/profile-icon.png';

import { SERVER_URL } from '../assets/constants';
import { userActions } from '../store/user-slice';
import { useRef } from 'react';

import Header from './Header';
import { cartActions } from '../store/cart-slice';
import Cart from './Cart';
import { Container } from '@mui/system';

const BookStore = () => {
  
  const dispatch = useDispatch();
  const [allBooks, setAllBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const addItemToCart = (e) => {
    const bookDetails = JSON.parse(e.target.dataset.bookDetails)
    dispatch(cartActions.addItem(bookDetails))
  }

  const removeItem = (e) => {
    const bookDetails = JSON.parse(e.target.dataset.bookDetails)
    dispatch(cartActions.removeItem(bookDetails))
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
    // const checkToken = async () => {
    //   try {
    //     if (!userDetails) return navigate('/');
    
    //     const endpoint = SERVER_URL + '/check-token'; 
    //     await axios.post(endpoint);
    //   } catch (err) {
    //     console.log('Dashboard checktoken err:', err);
    //     if (err?.response?.data) {
    //       alert(err.response.data);
    //       dispatch(userActions.setUser(null));
    //       dispatch(userActions.setActiveFriend(null));
    //       dispatch(authActions.logout());
    //       navigate('/');
    //     } else {
    //       alert(err.message);
    //     }
    //   }
    // }
    // checkToken();
  }, []);
  return (
    <>
      <Header/>
      <Container>
        {!isLoading && allBooks.map(book => (
          <div key={book._id}>
            <div>{book.title} / {book.author} / {book.unitPrice}</div>
            <button data-book-details={JSON.stringify(book)} onClick={addItemToCart}>Add</button>
            <button data-book-details={JSON.stringify(book)} onClick={removeItem}>Remove</button>
          </div>
        ))}
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
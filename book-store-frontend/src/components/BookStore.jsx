import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { IoIosLogOut } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import profileIcon from '/profile-icon.png';

import { SERVER_URL } from '../assets/constants';
import { authActions } from '../store/auth-slice';
import { userActions } from '../store/user-slice';
import { useRef } from 'react';

import Header from './Header';
import { cartActions } from '../store/cart-slice';
import Cart from './Cart';
import { Container } from '@mui/system';

const BookStore = () => {
  
  const dispatch = useDispatch();
  const [allBooks, setAllBooks] = useState([]);
  
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
      } catch (err) {
        console.log(err);
      }
    }
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
        {allBooks.length && allBooks.map(book => (
          <div key={book.id}>
            <div>{book.id} {book.name} {book.price}</div>
            <button data-book-details={JSON.stringify(book)} onClick={addItemToCart}>Add</button>
            <button data-book-details={JSON.stringify(book)} onClick={removeItem}>Remove</button>
          </div>
        ))}
        {!allBooks.length && 
          <div>Loading...</div>
        }
      </Container>
    </>
  )
}

export default BookStore;
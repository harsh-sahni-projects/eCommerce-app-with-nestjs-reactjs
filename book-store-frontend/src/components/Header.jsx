import { useSelector, useDispatch } from "react-redux";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

import { SERVER_URL } from '../assets/constants';
import axios from 'axios';
import { userActions } from "../store/user-slice";

axios.defaults.withCredentials = true;

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.cart.totalItems);
  const user = useSelector(state => state.user.user);
  const logout = async () => {
    try {
      const endpoint = SERVER_URL + '/users/logout';
      const res = await axios.get(endpoint);
      if (res.status == 200) {
        dispatch(userActions.setUser(null));
        navigate('/');
      }
    } catch (err) {
      const errMsg = err?.response?.data?.message ?? err.message;
      console.log(err);
      alert(errMsg);
      if (err?.response?.status == 401) 
        navigate('/');
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={e => navigate('/')}>
            Book store
          </Typography>
          <Button color="inherit" onClick={e => navigate('/cart')}>My Cart ({totalItems})</Button>
          {!user && <Button color="inherit" onClick={e => navigate('/login')}>Login</Button>}
          {user && (
            <>
            <Button color="inherit" onClick={e => navigate('/orders')}>My orders</Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          )
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SERVER_URL } from '../assets/constants';
import { userActions } from '../store/user-slice';
import { Box, Grid, Paper, TextField, Typography,Button } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';

const LoginForm = (props) => {
  const { setSignupFormVisible } = props;
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameInput = useRef(null);
  const loginButton = useRef(null);

  useEffect(() => {
    if (usernameInput.current)
      usernameInput.current.focus();
  },[])

  const handleLogin = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      const creds = { username, password };
      const endpoint = SERVER_URL + '/users/login';
      const res = await axios.post(endpoint, creds);
      const userDetails = res.data;
      dispatch(userActions.setUser(userDetails));
      navigate('/')
    } catch(err) {
      const errMsg = err?.response?.data?.message ? err.response.data.message : err.message;
      console.log(err);
      alert(errMsg);
    } finally {
      setIsLoading(false);
    }
  }

  const showSignupForm = () => {
    setSignupFormVisible(true);
  }
 
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="off"
            autoFocus
            ref={usernameInput}
            id="username" value={username}
            onChange={e => setUsername(e.target.value.trim())}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading} ref={loginButton}
            onClick={handleLogin}
          >
            {!isLoading && <span>Login</span>} {isLoading && <CachedIcon />}
          </Button>
          <Grid container>
            <Grid item>
              <Typography vairant="body2">
                Don't have an account?
                <Button variant="text" onClick={showSignupForm}>
                  Sign Up
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  )
}

export default LoginForm;
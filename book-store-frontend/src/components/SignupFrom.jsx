import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from '../assets/constants';
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { Box, Grid, Paper, TextField, Typography, Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const SignupForm = (props) => {
  const { setSignupFormVisible } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      
      const payload = {
        username,
        password,
        confirmPassword
      }
      const endpoint = SERVER_URL + '/users/create';
      const res = await axios.post(endpoint, payload);
      const userDetails = res.data;
      dispatch(userActions.setUser(userDetails));
      navigate('/');
    } catch (err) {
      const errMsg = (err?.response?.data) ? err.response.data.message : err.message;
      console.log(err);
      console.log(errMsg)
      alert(errMsg);
    }
  }

  const hideSignupForm = () => {
    setSignupFormVisible(false);
  }
  return (
    <>
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
                id="username"
                value={username}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSignup}
              >
                Create Account
              </Button>
              <Grid container>
                <Grid item>
                  <Button size="small" variant="text" sx={{mb:2}} onClick={hideSignupForm}>
                    <KeyboardBackspaceIcon sx={{ mr:1}} />
                    Back to login
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
  </>
  )
}

export default SignupForm;
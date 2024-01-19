import { useState, useEffect } from 'react';
import LoginForm from './LoginFrom';
import SignupForm from './SignupFrom';
import { Grid } from '@mui/material';

const Login = () => {
  const [signupFormVisible, setSignupFormVisible] = useState(false);

  useEffect(() => {
    console.log('The above error "A non-serializable value was detected..." can be handled. It is not handled currently due to lack of time.')
  },[])
  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {signupFormVisible
          ? <SignupForm setSignupFormVisible={setSignupFormVisible}/>
          : <LoginForm setSignupFormVisible={setSignupFormVisible}/>
        }
      </Grid>
    </>
  )
}

export default Login;
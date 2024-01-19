import { Typography, Button } from '@mui/material';
import Container from '@mui/material/Container';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header/>
      <Container>
      <Typography variant="h3" color="initial" sx={{my:2}} >Orders</Typography>
      <Button size="small" variant="text" sx={{mb:2}} onClick={e => navigate('/')}>
          <KeyboardBackspaceIcon sx={{ mr:1}} />
          Back to store
        </Button>
        <Typography variant="body1" sx={{mb:2}}>All orders will be displayed here.</Typography>
        <Typography variant="body2">(Right now, this feature is not implemented due to lack of time)</Typography>
      </Container>
    </>
  )
}

export default Orders;
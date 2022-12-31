import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './style.scss'
export default function Spinner() {
  return (
    <Box sx={{ display: 'flex' }} className="spinner-wrapper">
      <CircularProgress />
    </Box>
  );
}
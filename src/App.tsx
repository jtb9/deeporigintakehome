import './App.css';
import TaskCreator from 'Components/TaskCreator';
import { Stack, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { themeOptions } from 'Utils/Theme';
import TaskDisplay from 'Components/TaskDisplay';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={themeOptions}>
        <Stack className='appWrapper' sx={{ marginTop: '10px' }} direction={"column"}>
          <TaskCreator />
          <TaskDisplay />
        </Stack>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;

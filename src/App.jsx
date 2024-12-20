import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import OrdenesApp from './components/OrdenesApp';

// Crear tema con los colores de San Isidro
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Verde San Isidro
    },
    secondary: {
      main: '#1b5e20',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OrdenesApp />
    </ThemeProvider>
  );
}

export default App;
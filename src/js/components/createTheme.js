import { createTheme as materialTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

export default function createTheme () {
  return materialTheme({
    palette: {
      primary: {
        // main: '#4682B4',
        main: '#1f77b4'
      },
      secondary: {
        main: green[500],
      },
    },
    typography: {
      body2: {
        fontSize: '12px'
      }
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: '24px',
        },
        label: {
          fontWeight: '900',
          letterSpacing: '-.5px',
          position: 'relative',
          top: '1px'
        }
      }
    }
  })
}
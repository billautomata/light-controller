import { createTheme as materialTheme } from '@material-ui/core/styles';
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
      body1: {
        fontSize: '14px'
      },
      body2: {
        fontSize: '12px'
      },
      h4: {
        fontWeight: 300
      },
      h6: {
        fontWeight: 300
      }
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: '1px',
          boxShadow: 'none'
        },
        label: {
          fontWeight: '700',
          position: 'relative',
          top: '.5px'
        }
      }
    },
    props: {
      MuiButtonBase: {
        disableRipple: true,
        
      },
      MuiButton: {
        disableElevation: true
      }
    }
  })
}
import { ThemeProvider } from '@material-ui/core'
import { setStep, setPatterns } from '../actions/index'
import { connect } from "react-redux"
import CurrentPattern from './CurrentPattern/CurrentPatternBase'
import { Grid, Paper } from '@material-ui/core'
import LoadPatterns from './LoadPatterns'
import SongMode from './SongMode/SongModeBase'
import createTheme from './createTheme.js'

import { io } from "socket.io-client"

const mapStateToProps = (state, ownProps) => {
  return {
    dataLoaded: state.dataLoaded
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPatterns: payload => dispatch(setPatterns(payload)),
    setStep: payload => dispatch(setStep(payload)),    
  }
}

const sectionStyle = { marginBottom: 24, paddingTop: 8, paddingBottom: 24 }

const ConnectedApp = function ({ dataLoaded, setPatterns, setStep }) {

  if(window.socket === undefined) {
    window.socket = io.connect("/")
    window.socket.on('connect', () => {
      console.log('connect')
    })
    window.socket.onAny((event, name, payload)=>{      
      switch(name) {
        case 'patterns': 
        console.log(event, name, payload)
          return setPatterns({ value: payload.value })
        case 'step':
          return setStep({ value: payload.step })
        default: 
          return {};
      }
    })
    console.log(window.socket)
  }

  return (
    <ThemeProvider theme={createTheme()}>
      <div style={{margin: 10}}>
        {
          dataLoaded ? 
          <Grid container justifyContent='center'>
            <Grid container item xs={12}>        
              <Paper square outlined elevation={2} style={sectionStyle}>              
                <CurrentPattern/>    
              </Paper>              
              <Paper square outlined elevation={2} style={sectionStyle}>              
                <SongMode/>
              </Paper>                
              <Paper square outlined elevation={2} style={sectionStyle}>              
                <LoadPatterns/>
                </Paper>
            </Grid>
          </Grid>
          : null
        }      
      </div>
    </ThemeProvider>
  )
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp)

export default App
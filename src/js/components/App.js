import { ThemeProvider } from '@material-ui/core'
import { initializeData, setConfig, setStep, setSongs, setPatterns } from '../actions/index'
import { connect } from "react-redux"
import CurrentPattern from './CurrentPattern/CurrentPatternBase'
import { Grid, Paper } from '@material-ui/core'
import LoadPatterns from './LoadPatterns'
import SongMode from './SongMode/SongModeBase'
import PlaylistMode from './PlaylistMode/PlaylistModeBase'
import createTheme from './createTheme.js'
import LayoutBase from './Layout/LayoutBase'

import { io } from "socket.io-client"

const mapStateToProps = (state, ownProps) => {
  return {
    dataLoaded: state.dataLoaded
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initializeData: payload => dispatch(initializeData(payload)),
    setConfig: payload => dispatch(setConfig(payload)),
    setPatterns: payload => dispatch(setPatterns(payload)),
    setSongs: payload => dispatch(setSongs(payload)),
    setStep: payload => dispatch(setStep(payload))
  }
}

const sectionStyle = { 
  marginBottom: 4, 
  paddingTop: 8, 
  paddingBottom: 12, 
  borderBottom: '1px solid #EEE' 
}

const ConnectedApp = function ({ dataLoaded, initializeData, setPatterns, setConfig, setSongs, setStep }) {

  if(window.socket === undefined) {
    window.socket = io.connect("/")
    window.socket.on('connect', () => {
      console.log('connect')
    })
    window.socket.onAny((name, value)=>{      
      // console.log('event:', name, 'value:', value)
      switch(name) {
        case 'config':
          return setConfig({ value })
        case 'set-step':
          return setStep({ value: value})
        case 'patterns':
          return setPatterns({ value })
        case 'songs':
          return setSongs({ value })  
        case 'state-machine':
          return initializeData({ value })        
        default:
          return {}
      }
    })
    console.log(window.socket)
    // console.log = ()=>{}
  }

  return (
    <ThemeProvider theme={createTheme()}>
      <div style={{ margin: 'auto', marginTop: 12, width: 1280, outline: '1px solid #AAA' }}>
        {
          dataLoaded ? 
          <Grid container justifyContent='center'>
            <Grid container item xs={12}>
              {/* <Grid item xs={12}>        
                <Paper square elevation={0} style={sectionStyle}>
                  <LayoutBase/>
                </Paper>
              </Grid> */}
              <Paper square elevation={0} style={sectionStyle}>              
                <CurrentPattern/>    
              </Paper>              
              <Paper square elevation={0} style={sectionStyle}>              
                <SongMode/>
              </Paper>                
              {/* <Paper square elevation={0} style={sectionStyle}>              
                <PlaylistMode/>
              </Paper>                 */}
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
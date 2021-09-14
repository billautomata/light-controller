import { ThemeProvider } from '@material-ui/core'
import { initializeData, setConfig } from '../actions/index'
import { connect } from "react-redux"
import CurrentPattern from './CurrentPattern/CurrentPatternBase'
import { Grid, Paper } from '@material-ui/core'
import LoadPatterns from './LoadPatterns'
import SongMode from './SongMode/SongModeBase'
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
    setConfig: payload => dispatch(setConfig(payload))
  }
}

const sectionStyle = { 
  marginBottom: 8, 
  paddingTop: 8, 
  paddingBottom: 16, 
  borderBottom: '1px solid #AAA' 
}

const ConnectedApp = function ({ dataLoaded, initializeData, setConfig }) {

  if(window.socket === undefined) {
    window.socket = io.connect("/")
    window.socket.on('connect', () => {
      console.log('connect')
    })
    window.socket.onAny((name, value)=>{      
      console.log('event:', name, 'value:', value)
      switch(name) {
        case 'config':
          return setConfig({ value })
        case 'state-machine':
          return initializeData({ value })        
        default:
          return {}
      }
    })
    console.log(window.socket)
  }

  return (
    <ThemeProvider theme={createTheme()}>
      <div style={{margin: 12 }}>
        {
          dataLoaded ? 
          <Grid container justifyContent='center'>
            <Grid container item xs={12}>
              <Grid item xs={12}>        
                <Paper square outlined elevation={0} style={sectionStyle}>
                  {/* <LayoutBase/> */}
                </Paper>
              </Grid>
              <Paper square outlined elevation={0} style={sectionStyle}>              
                <CurrentPattern/>    
              </Paper>              
              <Paper square outlined elevation={0} style={sectionStyle}>              
                {/* <SongMode/> */}
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
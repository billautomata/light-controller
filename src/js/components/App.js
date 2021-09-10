import { setStep, setPatterns } from '../actions/index'
import { connect } from "react-redux"
import CurrentPattern from './CurrentPattern'

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
    <div style={{marginTop: 20}}>
      {
        dataLoaded ? <CurrentPattern/> : null
      }      
    </div>
  )
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp)

export default App
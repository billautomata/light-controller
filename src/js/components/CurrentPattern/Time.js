import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import { setTimeValue } from '../../actions/index'

const boxSize = 50
const patternLength = 10

const mapStateToProps = (state, ownProps) => {
  return {
    timePattern: state.patterns[0].channels[0]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setTimeValue: payload => dispatch(setTimeValue(payload))
  }
}

function Time ({ timePattern, setTimeValue }) {
  return (
    <Grid container item xs={12}>
        <Grid container item xs={1} alignItems='center' justifyContent='center' align='center'>
          <Grid item xs={12}>Time (ms)</Grid>
        </Grid>
        <Grid item xs={11}>
          <svg viewBox={`-1 0 1003 25`}
            style={{
              backgroundColor: '#DDD', 
              width: '99%', 
              margin: 'auto',
              marginTop: 0,
              marginBottom: 0
            }}>    
            {            
              timePattern.steps.map((value, valueIndex) => {
                return (
                  <g key={`speedvalue_${valueIndex}`} transform={`translate(${(boxSize*valueIndex)+1} 2)`}>
                    <foreignObject width={boxSize-2} height='20'>
                      <input type='text' 
                        defaultValue={value.value === -1 ? null : value.value}
                        style={{ 
                          // backgroundColor: 
                          //   speedValues[valueIndex] === null && speedValuesTemporary[valueIndex] === null ? '#FFF' : speedValuesTemporary[valueIndex] === speedValues[valueIndex] ? colorsFn(1) : colorsFn(3),
                          border: 'none', 
                          outline: 'none', 
                        }}
                        onChange={(event)=>{
                          console.log(event.target.value)
                        }}
                        onKeyDown={(event)=>{
                          console.log(event.key, event.target.value)
                          if (event.key === 'Enter' || event.key === 'Tab') {
                            setTimeValue({ step: valueIndex, value: Number(event.target.value) })
                            // window.socket.emit('TIME_VALUE', { step: valueIndex, value: event.target.value })
                          }                        
                        }}/>
                    </foreignObject>
                  </g>
                )
              })
            }
          </svg>
        </Grid>   
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Time)


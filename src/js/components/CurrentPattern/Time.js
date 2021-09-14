import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { setTimeValue } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  return {
    patternLength: state.config.activePattern.patternLength,
    timePattern: state.config.activePattern.channels[0],
    channels: state.config.activePattern.channels,
    activePatternId: state.config.activePatternId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setTimeValue: payload => dispatch(setTimeValue(payload))
  }
}

function Time ({ activePatternId, channels, timePattern, setTimeValue, patternLength }) {
  const boxSize = 1000 / patternLength
  const boxHeight = Math.min(24, boxSize)  
  return (
    <Grid container item xs={12}>
        <Grid container item xs={1} alignItems='center' justifyContent='center' align='center'>
          <Grid item xs={12}><Typography variant='body2'>Time (ms)</Typography></Grid>
        </Grid>
        <Grid item xs={11}>
          <svg viewBox={`-1 0 1003 25`}
            style={{
              backgroundColor: '#FFF', 
              width: '99%', 
              margin: 'auto',
              marginTop: 0,
              marginBottom: 0
            }}>    
            {            
              new Array(patternLength).fill(0).map((value, idx) => {
                const valueForStep = timePattern.steps.filter(o=>{return o.idx === idx})[0]
                return (
                  <g key={`pattern_${activePatternId}_speedvalue_${idx}`} transform={`translate(${(boxSize*idx)+1} 0)`}>
                    <foreignObject width={boxSize} height={boxHeight}>
                      <input type='text'                         
                        // defaultValue={100}
                        defaultValue={ valueForStep === undefined ? null : valueForStep.value }
                        style={{ 
                          // backgroundColor: 
                          //   speedValues[valueIndex] === null && speedValuesTemporary[valueIndex] === null ? '#FFF' : speedValuesTemporary[valueIndex] === speedValues[valueIndex] ? colorsFn(1) : colorsFn(3),
                          border: 'none', 
                          border: '1px solid #DDD',
                          height: boxHeight-4,
                          width: boxSize-8,
                          outline: 'none', 
                        }}
                        onChange={(event)=>{
                          console.log(event.target.value)
                        }}
                        onKeyDown={(event)=>{
                          console.log(event.key, event.target.value)
                          if (event.key === 'Enter' || event.key === 'Tab') {
                            setTimeValue({ step: idx, value: Number(event.target.value) })                            
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


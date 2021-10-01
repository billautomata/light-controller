import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { setTimeValue, setTimeValueTemporary } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  console.log('confirmed time steps', state.uiState.confirmedTimeSteps)
  return {
    patternLength: state.config.activePattern.patternLength,
    timePattern: state.config.activePattern.channels[0],
    activePatternId: state.config.activePatternId,
    confirmedTimeSteps: state.uiState.confirmedTimeSteps
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setTimeValue: payload => dispatch(setTimeValue(payload)),
    setTimeValueTemporary: payload => dispatch(setTimeValueTemporary(payload))
  }
}

function Time ({ activePatternId, confirmedTimeSteps, timePattern, setTimeValue, setTimeValueTemporary, patternLength }) {
  const boxSize = 1000 / patternLength
  const boxHeight = Math.min(24, boxSize)  
  return (
    <Grid container item xs={12} style={{ marginBottom: -3 }} alignItems='center'>
        <Grid container item xs={1} align='center' justifyContent='flex-end'>
          <Grid item xs={6} style={{ height: 20, backgroundColor: '#EEE', borderTopLeftRadius: '8px' }}>
            <Typography variant='body2' style={{ fontStyle: 'italic', fontWeight: 700, position: 'relative', top: 1 }}>ms</Typography>
          </Grid>
        </Grid>
        <Grid item xs={11}>
          <svg viewBox={`-1 0 1001 25`}
            style={{
              backgroundColor: '#FFF', 
              width: '100%',
              marginTop: 2
            }}>    
            {            
              new Array(patternLength).fill(0).map((value, idx) => {
                const valueForStep = timePattern.steps.filter(o=>o.idx === idx)[0]
                const confirmed = confirmedTimeSteps.findIndex(o=>o.idx === idx)
                return (
                  <g key={`pattern_${activePatternId}_speedvalue_${idx}_${Math.random()}`} transform={`translate(${(boxSize*idx)} 0)`}>
                    <rect x='1' y='1' height={boxHeight-1} width={boxSize-2} fill='#EEE' stroke='#AAA' onClick={()=>{ setTimeValue({ step: idx, value: Number(500) }) }}/>
                    {
                      valueForStep === undefined ? <></> :
                      <>
                        <foreignObject width={boxSize} height={boxHeight}>
                          <input type='text'                         
                            defaultValue={ valueForStep.value }
                            style={{ 
                              backgroundColor: confirmed === -1 ? 'white' : '#1f77b4',
                              color: confirmed === -1 ? 'black' : 'white',
                              fontWeight: confirmed === -1 ? '500' : '700',
                              border: '1px solid #DDD',
                              height: boxHeight-5,
                              width: boxSize-7,
                              marginTop: 1,
                              outline: 'none', 
                              fontSize: 12,
                              textAlign: 'center'
                            }}
                            onChange={(event)=>{
                              // return
                              console.log('onchange', event.target.value)
                              // setTimeValueTemporary({ step: idx, value: Number(event.target.value) })                            
                            }}
                            onKeyDown={(event)=>{
                              // return
                              console.log('onkeydown', event.key, event.target.value)
                              if (event.key === 'Enter' || event.key === 'Tab') {
                                setTimeValue({ step: idx, value: Number(event.target.value) })                            
                              }                        
                            }}/>
                        </foreignObject>                      
                      </>
                    }                    
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


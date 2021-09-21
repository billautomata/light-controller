import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { setStepValue } from '../../actions/index'



const mapStateToProps = (state, ownProps) => {
  return {
    pattern: state.config.activePattern,
    channels: state.config.activePattern.channels
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setStepValue: payload => dispatch(setStepValue(payload))
  }
}

function Time ({ channels, pattern, setStepValue }) {
  const boxSize = 1000 / pattern.patternLength
  const boxHeight = Math.min(24, boxSize)
  return (
    <Grid container item xs={11}>
      {
        channels.slice(1,channels.length).map((channel,channelIdx)=>{
          return (
            <Grid container item xs={12} style={{outline: '0px solid red'}}>
              <Grid container item xs={1} alignItems='center' justifyContent='center' align='center'>
                <Grid item align='center' xs={12}>
                  <Typography variant='body2'>Channel {channelIdx}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={11}>
                <svg viewBox={`-1 0 1001 ${boxHeight}`}
                style={{
                  backgroundColor: '#DDD', 
                  width: '100%', 
                  margin: 'auto',
                }}>
                  {
                    new Array(pattern.patternLength).fill(0).map((n,idx)=>{
                      const value = channel.steps.filter(o=>{return o.idx === idx})[0] !== undefined
                      return (
                        <g key={`sequenceValues_${idx}`} transform={`translate(${idx*boxSize} 0)`}>
                          <rect x='0' y='1' 
                            width={boxSize-1} height={Math.min(24, boxHeight-2)} 
                            fill={ value ? 'steelblue' : '#FFF' }
                            style={{
                              cursor: 'pointer'
                            }}
                            onClick={()=>{             
                              setStepValue({ channel: channelIdx+1, step: idx, value: value ? false : true })           
                            }}
                            />
                        </g>
                      )
                    })
                    // channel.steps.map((step, valueIndex) => {
                    // })
                  }
              </svg>
              </Grid>
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Time)


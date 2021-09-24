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
            <Grid container item xs={12} alignItems='center' style={{marginBottom: 0}}>
              <Grid container item xs={1}>
                <Grid item align='center' xs={12}>
                  <Typography variant='body2'>Channel {channelIdx}</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={11}>
                <svg viewBox={`-1 0 1001 ${boxHeight}`}
                  style={{
                    backgroundColor: '#FFF', 
                    width: '100%', 
                  }}
                >
                {
                  new Array(pattern.patternLength).fill(0).map((n,idx)=>{
                    const value = channel.steps.filter(o=>{return o.idx === idx})[0] !== undefined
                    return (
                      <g key={`sequenceValues_${idx}`} transform={`translate(${idx*boxSize} 0)`}>
                        <rect x='1' y='1' 
                          width={boxSize-2} height={Math.min(24, boxHeight-2)} 
                          fill={ value ? '#1f77b4' : '#FFF' }
                          stroke={'#AAA'}
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


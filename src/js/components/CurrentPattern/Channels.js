import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { setStepValue } from '../../actions/index'

const boxSize = 50

const mapStateToProps = (state, ownProps) => {
  return {
    channels: state.patterns[0].channels
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setStepValue: payload => dispatch(setStepValue(payload))
  }
}

function Time ({ channels, setStepValue }) {
  return (
    <Grid container item xs={12}>
      {
        channels.slice(1,channels.length).map((channel,channelIdx)=>{
          return (
            <Grid container item xs={12} style={{outline: '0px solid red'}}>
              <Grid container item xs={1} alignItems='center' justifyContent='center' align='center'>
                <Grid item alignItems='center' xs={12}>
                  <Typography variant='body2'>Channel {channelIdx}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={11}>
                <svg viewBox={`0 0 1001 ${boxSize}`}
                style={{
                  backgroundColor: '#DDD', 
                  width: '99%', 
                  margin: 'auto',
                }}>
                  {
                    channel.steps.map((step, valueIndex) => {
                      return (
                        <g key={`sequenceValues_${valueIndex}`} transform={`translate(${valueIndex*boxSize} 0)`}>
                          <rect x='1' y='1' 
                            width={boxSize-1} height={boxSize-2} 
                            fill={ step.value === 1 ? 'steelblue' : '#FFF' }
                            style={{
                              cursor: 'pointer'
                            }}
                            onClick={()=>{             
                              setStepValue({ channel: channelIdx+1, step: valueIndex, value: step.value === 1 ? 0 : 1 })           
                            }}
                            />
                        </g>
                      )
                    })
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


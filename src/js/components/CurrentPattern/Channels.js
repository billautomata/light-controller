import { useRef } from 'react'
import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { setStepValue } from '../../actions/index'
import * as d3 from 'd3'

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

function registerSvgRefDrag (svgRef) {
  console.log('handler has run')
  const handler = d3.drag().on('drag', dragged)
  function dragged (event) {
    console.log('event', event)
  }
  handler(d3.select(svgRef.current))
}

function Channels ({ channels, pattern, setStepValue }) {
  const boxSize = 1000 / pattern.patternLength
  const boxHeight = Math.min(24, boxSize)

  const svgRef = useRef(null)

  registerSvgRefDrag(svgRef)

  return (
    <Grid container item xs={12}>
      {
        channels.slice(1,channels.length).map((channel,channelIdx)=>{
          return (
            <Grid key={`patternMode_channelParent_${channelIdx}`} container item xs={12} alignItems='center' 
              style={{ outline: '1px solid white', marginBottom: 0, }}>
              <Grid container item xs={1} justifyContent='flex-end'>
                <Grid item align='center' xs={6} style={{ height: 22,  backgroundColor: channelIdx % 2 ? '#EEE' : '#FFF'}}>
                  <Typography variant='body2' 
                    style={{ fontWeight: 700, fontSize: 12, position: 'relative', top: 3 }}>{channelIdx === 0 ? 'CH ' : null}{channelIdx}</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={11}>
                <svg ref={svgRef} viewBox={`-1 0 1001 ${boxHeight}`}
                  style={{ width: '100%', backgroundColor: channelIdx % 2 ? '#EEE' : '#FFF' }}
                >
                {
                  new Array(pattern.patternLength).fill(0).map((n,idx)=>{
                    const value = channel.steps.filter(o=>{return o.idx === idx})[0] !== undefined
                    return (
                      <g key={`patternMode_sequenceValues_${idx}_${channelIdx}`} transform={`translate(${idx*boxSize} 0)`}>
                        <rect x='0' y='-1' 
                          width={boxSize} height={boxHeight+2} 
                          fill={ value ? '#1f77b4' : 'transparent' }
                          stroke={channelIdx % 2 ? '#FFF' : '#EEE'}
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

export default connect(mapStateToProps, mapDispatchToProps)(Channels)


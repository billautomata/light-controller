import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Grid } from '@material-ui/core'

const mapStateToProps = (state, ownProps) => {
  return {
    currentStepTime: state.currentStepTime,
    songPattern: ownProps.mode === 'playlist' ? state.config.playlistData.songs : state.config.songData.patterns,    
    doIndicator: ownProps.mode === state.config.playingMode
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

function Visualized ({ currentStepTime, doIndicator, songPattern }) {
  const colors = d3.scaleOrdinal(d3.schemeCategory10)
  const sum = d3.sum(songPattern, d=>d.msLength)
  const w = 960
  const scaleX_ms = d3.scaleLinear().domain([0,sum]).range([0,w])
  const scaleX_percent = d3.scaleLinear().domain([0,1]).range([0,w])

  let listOfPatterns = []
  songPattern.forEach(pattern => {
    if (listOfPatterns.indexOf(pattern.id) === -1) {
      listOfPatterns.push(pattern.id)
    }
  })
  listOfPatterns = listOfPatterns.sort()
  return (
    <Grid container item xs={12}>
      <svg width='90%' height='45px' viewBox={`0 0 ${w} 45`} style={{ margin: 'auto', backgroundColor: 'white', opacity: songPattern.length === 0 ? 0 : null }}>
        {
          songPattern.map((pattern,idx)=>{
            const x = scaleX_ms(d3.sum(songPattern.filter((o,i)=>i<idx), d=>d.msLength))
            const w = scaleX_ms(pattern.msLength)
            return (
              <rect key={`visualized_songpattern_${idx}`} x={x} y='0' width={w} height='35' fill={colors(listOfPatterns.indexOf(pattern.id))} stroke='white'/>
            )
          })
        }
        <g transform={`translate(${currentStepTime ? scaleX_percent(currentStepTime): 0} 0)`} style={{ display: doIndicator ? null : 'none' }}>
          <line x1='0' y1='0' x2='0' y2='35' stroke='black' strokeWidth='4px'/>
          <g transform='translate(0 35)'>
            <polygon points='0 0 5 10 -5 10' fill='black'/>
          </g>          
        </g>
      </svg>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Visualized)
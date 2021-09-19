import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Grid } from '@material-ui/core'


const mapStateToProps = (state, ownProps) => {
  return {
    songPattern: state.config.activeSong.songPattern
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

function SongVisualized ({ songPattern }) {

  console.log('song pattern', songPattern)
  const sum = d3.sum(songPattern, d=>d.msLength)

  const w = 960
  const scaleX_ms = d3.scaleLinear().domain([0,sum]).range([0,w])

  let listOfPatterns = []
  songPattern.forEach(pattern => {
    if (listOfPatterns.indexOf(pattern.id) === -1) {
      listOfPatterns.push(pattern.id)
    }
  })
  listOfPatterns = listOfPatterns.sort()

  const colors = d3.scaleOrdinal(d3.schemeCategory10)

  return (
    <Grid container item xs={12}>
      <svg width='90%' height='35px' viewBox={`'0 0 ${w} 35'`} style={{margin: 'auto', backgroundColor: '#DDD'}}>
        {
          songPattern.map((pattern,idx)=>{
            const x = scaleX_ms(d3.sum(songPattern.filter((o,i)=>i<idx), d=>d.msLength))
            const w = scaleX_ms(pattern.msLength)
            return (
              <rect x={x} y='0' width={w} height='35' fill={colors(listOfPatterns.indexOf(pattern.id))} stroke='white'/>
            )
          })
        }
      </svg>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SongVisualized)


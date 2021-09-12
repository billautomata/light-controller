import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import SectionHeader from '../subcomponents/SectionHeader'
import SongName from './SongName'

const song = [
  { id: '0', multiple: 1, speed: 1 },
  { id: '4', multiple: 1, speed: 1 },
  { id: '0', multiple: 2, speed: 1 },
  { id: '4', multiple: 1, speed: 1 },
]

const songName = 'Simple Song'

const indexesEditActive = [0,3]

const mapStateToProps = (state, ownProps) => {
  return {
    patterns: state.patterns
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

function SongModeBase ({ patterns }) {
  const songPatterns = song.map(d=>patterns.filter(o=>{ return o.id === d.id })[0])
  const totalLength = d3.sum(songPatterns, (d,i)=>d.patternLength*song[i].multiple)
  console.log('total length', totalLength)

  const scaleXPattern = d3.scaleLinear()
    .domain([0, totalLength])
    .range([0, 100])

  return (
    <Grid container item xs={12} justifyContent='flex-start'>
      {/* <SectionHeader title={'Configure Song'}/> */}
      <SongName/>
      <Grid container item xs={12} style={{ margin: '24px 0px 18px 0px' }}>
        <Grid container item xs={11}>
          <svg width="100%" height='38px' style={{backgroundColor:'#333', marginBottom: 0}}>
            {
              song.map((pattern,idx)=>{
                
                const width = scaleXPattern(patterns.filter(o=>{return o.id === pattern.id})[0].patternLength * pattern.multiple)
                const x = d3.sum(songPatterns.filter((o,i)=>{return i < idx}), (d,i) => {  return d.patternLength * song[i].multiple })
                return (
                  // <g transform={`translate(${scaleXPattern(x)}% 0)`}>
                  <>
                    <rect x={String(scaleXPattern(x))+'%'} y='0' height='38px' width={width+'%'}
                      fill='steelblue'
                      stroke='white'
                      />
                    <text 
                      x={String(scaleXPattern(x)+(width*0.5))+'%'} y='19' dy='0.33em' 
                      fill='#FFF'
                      fontSize='14px' fontWeight='700' 
                      textAnchor='middle'>
                        {idx}
                    </text>
                  </>
                  // </g>
                )              
              })
            }
          </svg>
        </Grid>
        <Grid container item xs={1}>
          <Grid item xs={12} align='center'>
            <Button variant='contained' color='primary'>+</Button>
          </Grid>
        </Grid>
      </Grid>      
      <Grid container item xs={12} justifyContent='center'>
        <Grid container item xs={12} sm={12} md={10} justifyContent='space-around' style={{marginTop: 8}}>
          <Grid item xs={12} style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', marginBottom: 2, padding: 8}}>
            <Grid container align='center'>
              <Grid item xs={1}>&nbsp;</Grid>
              <Grid item xs={1}>Index</Grid>
              <Grid item xs={10} md={4} align='left'>Pattern Name</Grid>
              <Grid container item xs={3} md={4} lg={5}>
                <Grid item xs={3}>Steps</Grid>
                <Grid item xs={3}>Repeat</Grid>
                <Grid item xs={3}>Speed</Grid>
              </Grid>
              <Grid item xs={1}>&nbsp;</Grid>
            </Grid>
          </Grid>
          {
            song.map((pattern,idx)=>{
              const o = patterns.filter(o=>{return o.id === pattern.id})[0]
              return (              
                <Grid item xs={12} style={{borderRadius: '4px', border: '1px solid #DDD', marginBottom: 4, padding: 8 }}>
                  <Grid container align='center' alignItems='center'>
                    <Grid item xs={1} align='left' style={{paddingTop: '4px'}}>
                      <svg width='18' height='18'>                          
                        <line x1='17' y1='1' x2='1' y2='17' stroke='steelblue' strokeWidth='4'/>
                        <line x1='1' y1='1' x2='17' y2='17' stroke='steelblue' strokeWidth='4'/>
                      </svg>
                    </Grid>
                    <Grid itme xs={1}>{idx}</Grid>
                    <Grid item xs={10} md={4} align='left'>{o.name}</Grid>
                    <Grid container item xs={3} md={4} lg={5}>
                      <Grid item xs={3}>{o.patternLength}</Grid>
                      <Grid item xs={3}>
                        {
                          indexesEditActive.indexOf(idx) === -1 ? 
                            <>{pattern.multiple}x</> : 
                            <select>
                              <option>1</option>
                            </select>
                        }                        
                      </Grid>
                      <Grid item xs={3}>
                        {
                          indexesEditActive.indexOf(idx) === -1 ? 
                            <>{pattern.speed}x</> : 
                            <select>
                              <option>1</option>
                            </select>
                        }                        
                      </Grid>
                    </Grid>
                    <Grid container item xs={2} md={2} lg={1} justifyContent='space-around' style={{paddingTop: '4px'}}>
                      <Grid item>
                        <svg width='18' height='18'>
                          <polygon points='9 0 18 18 0 18' fill='steelblue'/>
                        </svg>
                      </Grid>
                      <Grid item>
                        <svg width='18' height='18'>                          
                          <polygon transform='rotate(180 9,9)' points='9 0 18 18 0 18' fill='steelblue'/>
                        </svg>
                      </Grid>
                      <Grid item align='right'>
                        <svg width='18' height='18'>                          
                          <line x1='1' y1='9' x2='17' y2='9' stroke='steelblue' strokeWidth='4'/>
                          <line x1='9' y1='1' x2='9' y2='17' stroke='steelblue' strokeWidth='4'/>
                        </svg>                        
                      </Grid> 
                      <Grid item align='right'>
                        <svg width='18' height='18'>                          
                          <rect x='2' y='2' width='14' height='14' fill='none' stroke='steelblue' strokeWidth='4'/>
                          <line x1='19' y1='0' x2='9' y2='9' stroke='white' strokeWidth='7'/>
                          <line x1='16' y1='2.5' x2='7' y2='11' stroke='steelblue' strokeWidth='4' strokeLinecap='round'/>
                        </svg>
                      </Grid> 
                    </Grid>
                  </Grid>
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>        
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SongModeBase)


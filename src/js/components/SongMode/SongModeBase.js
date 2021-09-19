import { useState } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import SectionHeader from '../subcomponents/SectionHeader'
import SongName from './SongName'
import SongVisualized from './SongVisualized'
import LoadPatterns from '../LoadPatterns'
import { songChangeStepOrder, songCopyStep, songDeleteStep, songSetValue } from '../../actions'



const mapStateToProps = (state, ownProps) => {
  return {
    song: state.config.activeSong,
    patterns: state.patterns
  }
}

function mapDispatchToProps(dispatch) {
  return {
    songChangeStepOrder: payload => { dispatch(songChangeStepOrder(payload)) },
    songCopyStep: payload => { dispatch(songCopyStep(payload)) },
    songDeleteStep: payload => { dispatch(songDeleteStep(payload)) },    
    songSetValue: payload => {dispatch(songSetValue(payload)) }
  }
}

function SongModeBase ({ patterns, song, songChangeStepOrder, songCopyStep, songDeleteStep, songSetValue }) {
  const songPatterns = song.steps
  const totalLength = 64
  const [ indexesEditActive, setEditActive ] = useState([])

  console.log('total length', totalLength)

  const scaleXPattern = d3.scaleLinear()
    .domain([0, totalLength])
    .range([0, 100])

  return (
    <Grid container item xs={12}>
      <Grid container item xs={10}>
        <SongName/>
        <Grid container item xs={12} style={{ margin: '24px 0px 18px 0px' }}>
          <SongVisualized/>
        </Grid>      
        <Grid container item xs={12} justifyContent='center'>
          <Grid container item xs={12} sm={12} md={10} justifyContent='space-around' style={{marginTop: 8}}>
            <Grid container item xs={12} style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', marginBottom: 2, padding: 8}}>
              <Grid container item align='center' style={{ display: song.steps.length === 0 ? 'none' : null }}>
                <Grid item xs={1}>&nbsp;</Grid>
                <Grid item xs={10} md={5} align='left'>Pattern Name</Grid>
                <Grid container item xs={3} md={4} lg={6}>
                  <Grid item xs={3}>Repeat</Grid>
                  <Grid item xs={3}>Speed</Grid>
                </Grid>
              </Grid>
            </Grid>
            {
              song.steps.length === 0 ? <></> :
              song.steps.map((pattern,idx)=>{
                const o = patterns.filter(o=>{return o.id === pattern.id})[0]
                return (              
                  <Grid item xs={12} style={{borderRadius: '4px', border: '1px solid #DDD', marginBottom: 4, padding: 8 }}>
                    <Grid container align='center' alignItems='center'>
                      <Grid item xs={1} align='left' style={{paddingTop: '4px'}} onClick={()=>{ songDeleteStep({idx}) }}>
                        <svg width='18' height='18'>                          
                          <line x1='17' y1='1' x2='1' y2='17' stroke='steelblue' strokeWidth='4'/>
                          <line x1='1' y1='1' x2='17' y2='17' stroke='steelblue' strokeWidth='4'/>
                        </svg>
                      </Grid>
                      {/* <Grid itme xs={1}>{idx}</Grid> */}
                      <Grid item xs={10} md={5} align='left'>
                        {
                          indexesEditActive.indexOf(idx) === -1 ? 
                          <>{ o.name }</> :
                          <>
                            <select style={{width: '100%'}} 
                              onChange={ event => { 
                                console.log(event.target.value)
                                songSetValue({ idx, type: 'pattern', value: event.target.value }) 
                              } }>
                              {
                                patterns.map(pattern=>{
                                  const stepNameMatches = o.id === pattern.id
                                  console.log(stepNameMatches, o.id, pattern.id)
                                  return (
                                    <option value={pattern.id} selected={stepNameMatches} >{pattern.name}</option>
                                  )
                                })
                              }
                            </select>
                          </>
                        
                        }
                      </Grid>
                      <Grid container item xs={3} md={3} lg={3} alignItems='center' justifyContent='space-around'>
                        <Grid item xs={6} align='center'>
                          {
                            indexesEditActive.indexOf(idx) === -1 ? 
                              <>{pattern.repeat}x</> : 
                              <Grid container item xs={12} justifyContent='center' alignItems='center'>
                                <Grid item>
                                  <TextField size='small' 
                                    defaultValue={pattern.repeat} 
                                    style={{ width: '32px', textAlign: 'center' }}
                                    onChange={ event => { 
                                      console.log(event.target.value)
                                      songSetValue({ idx, type: 'repeat', value: event.target.value }) 
                                    }}
                                    />
                                </Grid>
                                <Grid item>
                                  <span>x</span>
                                </Grid>
                              </Grid>

                          }                        
                        </Grid>
                        <Grid item xs={6}>
                          {
                            indexesEditActive.indexOf(idx) === -1 ? 
                              <>{pattern.speed}x</> : 
                              <Grid container item xs={12} justifyContent='center' alignItems='center' spacing={1}>
                                <Grid item>
                                  <select style={{width: 40}}
                                  onChange={ event => { 
                                    console.log(event.target.value)
                                    songSetValue({ idx, type: 'speed', value: event.target.value }) 
                                  } }                                  
                                  >
                                    {
                                      [0.25, 0.5, 1, 1.5, 2, 4, 8].map(value=>{
                                        return (
                                          <option value={value} selected={Number(pattern.speed) === value ? true : false}>{value}</option>
                                        )
                                      })
                                    }                                    
                                  </select>
                                </Grid>
                                <Grid item>
                                  <span>x</span>
                                </Grid>
                              </Grid>
                          }                        
                        </Grid>
                      </Grid>
                      <Grid container item xs={2} md={3} lg={3} justifyContent='flex-end' style={{paddingTop: '4px'}} spacing={1}>
                        { indexesEditActive.indexOf(idx) === -1 ? 
                            <>
                              <Grid item onClick={()=>{ songChangeStepOrder({ idx, direction: 'up' }) }} style={{cursor: idx === 0 ? null : 'pointer'}}>
                                <svg width='18' height='18' style={{ opacity : idx === 0 ? 0 : 1 }}>
                                  <polygon points='9 0 18 18 0 18' fill='steelblue'/>
                                </svg>
                              </Grid>
                              <Grid item onClick={()=>{ songChangeStepOrder({ idx, direction: 'down' }) }} style={{cursor: 'pointer'}}>
                                <svg width='18' height='18' style={{ opacity : idx === song.steps.length-1 ? 0 : 1 }}>                           
                                  <polygon transform='rotate(180 9,9)' points='9 0 18 18 0 18' fill='steelblue'/>
                                </svg>
                              </Grid>
                              <Grid item align='right' style={{cursor: 'pointer'}} onClick={()=>{ songCopyStep({idx}) }}>
                                <svg width='18' height='18'>                          
                                  <line x1='1' y1='9' x2='17' y2='9' stroke='steelblue' strokeWidth='4'/>
                                  <line x1='9' y1='1' x2='9' y2='17' stroke='steelblue' strokeWidth='4'/>
                                </svg>                        
                              </Grid> 
                              <Grid item align='right' style={{cursor: 'pointer'}} 
                                onClick={()=>{ 
                                  const newIndexes = indexesEditActive
                                  newIndexes.push(idx)
                                  setEditActive(Object.assign([], [], newIndexes)) 
                                }}                                
                              >
                                <svg width='18' height='18'>                          
                                  <rect x='2' y='2' width='14' height='14' fill='none' stroke='steelblue' strokeWidth='4'/>
                                  <line x1='19' y1='0' x2='9' y2='9' stroke='white' strokeWidth='7'/>
                                  <line x1='16' y1='2.5' x2='7' y2='11' stroke='steelblue' strokeWidth='4' strokeLinecap='round'/>
                                </svg>
                              </Grid> 
                            </> :
                            <>
                              <Grid item>
                                <Button size='small' variant='contained' color='primary'
                                  onClick={()=>{ 
                                    const newIndexes = indexesEditActive.filter(o=>o!==idx)
                                    setEditActive(Object.assign([], [], newIndexes)) 
                                  }}                                
                                >Done</Button>
                              </Grid>
                              <Grid item>
                                <Button size='small'
                                  onClick={()=>{ 
                                    const newIndexes = indexesEditActive.filter(o=>o!==idx)
                                    setEditActive(Object.assign([], [], newIndexes)) 
                                  }}                                
                                >&#10005;</Button>
                              </Grid>
                            </>
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                )
              })
            }
          </Grid>
        </Grid>        
      </Grid>
      <Grid container item xs={2} alignItems='flex-start' spacing={2}>
        <LoadPatterns mode='song'/>
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SongModeBase)


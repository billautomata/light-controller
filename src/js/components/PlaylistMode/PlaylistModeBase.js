import { useState } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import SongName from './PlaylistName'
import Visualized from '../subcomponents/Visualized'
import LoadPatterns from '../subcomponents/Load'
import { playlistAddStep, playlistChangeStepOrder, playlistCopyStep, playlistDeleteStep, playlistSetValue } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    patterns: state.patterns,
    playlist: state.config.activePlaylist,
    songs: state.songs,    
    songPattern: state.config.playlistData.songs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    playlistAddStep: payload => { dispatch(playlistAddStep(payload)) },
    playlistChangeStepOrder: payload => { dispatch(playlistChangeStepOrder(payload)) },
    playlistCopyStep: payload => { dispatch(playlistCopyStep(payload)) },
    playlistDeleteStep: payload => { dispatch(playlistDeleteStep(payload)) },    
    playlistSetValue: payload => {dispatch(playlistSetValue(payload)) }
  }
}

function PlaylistModeBase ({ playlist, songs, playlistAddStep, playlistChangeStepOrder, playlistCopyStep, playlistDeleteStep, songPattern, playlistSetValue }) {
  // const songPatterns = playlist.steps
  const [ indexesEditActive, setEditActive ] = useState([])

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
      <Grid container item xs={10}>
        <SongName/>
        <Grid container item xs={12} style={{ margin: '24px 0px 18px 0px' }}>
          <Visualized mode='playlist'/>
        </Grid>      
        <Grid container item xs={12} justifyContent='center'>
          <Grid container item xs={12} sm={12} md={10} justifyContent='space-around' style={{marginTop: 8}}>
            <Grid container item xs={12} style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', marginBottom: 2, padding: 8}}>
              <Grid container item align='center' style={{ display: playlist.steps.length === 0 ? 'none' : null }}>
                <Grid item xs={1}>&nbsp;</Grid>
                <Grid item xs={10} md={5} align='left'>Song Name</Grid>
                <Grid container item xs={3} md={4} lg={6}>
                  <Grid item xs={3}>Repeat</Grid>
                  <Grid item xs={3}>Speed</Grid>
                </Grid>
              </Grid>
            </Grid>
            {
              playlist.steps.length === 0 ? <></> :
              playlist.steps.map((pattern,idx)=>{
                const o = songs.filter(o=>{return o.id === pattern.id})[0]
                return (              
                  <Grid key={`playlistMode_steps_${idx}_${pattern.id}`} item xs={12} style={{borderRadius: '4px', border: '1px solid #DDD', marginBottom: 4, padding: 8 }}>
                    <Grid container align='center' alignItems='center'>
                      <Grid item xs={1} align='left' style={{paddingTop: '4px', paddingLeft: '8px'}} onClick={()=>{ playlistDeleteStep({idx}) }}>
                        <svg viewBox='0 0 18 18' width='12' height='12' style={{outline:'0px solid black', cursor: 'pointer'}}>
                          <line x1='17' y1='1' x2='1' y2='17' stroke='#1f77b4' strokeWidth='4'/>
                          <line x1='1' y1='1' x2='17' y2='17' stroke='#1f77b4' strokeWidth='4'/>
                        </svg>
                      </Grid>
                      {/* <Grid itme xs={1}>{idx}</Grid> */}
                      <Grid item xs={10} md={5} align='left'>
                        {
                          indexesEditActive.indexOf(idx) === -1 ? 
                          <>
                            <div style={{ 
                              display: 'inline-block', 
                              position: 'relative',
                              marginLeft: -16, 
                              top: 3, left: -17, 
                              width: 16, height: 16, 
                              backgroundColor: colors(listOfPatterns.findIndex(o=>o===pattern.id)), 
                              borderRadius: '50%'}}></div>                              
                            <span><Typography variant='body1' style={{display: 'inline-block'}}>{o.name}</Typography></span>                            
                          </> :
                          <>
                            <select style={{width: '100%'}} 
                              onChange={ event => { 
                                console.log(event.target.value)
                                playlistSetValue({ idx, type: 'song', value: event.target.value }) 
                              } }>
                              {
                                songs.map(pattern=>{
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
                              <><Typography variant='body2'>{pattern.repeat}x</Typography></> : 
                              <Grid container item xs={12} justifyContent='center' alignItems='center'>
                                <Grid item>
                                  <TextField size='small' 
                                    defaultValue={pattern.repeat} 
                                    style={{ width: '32px', textAlign: 'center' }}
                                    onChange={ event => { 
                                      console.log(event.target.value)
                                      playlistSetValue({ idx, type: 'repeat', value: event.target.value }) 
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
                              <><Typography variant='body2'>{pattern.speed}x</Typography></> : 
                              <Grid container item xs={12} justifyContent='center' alignItems='center' spacing={1}>
                                <Grid item>
                                  <select style={{width: 40}}
                                  onChange={ event => { 
                                    console.log(event.target.value)
                                    playlistSetValue({ idx, type: 'speed', value: event.target.value }) 
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
                              <Grid item onClick={()=>{ playlistChangeStepOrder({ idx, direction: 'up' }) }} style={{cursor: idx === 0 ? null : 'pointer'}}>
                                <svg width='18' height='18' style={{ opacity : idx === 0 ? 0 : 1 }}>
                                  <polygon points='9 0 18 18 0 18' fill='#1f77b4'/>
                                </svg>
                              </Grid>
                              <Grid item onClick={()=>{ playlistChangeStepOrder({ idx, direction: 'down' }) }} style={{cursor: 'pointer'}}>
                                <svg width='18' height='18' style={{ opacity : idx === playlist.steps.length-1 ? 0 : 1 }}>                           
                                  <polygon transform='rotate(180 9,9)' points='9 0 18 18 0 18' fill='#1f77b4'/>
                                </svg>
                              </Grid>
                              <Grid item align='right' style={{cursor: 'pointer'}} onClick={()=>{ playlistCopyStep({idx}) }}>
                                <svg width='18' height='18'>                          
                                  <line x1='1' y1='9' x2='17' y2='9' stroke='#1f77b4' strokeWidth='4'/>
                                  <line x1='9' y1='1' x2='9' y2='17' stroke='#1f77b4' strokeWidth='4'/>
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
                                  <rect x='2' y='2' width='14' height='14' fill='none' stroke='#1f77b4' strokeWidth='4'/>
                                  <line x1='19' y1='0' x2='9' y2='9' stroke='white' strokeWidth='7'/>
                                  <line x1='16' y1='2.5' x2='7' y2='11' stroke='#1f77b4' strokeWidth='4' strokeLinecap='round'/>
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
            <Grid item xs={12} align='center'>
              <Button size='large' onClick={()=>{ playlistAddStep() }}>ADD SONG</Button>
            </Grid> 
          </Grid>
        </Grid>        
      </Grid>
      <Grid container item xs={2}>
        <LoadPatterns mode='playlist'/>
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistModeBase)


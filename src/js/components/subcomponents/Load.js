import { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Grid, Typography } from '@material-ui/core'
import { copyPattern, createPattern, deletePattern, loadPattern } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    props: ownProps,
    activePatternId: ownProps.mode === 'song' ? state.config.activeSongId : ownProps.mode === 'playlist' ? state.config.activePlaylistId : state.config.activePatternId,
    patterns: ownProps.mode === 'song' ? state.songs : ownProps.mode === 'playlist' ? state.playlists : state.patterns,    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    copyPattern: payload => { dispatch(copyPattern(payload)) },
    createPattern: payload => { dispatch(createPattern(payload)) },
    deletePattern: payload => { dispatch(deletePattern(payload))},
    loadPattern: payload => { dispatch(loadPattern(payload)) }
  }
}

function Load ({ activePatternId, copyPattern, createPattern, deletePattern, loadPattern, patterns, props }) {

  const [ patternsHalfwayToDeletion, setPatternsHalfway ] = useState([])

  return (
    <Grid container item spacing={0} alignItems='flex-start' justifyContent='center'  style={{borderLeft: '0px solid #EEE', height: '100%'}}>      
      <Grid container item xs={12} alignItems='flex-start' justifyContent='center' style={{ border: '0px solid #EEE' }} >
        <Grid xs={12} container item alignItems='flex-start' align='center' justifyContent='flex-start' 
          style={{outline: '0px solid red', paddingTop: '4px', paddingBottom: '21.5px'}}>
          <Grid item xs={10}>
            <Button size='large' variant='outlined' color='primary'
              onClick={()=>{ createPattern({ mode: props.mode }) }}>NEW { props.mode === 'song' ? 'Song' : props.mode === 'playlist' ? 'Playlist' : 'Pattern' }</Button>
          </Grid>
        </Grid>          
        <Grid container item xs={12} style={{maxHeight: '410px', overflow: 'hidden', overflowY: 'auto'}}>        
          {
            patterns.map((pattern,patternIdx)=>{
              return (
                <Grid key={'pattern-list-item-'+pattern.id} container item 
                  xs={12} sm={12} 
                  alignItems='center' justifyContent='center'
                  style={{ paddingBottom: 0, marginBottom: 1 }}>
                  { patternsHalfwayToDeletion.indexOf(patternIdx) === -1 ? 
                      <>
                        <Grid item xs={10} 
                          onClick={()=>{ loadPattern({ id: pattern.id, mode: props.mode }) }} >
                          <Button 
                            size='small'
                            variant={ activePatternId === pattern.id ? 'contained' : 'outlined' } 
                            color={ activePatternId === pattern.id ? 'primary' : 'default' } 
                            style={{ width: '100%', whiteSpace: 'nowrap' }}>
                            {pattern.name}
                          </Button>
                        </Grid>
                        <Grid item xs={2} align='left'
                          onClick={(event)=>{ 
                            event.stopPropagation()
                            const p = patternsHalfwayToDeletion
                            p.push(patternIdx)
                            setPatternsHalfway(Object.assign([], patternsHalfwayToDeletion, p))
                          }}>
                            <Button size='small' variant='text' style={{width:'100%', minWidth: 0}}>&#10005;</Button>
                        </Grid>
                      </>                  
                    : 
                    <>
                      <Grid item xs={4} align='center' style={{padding: '8px 0px'}}>
                        Sure?
                      </Grid>
                      <Grid item xs={4}>
                        <Button variant='contained' size='small'
                          onClick={()=>{ 
                            const p = patternsHalfwayToDeletion.filter(o=>o !== patternIdx)
                            setPatternsHalfway(Object.assign([], [], p))
                            deletePattern({ id: pattern.id, mode: props.mode })
                          }}>Yes</Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button size='small'
                          onClick={(event)=>{
                            event.stopPropagation()
                            const p = patternsHalfwayToDeletion.filter(o=>o !== patternIdx)
                            setPatternsHalfway(Object.assign([], [], p))
                          }}
                        >No</Button>
                      </Grid>                                        
                    </> 
                  }
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>      
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Load)


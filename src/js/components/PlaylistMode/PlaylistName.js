import { connect } from 'react-redux'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { saveEdits, setEditMode, setPatternName, savePlaylist } from '../../actions/index'
import Transport from '../subcomponents/Transport'

const mapStateToProps = (state, ownProps) => {
  const activePlaylistIdx = state.playlists.findIndex(o=>o.id === state.config.activePlaylistId)
  return {
    name: state.config.activePlaylist.name,
    editMode: state.uiState.editModePlaylist,
    showSave: JSON.stringify(state.config.activePlaylist) !== JSON.stringify(state.playlists[activePlaylistIdx])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveEdits: payload => dispatch(saveEdits(payload)),
    savePlaylist: payload => dispatch(savePlaylist(payload)),
    setEditMode: payload => dispatch(setEditMode(payload)),
    setPatternName: payload => dispatch(setPatternName(payload))
  }
}

function PatternName ({ editMode, name, saveEdits, savePlaylist, setEditMode, setPatternName, showSave }) {
  return (
    <Grid container item xs={12} alignItems='center'>
      <Grid item xs={1} align='center'>
        <Typography variant='body2'>Name</Typography>        
      </Grid>
      <Grid container item xs={6}>
        {
          editMode ? 
          <>
            <Grid item xs={4}>
              <TextField defaultValue={name}
                onChange={(event)=>{
                  setPatternName({ mode: 'playlist', value: event.target.value })
                }}/>
            </Grid>
            <Grid item xs={2}/>
            <Grid container item xs={3} justifyContent='center' align='right'>
              <Button variant='contained' color='primary' size='small' onClick={()=>{ saveEdits({ mode: 'playlist' }); setEditMode({ mode: 'playlist', value: false })}}>Done</Button>
              <Button size='small' onClick={()=>{setEditMode({ mode: 'playlist', value: false })}}>&#10005;</Button>
            </Grid>
          </> :
          <>
            <Grid item xs={7}>
              <Typography variant='h6'>{name}</Typography>  
            </Grid>
            <Grid item xs={1}>
              <Button variant='outlined' size='small' onClick={()=>{ setEditMode({ mode: 'playlist', value: true })}}>Edit</Button>
            </Grid>            
          </>
        }
      </Grid>
      <Grid item xs={2} justifyConent='center'>
        <Transport mode='playlist'/>
      </Grid>      
      <Grid container item xs={3} justifyContent='flex-end' spacing={1}>  
        <Grid item style={{display: showSave ? null : 'none' }}>
          <Button variant='contained' color='primary' size='medium'
            onClick={()=>{ savePlaylist() }}>Save</Button>
        </Grid>        
      </Grid>      
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternName)



import { connect } from 'react-redux'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { saveEdits, saveSong, setEditMode, setPatternName } from '../../actions/index'
import Transport from '../subcomponents/Transport'

const mapStateToProps = (state, ownProps) => {
  // console.log('state', state)
  return {
    name: state.config.activeSong.name,
    editMode: state.uiState.editModeSong
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveEdits: payload => dispatch(saveEdits(payload)),
    saveSong: payload => dispatch(saveSong(payload)),
    setEditMode: payload => dispatch(setEditMode(payload)),
    setPatternName: payload => dispatch(setPatternName(payload))
  }
}

function PatternName ({ editMode, name, saveEdits, saveSong, setEditMode, setPatternName }) {
  return (
    <Grid container item xs={12} alignItems='center' spacing={1}>
      <Grid item xs={1} align='center'>
        <Typography variant='body2'>Name</Typography>        
      </Grid>
      <Grid container item xs={6}>
        {
          editMode ? 
          <>
            <Grid item xs={4}>
              <TextField defaultValue={name} style={{width: 280}}
                onChange={(event)=>{
                  setPatternName({ mode: 'song', value: event.target.value })
                }}/>
            </Grid>
            <Grid item xs={2}/>
            <Grid container item xs={3} justifyContent='center' align='right' style={{outline: '1px solid black'}}>
              <Button variant='contained' color='primary' size='small' onClick={()=>{ saveEdits({ mode: 'song' }); setEditMode({ mode: 'song', value: false })}}>Done</Button>
              <Button size='small' onClick={()=>{setEditMode({ mode: 'song', value: false })}}>&#10005;</Button>
            </Grid>
          </> :
          <>
            <Grid item xs={7}>
              <Typography variant='h6'>{name}</Typography>  
            </Grid>
            <Grid item xs={1}>
              <Button variant='outlined' size='small' onClick={()=>{ setEditMode({ mode: 'song', value: true })}}>Edit</Button>
            </Grid>            
          </>
        }
      </Grid>
      <Grid item xs={2} justifyConent='center'>
        <Transport mode='song'/>
      </Grid>      
      <Grid container item xs={3} justifyContent='flex-end' spacing={1}>  
        <Grid item>
          <Button variant='contained' color='primary' size='medium'
            onClick={()=>{ saveSong() }}>Save</Button>
        </Grid>        
      </Grid>      
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternName)



import { connect } from 'react-redux'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { setNumberOfChannels, setNumberOfSteps } from '../../actions/index'
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
  }
}

function PatternName ({ editMode, name }) {
  return (
    <Grid container item xs={12} alignItems='center' spacing={1}>
      <Grid item xs={1} align='center'>
        <Typography variant='body2'>Name</Typography>        
      </Grid>
      <Grid container item xs={3} justifyContent='flex-start'>
        <Grid item>
          {
          editMode ? 
          <>
            <TextField defaultValue={name} style={{width: 280}}/>
          </> :
          <><Typography variant='h6'>{name}</Typography></>
          }
        </Grid>
      </Grid>
      <Grid item xs={2} align='center'>
        {
          editMode ? 
          <>
            <Grid container xs={12} justifyContent='space-around'>
              <Grid item><Button variant='contained' color='primary' size='small'>Done</Button></Grid>
              <Grid item><Button size='small'>&#10005;</Button></Grid>
            </Grid>
          </> :
          <>
            <Button variant='outlined' size='small'>Edit</Button>
          </>
        }        
      </Grid>    
      <Grid item xs={4} justifyConent='center'>
        <Transport mode='song'/>
      </Grid>      
      <Grid container item xs={2} justifyContent='flex-end' spacing={1}>  
        <Grid item>
          <Button variant='contained' color='primary' size='medium'>Save</Button>
        </Grid>        
      </Grid>      
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternName)



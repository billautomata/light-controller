import { connect } from 'react-redux'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { setNumberOfChannels, setNumberOfSteps } from '../../actions/index'
import Transport from '../subcomponents/Transport'

const mapStateToProps = (state, ownProps) => {
  // console.log('state', state)
  return {
    name: state.config.activeSong.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNumberOfChannels: payload => dispatch(setNumberOfChannels(payload)),
    setNumberOfSteps: payload => dispatch(setNumberOfSteps(payload))
  }
}

function PatternName ({ name, numberOfChannels, numberOfSteps, patternName, setNumberOfChannels, setNumberOfSteps }) {
  let nChannels = numberOfChannels
  let nSteps = numberOfSteps
  return (
    <Grid container item xs={12} alignItems='center' spacing={1}>
      <Grid item xs={1} align='center'>
        <Typography variant='body2'>Name</Typography>        
      </Grid>
      <Grid container item xs={6} justifyContent='flex-start'>
        <Grid item>
          <Typography variant='h6'>{name}</Typography>                
        </Grid>
        <Grid item xs={2} align='center'>
          <Button variant='outlined'>Edit</Button>
        </Grid>
      </Grid>
      <Grid item xs={2} justifyConent='center'>
        <Transport mode='song'/>
      </Grid>      
      <Grid container item xs={3} justifyContent='flex-end' spacing={1}>  
        <Grid item>
          <Button variant='contained' color='primary' size='medium'>Save</Button>
        </Grid>        
      </Grid>      
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternName)



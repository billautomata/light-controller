import { connect } from 'react-redux'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { setNumberOfChannels, setNumberOfSteps } from '../../actions/index'
import Transport from '../subcomponents/Transport'

const mapStateToProps = (state, ownProps) => {
  // console.log('state', state)
  return {
    patternName: state.patterns[state.currentPattern].name,
    numberOfSteps: Number(state.patterns[state.currentPattern].patternLength),
    numberOfChannels: state.patterns[state.currentPattern].channels.length - 1
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNumberOfChannels: payload => dispatch(setNumberOfChannels(payload)),
    setNumberOfSteps: payload => dispatch(setNumberOfSteps(payload))
  }
}

function PatternName ({ numberOfChannels, numberOfSteps, patternName, setNumberOfChannels, setNumberOfSteps }) {
  let nChannels = numberOfChannels
  let nSteps = numberOfSteps
  return (
    <Grid container item xs={12} alignItems='center'>
      <Grid item xs={1} align='center'>
        <Typography variant='body2'>Name</Typography>        
      </Grid>
      <Grid item xs={5}>
        <Typography variant='h3'>Simple Song
        </Typography>                
      </Grid>
      <Transport mode='song'/>
      <Grid container item xs={2}/>
      <Grid container item xs={3} justifyContent='center' spacing={1}>  
        <Grid item>
          <Button variant='contained' color='primary' size='medium'>Save</Button>
        </Grid>        
        <Grid item>
          <Button variant='contained' color='default' size='medium'>Clear</Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' color='default' size='medium'>Edit</Button>
        </Grid>
      </Grid>      
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternName)



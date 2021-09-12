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
      <Grid container item xs={1} alignItems='center' justifyContent='center' align='center'>
        <Grid item xs={12}>
          <Typography variant='body2'>Name</Typography>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{patternName}</Typography>                
      </Grid>
      <Transport/>
      <Grid container item xs={2} spacing={1}>
        <Grid item xs={6}>
          <TextField 
            variant='outlined' size='small' 
            type='text' label="Steps" 
            defaultValue={numberOfSteps}
            onChange={(event)=>{
              console.log('on change steps', event.target.value)
              nSteps = event.target.value
            }}
            onKeyPress={(event)=>{
              console.log(event.key)
              if(event.key === 'Enter') {
                setNumberOfSteps({ value: nSteps })
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField 
            variant='outlined' size='small' 
            type='text' label="Channels" 
            defaultValue={numberOfChannels}
            onChange={(event)=>{
              console.log('on change channels', event.target.value)
              nChannels = event.target.value
            }}
            onKeyPress={(event)=>{
              console.log(event.key)
              if(event.key === 'Enter') {
                setNumberOfChannels({ value: nChannels })
              }
            }}
          />
        </Grid>
      </Grid>      
      <Grid container item xs={2} justifyContent='space-around'>  
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



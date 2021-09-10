import { connect } from 'react-redux'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { setNumberOfChannels } from '../../actions/index'

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
    setNumberOfChannels: payload => dispatch(setNumberOfChannels(payload))
  }
}

function PatternName ({ numberOfChannels, numberOfSteps, patternName, setNumberOfChannels }) {
  let nChannels = numberOfChannels
  let nSteps = numberOfSteps
  return (
    <Grid container item xs={12} alignItems='center' spacing={2}>
      <Grid item xs={1}>&nbsp;</Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{patternName} <Button variant='contained' color='default' size='small'>Edit Pattern Name</Button></Typography>                
      </Grid>
      <Grid container item xs={4} spacing={0}>
        <Grid item xs={6}>
          <TextField 
            variant='outlined' size='small' 
            type='text' label="Number of Steps" 
            defaultValue={numberOfSteps}
            onChange={(event)=>{
              console.log('on change steps', event.target.value)
              nSteps = event.target.value
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField 
            variant='outlined' size='small' 
            type='text' label="Number of Channels" 
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
      <Grid item xs={1} align='right'>  
        <Button variant='contained' color='primary' size='medium'>Save</Button>
      </Grid>      
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternName)



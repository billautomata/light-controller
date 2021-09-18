import { connect } from 'react-redux'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { patternClear, saveEdits, savePattern, setEditMode, setNumberOfChannels, setNumberOfSteps, setPatternName } from '../../actions/index'
import Transport from '../subcomponents/Transport'

const mapStateToProps = (state, ownProps) => {
  const activePatternIdx = state.patterns.findIndex(o=>o.id === state.config.activePatternId)
  return {
    numberOfChannels: state.config.activePattern.channels.length -1,
    numberOfSteps: state.config.activePattern.patternLength,    
    patternName: state.config.activePattern.name,
    editMode: state.uiState.editModePattern,
    showSave: JSON.stringify(state.config.activePattern) !== JSON.stringify(state.patterns[activePatternIdx])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    patternClear: payload => dispatch(patternClear(payload)),
    saveEdits: payload => dispatch(saveEdits(payload)),
    savePattern: payload => dispatch(savePattern(payload)),
    setEditMode: payload => dispatch(setEditMode(payload)),
    setNumberOfChannels: payload => dispatch(setNumberOfChannels(payload)),
    setNumberOfSteps: payload => dispatch(setNumberOfSteps(payload)),    
    setPatternName: payload => dispatch(setPatternName(payload))
  }
}

function PatternName ({ editMode, numberOfChannels, numberOfSteps, patternClear, patternName, saveEdits, savePattern, setEditMode, showSave, setNumberOfChannels, setNumberOfSteps, setPatternName }) {
  let nChannels = numberOfChannels
  let nSteps = numberOfSteps
  let name = patternName
  return (
    <Grid container item xs={12} alignItems='center'>
      <Grid container item xs={1} alignItems='center' justifyContent='center' align='center'>
        <Grid item xs={12}>
          <Typography variant='body2'>Name</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={6}>
        {
          editMode ? 
          <>
            <Grid item xs={4}>
              <TextField defaultValue={name} size='x-large'
                onChange = { (event) => { 
                  name = event.target.value 
                  setPatternName({ value: event.target.value })
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField 
                variant='outlined' size='small' 
                type='text' label="Steps" 
                defaultValue={numberOfSteps}
                onChange={(event)=>{
                  console.log('on change steps', event.target.value)
                  nSteps = event.target.value
                  setNumberOfSteps({ value: nSteps })
                }}
                onKeyPress={(event)=>{
                  console.log(event.key)
                  if(event.key === 'Enter') {
                    setNumberOfSteps({ value: nSteps })
                  }
                }}
              />
            </Grid>
            <Grid item xs={3} align='right'>
              <Button 
                variant='contained' 
                color='primary' 
                size='medium' 
                onClick={()=>{ saveEdits({}); setEditMode({value: false}) }}>
                  Done
              </Button>
              <Button 
                variant='default' 
                color='default' 
                size='medium' 
                onClick={()=>{console.log('set edit mdoe click'); setEditMode({value: false})}}>
                  &#10005;
              </Button>
            </Grid>                   
          </> : 
          <>
            <Grid item xs={6}>
              <Typography variant='h6'>{patternName}</Typography>                
            </Grid>
            <Grid container item xs={1}>
              <Grid item xs={12}><Typography variant='body2'>Steps</Typography></Grid>
              <Grid item xs={12}>{numberOfSteps}</Grid>
            </Grid>
            <Grid item xs={1}>
              <Button variant='outlined' color='default' size='small' onClick={()=>{console.log('set edit mdoe click'); setEditMode({value: true})}}>Edit</Button>
            </Grid>             
          </>
        }        
      </Grid>      
      <Grid container item xs={2} justifyContent='center'>
        <Transport/>
      </Grid>
      <Grid container item xs={3} justifyContent='flex-end' spacing={1}>  
        {
          editMode ? <></> :
          <>
            {
              showSave ? 
              <Grid item>
                <Button variant='contained' color='primary' size='medium'
                  onClick={()=>{console.log('saving pattern'); savePattern({})}}
                >Save</Button>
              </Grid> : <></>
            }
            {/* <Grid item>
              <Button variant='contained' color='default' size='medium'>Revert</Button>
            </Grid>
            <Grid item>
              <Button variant='contained' color='default' size='medium'
                onClick={()=>{patternClear({})}}
              >Clear</Button>
            </Grid> */}
          </>
        }  
      </Grid>    
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternName)



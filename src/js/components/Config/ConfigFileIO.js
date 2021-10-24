import { connect } from 'react-redux'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import ConfigImportElements from './ConfigImportElements'
import ConfigSectionTitle from './ConfigSectionTitle'
import saveStateToFile from '../../lib/saveStateToFile.js'
import validateConfigurationFile from '../../lib/validateConfigurationFile.js'

const mapStateToProps = (state, ownProps) => {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

function ConfigFileIO ({ state }) {
  return (
    <Grid container item xs={12} alignItems='flex-start'>
      <ConfigImportElements/>
      <Paper elevation={0} style={{width: '100%', padding: 24, border: '1px solid #CCC'}}>
        <ConfigSectionTitle title='Backup & Restore'/>
        <Grid container item xs={12} justifyContent='space-evenly' >
          <Grid item>
            <Button variant='contained' color='primary'
              onClick={()=>{window.socket.emit('SAVE_TO_DISK')}}>Save To Disk</Button>
          </Grid>
          <Grid item>
            <Button variant='outlined'
              onClick={()=>{window.socket.emit('LOAD_FROM_DISK')}}>Load From Disk</Button>
          </Grid>
          <Grid item style={{margin: 12}}>
            <Button variant='contained' color='primary'
              onClick={ () => { saveStateToFile(state) } }
            >Download Configuration</Button>
          </Grid>
          <Grid item>      
            <input 
              disabled
              accept="application/JSON" 
              // className={classes.input} 
              id="contained-button-file" 
              hidden
              type="file" 
              onChange={ (event)=>{ 
                console.log(event.target.files) 
                const reader = new FileReader()
                reader.onload = event => { 
                  // console.log(JSON.parse(event.target.result))                
                  validateConfigurationFile(event.target.result)  
                }
                reader.readAsText(event.target.files[0])
              } }
            /> 
            <label htmlFor="contained-button-file"> 
              <Button disabled variant="outlined" component="span"> 
                Upload Configuration
              </Button> 
            </label> 
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigFileIO)


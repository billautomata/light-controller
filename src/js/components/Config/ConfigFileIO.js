import { connect } from 'react-redux'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import ConfigSectionTitle from './ConfigSectionTitle'

const mapStateToProps = (state, ownProps) => {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

function ConfigFileIO ({ }) {
  return (
    <Grid container item xs={12} alignItems='flex-start'>
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
            <Button disabled variant='contained' color='primary'
              onClick={()=>{window.socket.emit('LOAD_FROM_DISK')}}>Download Configuration</Button>
          </Grid>
          <Grid item>
            <Button disabled variant='outlined'
              onClick={()=>{window.socket.emit('LOAD_FROM_DISK')}}>Upload Configuration</Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigFileIO)


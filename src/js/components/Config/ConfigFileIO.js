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
      <Paper elevation={2} style={{width: '100%', padding: 24}}>
        <ConfigSectionTitle title='File I/O'/>
        <Grid container item xs={12} justifyContent='space-evenly' >
          <Grid item>
            <Button variant='contained' color='primary'
              onClick={()=>{window.socket.emit('SAVE_TO_DISK')}}>Save To Disk</Button>
          </Grid>
          <Grid item>
            <Button variant='outlined'
              onClick={()=>{window.socket.emit('LOAD_FROM_DISK')}}>Load From Disk</Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigFileIO)


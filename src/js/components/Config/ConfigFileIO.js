import { connect } from 'react-redux'
import { Button, Grid } from '@material-ui/core'

const mapStateToProps = (state, ownProps) => {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

function ConfigFileIO ({ }) {
  return (
    <Grid container item xs={4} justifyContent='space-around'>
      <Grid item>
        <Button variant='contained' color='primary'
          onClick={()=>{window.socket.emit('SAVE_TO_DISK')}}>Save To Disk</Button>
      </Grid>
      <Grid item>
        <Button variant='outlined'
          onClick={()=>{window.socket.emit('LOAD_FROM_DISK')}}>Load From Disk</Button>
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigFileIO)


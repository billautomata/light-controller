import { connect } from 'react-redux'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import ConfigSectionTitle from './ConfigSectionTitle'

const mapStateToProps = (state, ownProps) => {
  return {
    playlists: state.playlists
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

const styles = {
  // border: '1px solid #DDD',
  marginBottom: 4,
  padding: '4px 8px',
  height: 38
}

function ConfigBoot ({ playlists }) {
  return (
    <Grid container item xs={12} alignItems='flex-start'>
      <Paper elevation={0} style={{width: '100%', padding: 24, border: '1px solid #CCC'}}>
        <ConfigSectionTitle title='Boot Behavior'/>        
        <Grid container item xs={12} justifyContent='space-between' alignItems='center' style={styles}>
          <Grid item xs={6}>
            <Typography variant='body1'>Start On Boot</Typography>
          </Grid>
          <Grid item xs={3} align='center'>
            <Button size='small' variant='contained' color='primary' style={{width: '100%'}}>Yes</Button>
          </Grid>
          <Grid item xs={3} align='center'>
            <Button size='small' variant='outlined' color='default' style={{width: '100%'}}>No</Button>
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent='space-between' alignItems='center' style={styles}>
          <Grid item xs={4}>
            <Typography variant='body1'>Playlist</Typography>
          </Grid>
          <Grid item xs={8} align='center'>
            <select style={{width: '100%', fontSize: 14}}>
              {
                playlists.map((playlist,playlistIdx)=>{
                  return (
                    <option key={`boot-behavior-playlist-${playlistIdx}`} value={playlist.id}>{playlist.name}</option>
                  )
                })
              }
            </select>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigBoot)


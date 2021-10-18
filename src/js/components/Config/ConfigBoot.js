import { connect } from 'react-redux'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import ConfigSectionTitle from './ConfigSectionTitle'
import { setBootPlaylist, setStartOnBoot } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  return {
    bootPlaylistId: state.config.bootBehavior.bootPlaylistId,
    playlists: state.playlists,
    startOnBoot: state.config.bootBehavior.startOnBoot,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setBootPlaylist: payload => dispatch(setBootPlaylist(payload)),
    setStartOnBoot: payload => dispatch(setStartOnBoot(payload))
  }
}

const styles = {
  // border: '1px solid #DDD',
  marginBottom: 4,
  padding: '4px 8px',
  height: 38
}

function ConfigBoot ({ bootPlaylistId, playlists, setBootPlaylist, setStartOnBoot, startOnBoot }) {
  return (
    <Grid container item xs={12} alignItems='flex-start'>
      <Paper elevation={0} style={{width: '100%', padding: 24, border: '1px solid #CCC'}}>
        <ConfigSectionTitle title='Boot Behavior'/>        
        <Grid container item xs={12} justifyContent='space-between' alignItems='center' style={styles}>
          <Grid item xs={6}>
            <Typography variant='body1'>Start On Boot</Typography>
          </Grid>
          <Grid item xs={3} align='center'>
            <Button 
              size='small' 
              variant={ startOnBoot ? 'contained' : 'outlined' } 
              color={ startOnBoot ? 'primary' : 'default' } 
              style={{width: '100%'}}
              onClick={()=>{setStartOnBoot(true)}}
            >Yes</Button>
          </Grid>
          <Grid item xs={3} align='center'>
            <Button 
              size='small' 
              variant={ startOnBoot ? 'outlined' : 'contained' } 
              color={ startOnBoot ? 'default' : 'primary' } 
              style={{width: '100%'}}
              onClick={()=>{setStartOnBoot(false)}}
            >No</Button>
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent='space-between' alignItems='center' style={styles}>
          <Grid item xs={5}>
            <Typography variant='body1'>Boot Playlist</Typography>
          </Grid>
          <Grid item xs={7} align='center'>
            <select 
              style={{width: '100%', fontSize: 14}}
              onChange={(event)=>{
                console.log(event.target.value)
                setBootPlaylist(event.target.value)
              }}
            >
              {
                playlists.map((playlist,playlistIdx)=>{
                  return (
                    <option key={`boot-behavior-playlist-${playlistIdx}`} selected={bootPlaylistId === playlist.id} value={playlist.id}>{playlist.name}</option>
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


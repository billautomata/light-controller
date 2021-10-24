import { connect } from 'react-redux'
import { Button, Grid, Typography } from '@material-ui/core'
import Modal from '../subcomponents/Modal.js'
import TitledSection from '../subcomponents/TitledSection.js'

const mapStateToProps = (state, ownProps) => {
  return {
    dataToImport: state
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

function ConfigImportElements ({ dataToImport }) {
  return (
    <Modal>
      <Grid container item xs={12} spacing={2} justifyContent='center'>
        <Grid container item xs={12} style={{padding: '24px 32px'}} alignItems='center'>            
          <Grid item xs={8}>
            <Typography variant='h4'>Select Elements To Import</Typography>
          </Grid>
          <Grid container item xs={4} justifyContent='space-around'>
            <Grid item>
              <Button size='small' variant='outlined' disabled>Already Exists</Button>
            </Grid>
            <Grid item>
              <Button size='small' variant='contained' color='primary'>Selected</Button>
            </Grid>
            <Grid item>
              <Button size='small' variant='outlined'>Not Selected</Button>
            </Grid>
          </Grid>
        </Grid>
        <TitledSection title="Boot Behavior" xs={4}>
          <Grid item>
            <Typography variant='h4'>Ok</Typography>
          </Grid>
        </TitledSection>
        <TitledSection title="Pins" xs={3}>
          <Grid item>
            <Typography variant='h4'>Ok</Typography>
          </Grid>
        </TitledSection>
        <TitledSection title="Network Devices" xs={4}>
          <Grid container item xs={12}>
            {
              dataToImport.config.networkDevices.map(networkDevice=>{
                return (
                  <Grid item>
                    <Button size='small' variant='outlined'>{networkDevice.name}</Button>
                  </Grid>
                )
              })
            }
          </Grid>
        </TitledSection>
        <TitledSection title="Patterns" xs={11}>
          <Grid container item xs={12}>
            {
              dataToImport.patterns.map(pattern=>{
                return (
                  <Grid item
                    style={{ 
                      marginRight: 3,
                      // padding: 8 
                    }}>
                    <Button size='small' variant='outlined'>{pattern.name}</Button>
                  </Grid>
                )
              })
            }
          </Grid>
        </TitledSection>
        <TitledSection title="Playlists" xs={11}>
        <Grid container item xs={12}>
            {
              dataToImport.playlists.map(playlist=>{
                return (
                  <Grid item
                    style={{ 
                      marginRight: 3,
                      // padding: 8 
                    }}>
                    <Button size='small' variant='outlined'>{playlist.name}</Button>
                  </Grid>
                )
              })
            }
          </Grid>
        </TitledSection>
        <TitledSection title="Songs" xs={11}>
        <Grid container item xs={12}>
            {
              dataToImport.songs.map(song=>{
                return (
                  <Grid item
                    style={{ 
                      marginRight: 3,
                      // padding: 8 
                    }}>
                    <Button size='small' variant='outlined'>{song.name}</Button>
                  </Grid>
                )
              })
            }
          </Grid>
        </TitledSection>
      </Grid>
      <Grid container item xs={11} spacing={1} justifyContent='flex-end' style={{marginTop: 24}}>
        <Grid item xs={2}>
          <Button variant='contained' color='primary' style={{width:'100%'}}>Import</Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant='text' color='default' style={{width:'100%'}}>Cancel</Button>          
        </Grid>
      </Grid>
    </Modal>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigImportElements)


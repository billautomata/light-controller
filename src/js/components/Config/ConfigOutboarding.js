import { connect } from 'react-redux'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import ConfigSectionTitle from './ConfigSectionTitle'

const mapStateToProps = (state, ownProps) => {
  return {
    devices: state.config.networkDevices
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

function ConfigOutboarding ({ devices }) {
  
  // const devices = [
  //   { name: 'foo', model: 'O4', mac: 'c4:11:12:23:45', active: false, configuration: [15,1,3,2], lastSeen: Date.now() - (100*1000) },
  //   { name: 'bar', model: 'O4', mac: 'aa:bb:cc:dd:ee', active: true, configuration: [4,5,6,7], lastSeen: Date.now() - (10*(Math.random()*1000)) },
  //   { name: 'baz', model: 'O4', mac: '11:22:33:44:55', active: true, configuration: [8,9,10,11], lastSeen: Date.now() - (10*(Math.random()*1000)) },
  // ]

  return (
    <Grid container item xs={12} style={{marginTop: 24}}>
      <Paper elevation={0} style={{width: '100%', padding: 24, border: '1px solid #CCC'}}>
        <ConfigSectionTitle title='Network Devices'/>
        <Grid container item xs={12} justifyContent='space-evenly' style={{marginTop: 16}}>
          {
            devices.map(device => {
              return (
                <Grid item xs={3}>
                  <Paper elevation={0} style={{width: '100%', padding: 24, border: '1px solid #CCC'}}>
                    {/* <ConfigSectionTitle title={`${device.name}`} /> */}
                    <Grid container item xs={12}>
                      {
                        [
                          { key: 'name', value: device.name },
                          { key: 'mac address', value: device.mac.toUpperCase() },
                          // { key: 'last seen', value: ((Date.now() - device.lastSeen) / 1000).toFixed(1) + ' seconds ago' },
                          // { key: 'status', value: device.active ? 'Active' : 'Inactive' }
                        ].map(o=>{
                          return (
                            <Grid container item xs={12} spacing={2} style={{marginBottom: 0}} alignItems='center'>
                              <Grid item xs={6} align='right'>
                                <Typography variant='body2' style={{fontWeight: 700, textTransform: 'uppercase'}}>{o.key}</Typography>
                              </Grid>
                              <Grid item xs={6} align='left'>
                                <Typography variant='body1'>{o.value}</Typography>
                              </Grid>
                            </Grid>
                          )
                        })
                      }                      
                    </Grid>
                    <Grid container item xs={12} justify='space-evenly' style={{marginTop: 12}}>
                      {
                        device.mappings.map((ch,idx)=>{
                          return (
                            <Grid container item xs={5} align='left' spacing={1}
                              style={{
                                marginBottom: 8,
                                padding: 4,
                                outline: '0px solid #AAA',                                 
                              }} justify='center' alignItems='center'>
                              <Grid item xs={6} align='right'>
                                <Typography variant='body2'>Port {idx}</Typography>
                              </Grid>
                              <Grid item xs={6} align='left'>
                                <Typography variant='body1' style={{fontWeight:700}}>CH {ch}</Typography>
                              </Grid>
                            </Grid>
                          )
                        })
                      }
                    </Grid>
                    <Grid item xs={12} justify='center' align='center' style={{marginTop: 16}}>
                      <Button variant='outlined'>EDIT</Button>
                    </Grid>
                  </Paper>      
                </Grid>
              )
            })
          }
        </Grid>
      </Paper>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigOutboarding)


import { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import ConfigSectionTitle from './ConfigSectionTitle'
import { setNetworkDevicePortMapping } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  return {
    devices: state.config.networkDevices
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNetworkDevicePortMapping: payload => { dispatch(setNetworkDevicePortMapping(payload)) }
  }
}

function ConfigOutboarding ({ devices, setNetworkDevicePortMapping }) {

  const [ editActive, setEditActive ] = useState({ status: false })
  const [ channelInputTemp, setChannelInputTemp ] = useState([-1,-1,-1,-1])

  return (
    <Grid container item xs={12} style={{marginTop: 24}}>
      <Paper elevation={0} style={{width: '100%', padding: 24, border: '1px solid #CCC'}}>
        <ConfigSectionTitle title='Network Devices'/>
        <Grid container item xs={12} justifyContent='flex-start' style={{marginTop: 16}}>
          {
            devices.map(device => {
              return (
                <Grid item xs={3}>
                  <Paper elevation={0} style={{width: '100%', padding: 24, border: '1px solid #CCC'}}>
                    {/* <ConfigSectionTitle title={`${device.name}`} /> */}
                    <Grid container item xs={12}>
                      {
                        [
                          { name: 'name', value: device.name },
                          { name: 'mac address', value: device.mac.toUpperCase() },
                          // { key: 'last seen', value: ((Date.now() - device.lastSeen) / 1000).toFixed(1) + ' seconds ago' },
                          // { key: 'status', value: device.active ? 'Active' : 'Inactive' }
                        ].map(o=>{
                          return (
                            <KeyValuePair {...o}/>
                          )
                        })
                      }                      
                    </Grid>
                    <Grid container item xs={12} justify='center' style={{marginTop: 12}}>
                      <Grid container item xs={12} align='center' spacing={2} justify='center' alignItems='center'>
                        <Grid item xs={4}>
                          <Typography variant='body1' style={{fontWeight:700}}>Port</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant='body1' style={{fontWeight:700}}>Channel</Typography>
                        </Grid>
                      </Grid>                      
                      {
                        device.mappings.map((ch,idx)=>{
                          return (
                            <Grid container item xs={12} align='center' spacing={2} justify='center' alignItems='center'
                              style={{ marginTop: 2 }}>
                              <Grid item xs={4}>
                                <Typography variant='body1'>{idx}</Typography>
                              </Grid>
                              <Grid item xs={4}>
                                {
                                  editActive.status === false ? 
                                    <Typography variant='body1' >{ch}</Typography>
                                    :
                                    <TextField defaultValue={ch} 
                                      onChange={(event)=>{
                                        console.log('idx', idx, 'value', event.target.value, 'mac', device.mac)
                                        console.log(device.mappings)
                                        const mappings = JSON.parse(JSON.stringify(device.mappings))
                                        mappings[idx] = Number(event.target.value)
                                        setNetworkDevicePortMapping({ mac: device.mac, mappings })
                                      }}
                                      inputProps={{ style: {
                                        textAlign: 'center', 
                                        height: 8
                                      }}} 
                                      style={{width: 32}}
                                    />
                                }                                
                              </Grid>
                            </Grid>
                          )
                        })
                      }
                    </Grid>
                    <Grid container item xs={12} justify='center' align='center' style={{marginTop: 16}}>
                      {
                        editActive.status === true ? 
                          <>
                            <Grid item xs={5}>
                              <Button variant='contained' color='primary' onClick={()=>{setEditActive(Object.assign({}, editActive, { status: false } ))}}>DONE</Button>
                            </Grid>                                          
                            <Grid item xs={5}>
                              <Button variant='text' onClick={()=>{setEditActive(Object.assign({}, editActive, { status: false } ))}}>&#10005;</Button>
                            </Grid>
                          </> :
                          <>
                            <Grid item xs={5}>
                              <Button variant='contained'>TEST</Button>
                            </Grid>                                          
                            <Grid item xs={5}>
                              <Button variant='outlined' onClick={()=>{setEditActive(Object.assign({}, editActive, { status: true } ))}}>EDIT</Button>
                            </Grid>
                          </>

                      }
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

function KeyValuePair (props) {
  return (
    <Grid container item xs={12} spacing={2} style={{marginBottom: 0}} alignItems='center'>
      <Grid item xs={6} align='right'>
        <Typography variant='body2' style={{fontWeight: 700, textTransform: 'uppercase'}}>{props.name}</Typography>
      </Grid>
      <Grid item xs={6} align='left'>
        <Typography variant='body1'>{props.value}</Typography>
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigOutboarding)


import { connect } from 'react-redux'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import ConfigSectionTitle from './ConfigSectionTitle'

const mapStateToProps = (state, ownProps) => {
  return {
    pins: state.pins
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

function ConfigPins ({ pins }) {
  return (
    <Grid container item xs={7}>
      <Paper elevation={2} style={{width: '100%', padding: 24}}>
        <ConfigSectionTitle title='Map Channels to Pins'/>
        <Grid container item xs={12}>
          {
            new Array(16).fill(0).map((o,n)=>{
              return (
                <Grid key={`pinmapping_${n}`} container item xs={4} align='center' style={{ padding: 4 }}>
                  <Grid container item xs={12} alignItems='center' justifyContent='space-between' style={{ outline: '1px solid #DDD', padding: '8px 4px' }}>
                    <Grid item xs={4} align='center' style={{paddingTop: 1}}>
                      <Typography variant='body2' style={{fontWeight: 700}}>CH {n}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField  inputProps={{ style: {textAlign:'center'} }} defaultValue={pins[n]}/>
                    </Grid>
                    <Grid item xs={4}>
                      <Button size='small' variant='outlined' style={{width: '100%', maxWidth: '100%'}}>Test</Button>
                    </Grid>
                  </Grid>                  
                </Grid>
              )
            })
          }
        </Grid>
        <Grid container item xs={12} spacing={2} justifyContent='flex-end' style={{marginTop: 10}}> 
          <Grid item>
            <Button size='large' variant='contained' color='primary'>Save</Button>
          </Grid>
          <Grid item>
            <Button size='large' variant='outlined' color='default'>Cancel</Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPins)


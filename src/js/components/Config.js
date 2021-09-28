import { connect } from 'react-redux'
import { Button, Grid, Typography } from '@material-ui/core'

const mapStateToProps = (state, ownProps) => {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

function Config ({ }) {
  return (
    <Grid container item xs={12} justifyContent='center'>
      <Grid item xs={12} style={{marginBottom: 12}}>
        <Typography variant='h4'>Configuration</Typography>
      </Grid>
      <Grid container item xs={10} justifyContent='center' spacing={2}>
        <Grid item>
          <Button variant='contained' color='primary'>Save To Disk</Button>
        </Grid>
        <Grid item>
          <Button>Load From Disk</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Config)


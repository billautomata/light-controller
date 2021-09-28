import { connect } from 'react-redux'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import ConfigFileIO from './ConfigFileIO.js'

const mapStateToProps = (state, ownProps) => {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

const sectionStyle = {
  padding: '24px 8px 24px 8px',
  border: '1px solid #AAA'
}

function Config ({ }) {
  return (
    <Grid container item xs={12}>
      <Grid item xs={12} style={{marginBottom: 30}}>
        <Typography variant='h4'>Configuration</Typography>
      </Grid>
      <ConfigFileIO/>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Config)


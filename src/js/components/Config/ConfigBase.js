import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import ConfigBoot from './ConfigBoot'
import ConfigFileIO from './ConfigFileIO'
import ConfigOutboarding from './ConfigOutboarding'
import ConfigPins from './ConfigPins'

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
    <Grid container item xs={12} justifyContent='center'>
      <Grid item xs={12} style={{ marginBottom: 30, paddingLeft: 28 }}>
        <Typography variant='h4'>Configuration</Typography>
      </Grid>
      <Grid container item xs={11} justifyContent='space-between'>
        <Grid container item xs={4} alignItems='flex-start'>
          <ConfigFileIO/>
          <ConfigBoot/>
        </Grid>
        <ConfigPins/>      
        <ConfigOutboarding/>
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Config)


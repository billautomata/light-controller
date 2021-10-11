import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import ActiveStep from './ActiveStep'
import Channels from './Channels'
import PatternName from './PatternName'
import Time from './Time'
import LoadPatterns from '../subcomponents/Load'
import ConfigSectionTitle from '../Config/ConfigSectionTitle'

const mapStateToProps = (state, ownProps) => {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

function CurrentPattern ({ }) {
  return (
    <Grid container item xs={12}>
      <Grid container item xs={10}>
        <PatternName/>
        <Grid container item xs={12} style={{paddingRight: 24}}>
          <ActiveStep/>
          <Time/>
          <Channels/>            
        </Grid>
      </Grid>
      <Grid container item xs={2}>
        <LoadPatterns mode='pattern'/>
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPattern)


import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import ActiveStep from './ActiveStep'
import Channels from './Channels'
import PatternName from './PatternName'
import Time from './Time'
import LoadPatterns from '../LoadPatterns'

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
        <ActiveStep/>
        <Time/>
        <Channels/>            
      </Grid>
      <Grid container item xs={2}>
        <LoadPatterns mode='pattern'/>
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPattern)


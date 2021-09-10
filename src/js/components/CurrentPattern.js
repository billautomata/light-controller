import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import ActiveStep from './CurrentPattern/ActiveStep'
import Channels from './CurrentPattern/Channels'
import PatternName from './CurrentPattern/PatternName'
import Time from './CurrentPattern/Time'

const mapStateToProps = (state, ownProps) => {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

function CurrentPattern ({ }) {
  return (
    <Grid container item xs={12}>
      <PatternName/>
      <ActiveStep/>
      <Time/>
      <Channels/>            
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPattern)


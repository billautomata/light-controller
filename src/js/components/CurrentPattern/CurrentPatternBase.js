import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import ActiveStep from './ActiveStep'
import Channels from './Channels'
import PatternName from './PatternName'
import SectionHeader from '../subcomponents/SectionHeader'
import Time from './Time'

const mapStateToProps = (state, ownProps) => {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

function CurrentPattern ({ }) {
  return (
    <Grid container item xs={12}>
      {/* <SectionHeader title={'Configure Pattern'}/> */}
      <PatternName/>
      <ActiveStep/>
      <Time/>
      <Channels/>            
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPattern)


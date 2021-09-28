import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'

const mapStateToProps = (state, ownProps) => {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

function Empty ({ }) {
  return (
    <Grid container item xs={12}>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Empty)


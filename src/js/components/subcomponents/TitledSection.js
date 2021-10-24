import { connect } from 'react-redux'
import { Grid, Paper } from '@material-ui/core'
import ConfigSectionTitle from '../Config/ConfigSectionTitle'

const mapStateToProps = (state, ownProps) => {
  return {
    props: ownProps
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

function TitledSection ({ props }) {
  return (
    <Grid container item xs={props.xs}>
      <Paper elevation={0} style={{width: '100%', padding: 24, border: '1px solid #CCC'}}>
        <ConfigSectionTitle title={props.title}/>
        { props.children }
      </Paper>
    </Grid>
)
}

export default connect(mapStateToProps, mapDispatchToProps)(TitledSection)


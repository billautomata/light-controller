import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import SectionHeader from './subcomponents/SectionHeader'

const mapStateToProps = (state, ownProps) => {
  return {
    patterns: state.patterns
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

function LoadPatterns ({ patterns }) {
  return (
    <Grid container item xs={12}>
      <SectionHeader title={'Load Pattern'}/>
      {
        patterns.map(pattern=>{
          return (
            <Grid xs={12} sm={12}>
              { pattern.name }
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadPatterns)


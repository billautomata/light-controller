import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import { loadPattern } from '../actions'

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    patterns: state.patterns
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPattern: payload => { dispatch(loadPattern(payload)) }
  }
}

function LoadPatterns ({ loadPattern, patterns }) {
  return (
    <Grid container item xs={12}>
      {/* <SectionHeader title={'Load Pattern'}/> */}
      {
        patterns.map(pattern=>{
          return (
            <Grid xs={12} sm={12} onClick={()=>{ loadPattern({id:pattern.id}) }}>
              { pattern.name }
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadPatterns)


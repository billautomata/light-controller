import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import { loadPattern } from '../actions'

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    activePatternId: state.config.activePatternId,
    patterns: state.patterns,    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPattern: payload => { dispatch(loadPattern(payload)) }
  }
}

function LoadPatterns ({ activePatternId, loadPattern, patterns }) {
  return (
    <Grid container item xs={12}>
      {/* <SectionHeader title={'Load Pattern'}/> */}
      {
        patterns.map(pattern=>{
          return (
            <Grid xs={12} sm={12} 
              onClick={()=>{ loadPattern({id:pattern.id}) }} 
              style={{              
                backgroundColor: activePatternId === pattern.id ? 'steelblue' : 'white',
                borderRadius: 2,
                border: `1px solid ${ activePatternId === pattern.id ? 'steelblue': '#AAA' }`,
                fontWeight: activePatternId === pattern.id ? 700 : 500,
                color: activePatternId === pattern.id ? 'white' : 'black',
                padding: 6, 
                marginBottom: 4,
                cursor: 'pointer'
              }}>
              { pattern.name }
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadPatterns)


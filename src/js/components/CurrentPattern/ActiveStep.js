import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import { setCurrentStep } from '../../actions/index'

const boxSize = 50
const patternLength = 10

const mapStateToProps = (state, ownProps) => {
  return {
    currentStep: state.currentStep
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentStep: payload => { dispatch(setCurrentStep(payload)) }
  }
}

function ActiveStep ({ currentStep, setCurrentStep }) {
  return (
    <Grid container item xs={12}>
        <Grid container item xs={1} alignItems='center' justifyContent='center' align='center'>
          <Grid item xs={12}>Active Step</Grid>
        </Grid>
        <Grid item xs={11}>
          <svg viewBox={`-1 0 1003 25`}
                style={{
                  backgroundColor: '#DDD', 
                  width: '99%', 
                  margin: 'auto',
                  marginTop: 10,
                  marginBottom: 0
                }}>    
              {
                new Array(patternLength).fill(0).map((o, index) => {
                  return (
                    <g key={`stepIndicator_${index}`} 
                      transform={`translate(${(boxSize*index)+1} 2)`}
                      onClick={ ()=>{ console.log('click', index); setCurrentStep({ value: index }) } }
                    >
                      <rect x='0' y='0' width={boxSize-2} height={21} fill={ currentStep === index ? 'steelblue' : '#EEE' }/>
                    </g>
                  )
                })
              }
          </svg>
        </Grid>      
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveStep)


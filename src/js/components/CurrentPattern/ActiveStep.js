import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { setCurrentStep } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  return {
    currentStep: state.currentStep,
    patternLength: state.config.activePattern.patternLength,
    playingMode: state.config.playingMode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentStep: payload => { dispatch(setCurrentStep(payload)) }
  }
}

function ActiveStep ({ currentStep, patternLength, playingMode, setCurrentStep }) {
  const boxSize = 1000 / patternLength 
  return (
    <Grid container item xs={11}>
        <Grid container item xs={1} alignItems='center' justifyContent='center' align='center'>
          <Grid item xs={12}>
            <Typography variant='body2'>Active Step</Typography>
          </Grid>
        </Grid>
        <Grid item xs={11}>
          <svg viewBox={`-1 0 1001 25`}
                style={{
                  backgroundColor: '#FFF', 
                  width: '100%', 
                  margin: 'auto',
                  marginTop: 10,
                  marginBottom: 0
                }}>    
              {
                new Array(patternLength).fill(0).map((o, index) => {
                  return (
                    <g key={`stepIndicator_${index}`} 
                      transform={`translate(${(boxSize*index)} 0)`}
                      onClick={ ()=>{ console.log('click', index); setCurrentStep({ value: index }) } }
                    >
                      <rect x='1' y='0' width={boxSize-1} height={25} 
                        fill={ ((playingMode === 'pattern') && (currentStep === index)) ? '#1f77b4' : '#CCC' }/>
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


import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
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
    <Grid container item xs={12} alignItems='center' justifyContent='center' style={{marginTop: 24, marginBottom: -3}}>
        <Grid item xs={1}/>
        <Grid item xs={11}>
          <svg viewBox={`-1 0 1001 15`}
                style={{
                  backgroundColor: '#FFF', 
                  width: '100%', 
                  height: '15px',
                  margin: 'auto'
                }}>    
              {
                new Array(patternLength).fill(0).map((o, index) => {
                  return (
                    <g key={`stepIndicator_${index}`} 
                      transform={`translate(${(boxSize*index)} 0)`}
                      onClick={ ()=>{ console.log('click', index); setCurrentStep({ value: index }) } }
                    >
                      <rect x='1' y='0' rx='2' ry='2' width={boxSize-2} height={15} stroke='#AAA'
                        fill={ ((playingMode === 'pattern') && (currentStep === index)) ? '#FFBF00' : '#CCC' }/>
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


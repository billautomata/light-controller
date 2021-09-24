import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Grid } from '@material-ui/core'

const mapStateToProps = (state, ownProps) => {
  return {
    currentStep: state.currentStep,
    lightValues: getLightValues(state)
  }
}

function getLightValues (state) {
  // console.log(state.config.activeSong.songSteps[state.currentStep].slice(1))
  switch (state.config.playingMode) {
    case 'pattern':
      return state.config.activePattern.channels.slice(1).map((c,i)=>{
        let a = c.steps.findIndex(o=>Number(o.idx) === state.currentStep)
        if(a !== -1) {
          return c.steps[a].value
        } else {
          return 0
        }
      })    
    case 'song': 
      return state.config.songSteps[state.currentStep] !== undefined ? state.config.songSteps[state.currentStep].slice(1) : []
    default:
      return []
  }

}

function mapDispatchToProps(dispatch) {
  return {}
}

const nTrees = 16
const trees = new Array(nTrees).fill(0)

const width = 1200
const height = 80
const scaleX = d3.scaleLinear().domain([0,nTrees]).range([0,width])


function LayoutBase({ currentStep, lightValues }) {
  return (
    <Grid container item xs={12} justifyContent='center'>
      <Grid item xs={12} align='center'>
        <svg height={height} width={width} style={{ backgroundColor: '#FFF', border: '1px solid #AAA', borderRadius: '60px' }}>
          <g transform='translate(0 0)'>
            {
              trees.map((tree,treeIndex)=>{
                const x = scaleX(treeIndex) + scaleX(0.5)
                const y = height * 0.5
                const active = lightValues[treeIndex] === 1

                // console.log(x,y,treeIndex)
                return (
                  <circle cx={x} cy={y} r={33} fill={ active ? '#FFBF00' : '#333' }/>
                )
              })
            }
          </g>
        </svg>
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutBase)


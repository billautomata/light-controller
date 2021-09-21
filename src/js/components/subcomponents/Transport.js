import React from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import { startSequencer, stopSequencer } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  return {
    isPlaying: state.config.isPlaying && (state.config.playingMode === ownProps.mode)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startSequencer: payload => dispatch(startSequencer(payload)),
    stopSequencer: payload => dispatch(stopSequencer(payload))
  }
}

function Transport (props) {
  return (
    <Grid container item xs={12} spacing={1} justifyContent='center' alignItems='center' style={{fontSize: 32, color: 'steelblue'}}>
      <Grid className='transport-button' item 
        style={{ borderBottom: props.isPlaying  ? '4px solid steelblue' : '4px solid transparent' }}
        onClick={()=>{ props.startSequencer({mode: props.mode}) }}
      >
        <svg width='18' height='18' style={{ border: '0px solid black' }}>
          <polygon fill='steelblue' points='0 0 18 9 0 18'/>            
        </svg>
      </Grid>
      <Grid className='transport-button' item 
        style={{borderBottom: '4px solid transparent'}}
        onClick={()=>{ props.stopSequencer() }}
      >      
        <svg width='18' height='18' style={{ border: '0px solid black' }}>
          <polygon fill='steelblue' points='0 0 18 0 18 18 0 18'/>
        </svg>
      </Grid>
      {/* {
        props.mode === 'song' ?
              <Grid className='transport-button' item style={{borderBottom: '4px solid transparent'}}>
                <svg width='18' height='18' style={{ border: '0px solid black' }}>
                  <rect x='0' y='0' width='8' height='18' fill='steelblue'/>
                  <rect x='10' y='0' width='8' height='18' fill='steelblue'/>
                </svg>
              </Grid>
            : null          
      }       */}
    </Grid>    
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Transport)


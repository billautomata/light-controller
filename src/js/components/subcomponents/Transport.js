import React from 'react'
import { Grid } from '@material-ui/core'

export default function Transport (props) {
  return (
    <Grid container item xs={ props.mode === 'song' ? 1 : 1 } spacing={1} justifyContent='left' alignItems='center' style={{fontSize: 32, color: 'steelblue'}}>
      <Grid className='transport-button' item style={{ 
          borderBottom: '4px solid steelblue', 
          // background: '#EEE'
          // background: 'linear-gradient(#FFF, #FFF 80%, steelblue)' 
        }}>
        <svg width='18' height='18' style={{ border: '0px solid black' }}>
          <polygon fill='steelblue' points='0 0 18 9 0 18'/>            
        </svg>
      </Grid>
      <Grid className='transport-button' item style={{borderBottom: '4px solid transparent'}}>
        <svg width='18' height='18' style={{ border: '0px solid black' }}>
          <polygon fill='steelblue' points='0 0 18 0 18 18 0 18'/>
        </svg>
      </Grid>
      {
        props.mode === 'song' ?
              <Grid className='transport-button' item style={{borderBottom: '4px solid transparent'}}>
                <svg width='18' height='18' style={{ border: '0px solid black' }}>
                  <rect x='0' y='0' width='8' height='18' fill='steelblue'/>
                  <rect x='10' y='0' width='8' height='18' fill='steelblue'/>
                </svg>
              </Grid>
            : null          
      }      
    </Grid>    
  )
}
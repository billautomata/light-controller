import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { Grid } from '@material-ui/core'

const nChannels = 5
const nPorts = 10

export default function DeviceProfile() {
  return (
    <Grid container item xs={11} justifyContent='center'>
      <Grid item xs={12}><h3>Device Profile</h3></Grid>
      <Grid item xs={11}><h4>Map Channels to Ports</h4></Grid>
      <Grid container item xs={11}>        
        {
          new Array(nPorts+1).fill(0).map((p,pIdx)=>{
            return (
              <Grid item xs={1} align='center'>{pIdx === 0 ? '' : `Port ${pIdx-1}`}</Grid>
            )
          })
        }
        {
          new Array(nChannels).fill(0).map((o,idx)=>{
            return (
              <Grid container item>
                <Grid item xs={1} align='right'>Channel {idx}</Grid>
                {
                  new Array(nPorts).fill(0).map((p,pIdx)=>{
                    return (
                      <Grid item xs={1} align='center'>
                        <input type='checkbox'/>
                      </Grid>
                    )
                  })
                }
              </Grid>
            )
          })
        }
      </Grid>
      <Grid item xs={11}><h4>Map Ports to Pins</h4></Grid>
      <Grid container item xs={11}>
        {
          new Array(nPorts).fill(0).map((p,pIdx)=>{
            return (
              <Grid item xs={1} style={{
                  outline: '0px solid red', 
                  paddingLeft: 10, paddingRight: 10, 
                  boxSizing: 'content-box',
                  marginBottom: 10
                }}>
                <label>
                  Port {pIdx}
                  <select style={{marginLeft: 10, marginRight: 10 }}>
                    {
                      new Array(32).fill(0).map((_o, oIdx)=>{
                        return (
                          <option>{oIdx}</option>
                        )
                      })
                    }
                  </select>
                </label>
              </Grid>
            )
          })
        }
      </Grid>
    </Grid>
  )
}
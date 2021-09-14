import React from 'react'
import { Grid } from '@material-ui/core'
import * as d3 from 'd3'

const nTrees = 8
const trees = new Array(nTrees).fill(0)
// console.log('trees', trees)

const scaleAngle = d3.scaleLinear().domain([0,nTrees]).range([0,Math.PI*2])
const radius = 160

export default function LayoutBase({}) {
  return (
    <Grid container item xs={12} justifyContent='center'>
      <Grid container item xs={4} >
        <Grid item xs={12}>
          <svg viewBox='0 0 512 512' width='100%' style={{ width: '100%', outline: '1px solid transparent' }}>
            <g transform='translate(256 256)'>
              {
                trees.map((tree,treeIndex)=>{
                  const x = radius * Math.sin(scaleAngle(treeIndex))
                  const y = radius * Math.cos(scaleAngle(treeIndex))
                  console.log(x,y,treeIndex)
                  return (
                    <circle cx={x} cy={y} r='50' stroke='#AAA' fill='#FFF'/>
                  )
                })
              }
            </g>
          </svg>
        </Grid>
      </Grid>
    </Grid>
  )
}
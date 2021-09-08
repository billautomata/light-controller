import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { Grid } from '@material-ui/core'

const sequenceLength = 20
const boxSize = 50

export default function SequenceProgrammer (props) {
  const [activeTrees, setActiveTrees] = useState(new Array(7).fill(0))
  const [outputs] = useState(new Array(7).fill(0))

  const [currentStep, setCurrentStep] = useState({value: -1})

  const [speedValuesTemporary, setSpeedValuesTemporary ] = useState(new Array(sequenceLength).fill(null))
  const [speedValues, setSpeedValues ] = useState(new Array(sequenceLength).fill(null))

  let currentSpeedValue = null
  function assignSpeedValue () {
    console.log('speed values', speedValues.join('\t'))
    if(speedValues[currentStep.value] === null) {
      return
    } else if(speedValues[currentStep.value] === 0) {
      return
    }    
    currentSpeedValue = speedValues[currentStep.value]  
    console.log('assign speed value -', 'current step', currentStep, 'current speed value', currentSpeedValue)
  }  

  const [sequenceValues, setSequenceValues ] = useState(new Array(sequenceLength).fill(0))

  speedValues[0] = 1000
  speedValues[4] = 50
  speedValuesTemporary[0] = 1000
  speedValuesTemporary[4] = 50

  sequenceValues[0] = 1
  sequenceValues[4] = 1
  sequenceValues[8] = 1
  sequenceValues[12] = 1
  sequenceValues[16] = 1

  const ref = React.createRef()
  let refSelection = null

  const colorsFn = d3.scaleOrdinal(d3.schemeCategory10)

  useEffect(()=>{
    console.log('\nuse effect', currentSpeedValue, refSelection)
    if(refSelection === null) {
      refSelection = d3.select(ref.current)
    }
    if (currentStep.value === -1) {
      doStep()
    }
  })
  
  function doStep () {    
    currentStep.value = (currentStep.value + 1) % sequenceLength    
    setCurrentStep(Object.assign({}, currentStep, { value: currentStep.value }))
    console.log('stepped current step', currentStep)
    assignSpeedValue()
    console.log('do step current speed value', currentSpeedValue)
    clearTimeout(window.t)
    window.t = setTimeout(doStep, currentSpeedValue)
  }

  return (
    <Grid container justifyContent='center'>
      <Grid container item xs={12} justifyContent='center' ref={ref}>
        {
          (()=>{
            return (
              activeTrees.map((tree,treeIdx)=>{
                return (
                  <span key={`tree_${treeIdx}`}>{tree} </span>
                )
              })
            )
          })()
        }
      </Grid>
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
                speedValues.map((o, index) => {
                  return (
                    <g key={`stepIndicator_${index}`} transform={`translate(${(boxSize*index)+1} 2)`}>
                      <rect x='0' y='0' width={boxSize-2} height={21} fill={ currentStep.value === index ? 'steelblue' : '#EEE' }/>
                    </g>
                  )
                })
              }
          </svg>
        </Grid>
        <Grid container item xs={1} alignItems='center' justifyContent='center' align='center'>
          <Grid item xs={12}>Length (ms)</Grid>
        </Grid>
        <Grid item xs={11}>
          <svg viewBox={`-1 0 1003 25`}
            style={{
              backgroundColor: '#DDD', 
              width: '99%', 
              margin: 'auto',
              marginTop: 0,
              marginBottom: 0
            }}>    
            {            
              speedValues.map((value, valueIndex) => {
                return (
                  <g key={`speedvalue_${valueIndex}`} transform={`translate(${(boxSize*valueIndex)+1} 2)`}>
                    <foreignObject width={boxSize-2} height='20'>
                      <input type='text' 
                        defaultValue={value}
                        value={value}
                        style={{ 
                          backgroundColor: 
                            speedValues[valueIndex] === null && speedValuesTemporary[valueIndex] === null ? '#FFF' : speedValuesTemporary[valueIndex] === speedValues[valueIndex] ? colorsFn(1) : colorsFn(3),
                          border: 'none', 
                          outline: 'none', 
                        }}
                        onChange={(event)=>{
                          console.log(event.target.value)
                          speedValuesTemporary[valueIndex] = Number(event.target.value)
                          setSpeedValuesTemporary(Object.assign([], speedValuesTemporary, speedValuesTemporary))
                          // speedValues[valueIndex] = event.target.value
                        }}
                        onKeyDown={(event)=>{
                          console.log(event.key)
                          if (event.key === 'Enter' || event.key === 'Tab') {
                            speedValues[valueIndex] = Number(speedValuesTemporary[valueIndex])
                            console.log(speedValues.join('\t'))
                            setSpeedValues(Object.assign([], [], speedValues))
                          }                        
                        }}/>
                    </foreignObject>
                  </g>
                )
              })
            }
          </svg>
        </Grid>
        {
          new Array(5).fill(0).map((channel,channelIdx)=>{
            return (
              <Grid container item xs={12} style={{outline: '0px solid red'}}>
                <Grid container item xs={1} alignItems='center' justifyContent='center' align='center'>
                  <Grid item alignItems='center' xs={12}>Channel {channelIdx+1}</Grid>
                </Grid>
                <Grid item xs={11}>
                  <svg viewBox={`0 0 1001 ${boxSize}`}
                  style={{
                    backgroundColor: '#000', 
                    width: '99%', 
                    margin: 'auto',
                  }}>
                    {
                      sequenceValues.map((value, valueIndex) => {
                        return (
                          <g key={`sequenceValues_${valueIndex}`} transform={`translate(${valueIndex*boxSize} 0)`}>
                            <rect x='1' y='1' 
                              width={boxSize-1} height={boxSize-2} 
                              fill={ value === 1 ? colorsFn(1) : '#DDD' }
                              style={{
                                cursor: 'pointer'
                              }}
                              onClick={()=>{                        
                                sequenceValues[valueIndex] = sequenceValues[valueIndex] === 0 ? 1 : 0
                                console.log(sequenceValues)
                                return setSequenceValues(Object.assign([], sequenceValues, sequenceValues))
                              }}
                              />
                          </g>
                        )
                      })
                    }
                </svg>
                </Grid>
              </Grid>
            )
          })
        }
    </Grid>
    </Grid>
  )
}


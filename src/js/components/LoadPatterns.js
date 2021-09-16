import { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Grid, Typography } from '@material-ui/core'
import { copyPattern, createPattern, deletePattern, loadPattern } from '../actions'

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    activePatternId: state.config.activePatternId,
    patterns: state.patterns,    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    copyPattern: payload => { dispatch(copyPattern(payload)) },
    createPattern: payload => { dispatch(createPattern(payload)) },
    deletePattern: payload => { dispatch(deletePattern(payload))},
    loadPattern: payload => { dispatch(loadPattern(payload)) }
  }
}

function LoadPatterns ({ activePatternId, copyPattern, createPattern, deletePattern, loadPattern, patterns }) {

  const [ patternsHalfwayToDeletion, setPatternsHalfway ] = useState([])

  return (
    <Grid container item spacing={0} alignItems='flex-start' justifyContent='center' >      
      <Grid container item xs={12} alignItems='flex-start' justifyContent='center' style={{ border: '1px solid #DDD' }} >
        <Grid item xs={12} style={{backgroundColor: '#777', marginBottom: 4}}><Typography style={{color: 'white', marginLeft: 10, textTransform:'uppercase', fontWeight:900, letterSpacing:'1px'}}>Patterns</Typography></Grid>
        <Grid container item xs={12} style={{maxHeight: '250px', overflow: 'hidden', overflowY: 'auto'}}>        
          {
            patterns.map((pattern,patternIdx)=>{
              return (
                <Grid key={'pattern-list-item-'+pattern.id} container item xs={12} sm={12} alignItems='center' justifyContent='space-around'
                  style={{ paddingBottom: 4 }}>
                  { patternsHalfwayToDeletion.indexOf(patternIdx) === -1 ? 
                      <>
                      <Grid item xs={10}
                        onClick={()=>{ loadPattern({id:pattern.id}) }} 
                        style={{              
                          backgroundColor: activePatternId === pattern.id ? 'steelblue' : 'white',
                          borderRadius: 2,
                          border: `1px solid ${ activePatternId === pattern.id ? 'steelblue': '#AAA' }`,
                          fontWeight: activePatternId === pattern.id ? 700 : 500,
                          color: activePatternId === pattern.id ? 'white' : 'black',
                          padding: 6, 
                          cursor: 'pointer'                  
                        }}>
                        { pattern.name }
                      </Grid>
                      <Grid item xs={1} align='center'
                        style={{ 
                          cursor: 'pointer'
                        }}
                        onClick={(event)=>{ 
                          event.stopPropagation()
                          const p = patternsHalfwayToDeletion
                          p.push(patternIdx)
                          setPatternsHalfway(Object.assign([], patternsHalfwayToDeletion, p))
                        }}>
                        &#10005;
                      </Grid>
                      </>
                  
                    : 
                    <>
                      <Grid item xs={4} align='center' style={{padding: '8px 0px'}}>
                        Sure?
                      </Grid>
                      <Grid item xs={4}>
                        <Button variant='contained' size='small'
                          onClick={()=>{ 
                            const p = patternsHalfwayToDeletion.filter(o=>o !== patternIdx)
                            setPatternsHalfway(Object.assign([], [], p))
                            deletePattern(pattern.id)
                          }}>Yes</Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button size='small'
                          onClick={(event)=>{
                            event.stopPropagation()
                            const p = patternsHalfwayToDeletion.filter(o=>o !== patternIdx)
                            setPatternsHalfway(Object.assign([], [], p))
                          }}
                        >No</Button>
                      </Grid>                                        
                    </> 
                  }
                </Grid>
              )
            })
          }
        </Grid>
        <Grid xs={12} container item spacing={3} alignItems='flex-start' align='center' justifyContent='center' style={{outline: '0px solid red', paddingTop: '12px', paddingBottom: '16px'}}>
          <Grid item>
            <Button size='small' variant='contained' color='primary'
              onClick={()=>{ createPattern() }}>NEW</Button>
          </Grid>
          <Grid item>
            <Button size='small' variant='outlined'
              onClick={()=>{ copyPattern(activePatternId) }}>COPY</Button>
          </Grid>
        </Grid>          
      </Grid>      
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadPatterns)


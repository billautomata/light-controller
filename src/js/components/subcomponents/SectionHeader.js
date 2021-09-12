import React from 'react'
import { Grid, Typography } from '@material-ui/core'

export default function SectionHeader (props) {
  return (
    <Grid item xs={12}><Typography variant='h6' style={{margin: '8px 16px'}}>{props.title}</Typography></Grid>      
  )
}
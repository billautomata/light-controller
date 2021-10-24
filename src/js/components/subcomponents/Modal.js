import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'

const mapStateToProps = (state, ownProps) => {
  return {
    props: ownProps
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

function Modal ({ props }) {
  return (
    <>
    <div style={{      
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 8, backgroundColor: 'rgba(0,0,0,0.8)',
      paddingTop: 64
    }}>
      <Grid container xs={12} justifyContent='center'>
        <Grid container item xs={11} 
          style={{ 
            backgroundColor: 'white',
            width: 1024, 
            minHeight: 64, 
            borderRadius: 1,
            border: '1px solid white',
            paddingBottom: 32 
          }}>
          { props.children }
        </Grid>
      </Grid>
    </div>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)



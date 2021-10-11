import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'

const mapStateToProps = (state, ownProps) => {
  return {
    props: ownProps
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

function ConfigSectionTitle ({ props }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        backgroundColor: '#EEE', 
        border: '1px solid #CCC',
        borderRadius: 0, 
        color: '#333', 
        fontWeight: 700,
        left: -10, 
        padding: '4px 12px', 
        position: 'absolute',       
        top: -37, 
      }}>
        <Typography variant='body2' style={{fontWeight: 700, letterSpacing: '0.5px'}}>{props.title}</Typography>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigSectionTitle)


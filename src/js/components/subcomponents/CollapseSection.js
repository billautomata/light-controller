import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    collapsed: ownProps.mode === 'pattern' ? state.uiState.sectionPatternCollapsed : ownProps.mode === 'playlist' ? state.uiState.sectionPlaylistCollapsed : state.uiState.sectionSongCollapsed
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

const size = 24
const lineHeight = 15
const strokeWidth = 12
const circleWidthMulti = 0.5
const color = '#AAA'

function CollapseSection ({ collapsed }) {
  return (
    <div style={{ position:'relative' }}>
      <div style={{ 
        position: 'absolute', 
        right: 14, top: 2,
        // bottom: -12, 
        cursor: 'pointer',
        width: size, height: size, 
        // backgroundColor: 'black' 
      }}>
        <svg viewBox={`0 0 100 100`} width={size} height={size} style={{ transform: `rotateZ(${ collapsed ? 0 : 180 }deg)` }}>
          <circle cx='50' cy='50' r='42' stroke={color} fill='none' strokeWidth={strokeWidth*circleWidthMulti}/>
          <g transform={`translate(0 ${ collapsed ? 0 : -5 })`}>
          <line x1='35' x2='50' y1={50+(0.5*lineHeight)} y2={50-(0.5*lineHeight)} stroke={color} strokeWidth={strokeWidth} strokeLinecap='round'/>
          <line x1='65' x2='50' y1={50+(0.5*lineHeight)} y2={50-(0.5*lineHeight)} stroke={color} strokeWidth={strokeWidth} strokeLinecap='round'/>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapseSection)


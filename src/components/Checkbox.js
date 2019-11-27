import React, { Component } from 'react'
import '../css/animations.css'

class Checkbox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isChecked: null
    }
  }

  render () {
    const { label } = this.props
    const { isChecked } = this.state
    const checkboxStyle = {
      color: '#000',
      fontFamily: '"Lato", sans-serif',
      fontSize: '20px',
      textAlign: 'right',
      fontWeight: 'regular',
      padding: '15px',
      margin: '5px',
      borderRadius: '100px',
      border: '2px solid #6fc48c'
    }

    const checkboxRow = {
      display: 'flex',
      alignItems: 'center',
      color: '#000'
    }

    const circleStyle = {
      width: 20,
      height: 20,
      position: 'absolute',
      marginLeft: 12,
      borderRadius: '100%',
      backgroundColor: '#6fc48c',
      animationDuration: '0.3s',
      animationName: isChecked ? 'bounceIn' : 'bounceOut',
      animationFillMode: 'forwards',
      pointerEvents: 'none'
    }

    const labelStyle = {
      display: 'flex',
      marginLeft: 5,
      outline: 'none',
      height: '100%',
      userSelect: 'none',
      alignItems: 'center',
      flexGrow: 1
    }

    const toggleCheckboxChange = () => {
      this.setState({
        isChecked: !this.state.isChecked
      })
      this.props.onPress(!this.state.isChecked)
    }

    return (
      <div style={{ ...checkboxRow, ...this.props.style }}>
        <input
          type='checkbox'
          id={label}
          style={checkboxStyle}
          checked={this.state.isChecked}
          onChange={toggleCheckboxChange}
        />
        <div style={circleStyle} />
        <label style={labelStyle} htmlFor={label}>{label}</label>
      </div>
    )
  }
}

export default Checkbox

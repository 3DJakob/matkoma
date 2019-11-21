import React, { Component } from 'react'

class Checkbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChecked: false
        }
    }

    toggleCheckboxChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });

    }

    render() {
        const { label } = this.props;
        const { isChecked } = this.state;
        console.log(isChecked);
        let checkboxStyle = {
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

        if(isChecked){
            checkboxStyle.backgroundColor = '#6fc48c'
        }else{
            checkboxStyle.backgroundColor = '#fff'
        }

        const checkboxRow = {
            display: 'flex',
            alignItems: 'center',
            padding: '20px',
            margin: 'auto',
            color: '#000'
        }

        return (
            <div className='checkbox' style={checkboxRow}>
                    <input
                        type='checkbox'
                        value={label}
                        style={checkboxStyle}
                        checked={this.state.isChecked}
                        onChange={this.toggleCheckboxChange}
                    />
                    {label} 
            </div>
        )
    }
}

export default Checkbox
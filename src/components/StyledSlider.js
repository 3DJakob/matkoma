import React from 'react'
import Slider from '@material-ui/core/Slider'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

function StyledSlider ({ onChange, initialValues = [0, 60] }) {
  const [timerange, setTimerange] = React.useState(initialValues)
  const maxTime = 100
  const infTime = 10000 // "infinite" number of minutes, set when slider is dragged to max

  const changeTime = (event, newTime) => {
    setTimerange(newTime)
    onChange(newTime)

    if (timerange[1] === maxTime) {
      onChange([timerange[0], infTime])
    }
    console.log(timerange)
  }

  const sliderColor = '#6FC58C'
  const sliderHeight = 8
  const sliderTransform = 'translateY(3px)'
  const sliderBorderRadius = 4
  const thumbDiameter = 20

  const sliderTheme = createMuiTheme({
    overrides: {
      MuiSlider: {
        root: {
          width: 'calc(100% - ' + thumbDiameter / 2 + 'px)',
          paddingTop: 5
        },
        thumb: {
          color: sliderColor,
          width: thumbDiameter,
          height: thumbDiameter,
          transform: 'translateY(' + (thumbDiameter / 8) + 'px)'
        },
        track: {
          color: sliderColor,
          height: sliderHeight,
          transform: sliderTransform,
          borderRadius: sliderBorderRadius
        },
        rail: {
          color: sliderColor,
          height: sliderHeight,
          transform: sliderTransform,
          borderRadius: sliderBorderRadius
        },
        valueLabel: {
          left: -6
        }
      }
    }
  })

  const valueContainerStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex'
  }

  const valueTextStyle = {
    color: '#4E4E4E',
    fontFamily: 'Lato, sans-serif',
    fontSize: 14,
    fontWeight: 'bold',
    margin: 0
  }

  return (
    <div>
      <div style={valueContainerStyle}>
        <p style={valueTextStyle}>{timerange[0]} min</p>
        <p style={valueTextStyle}>{timerange[1]}{timerange[1] === maxTime ? '+' : ''} min</p>
      </div>
      <ThemeProvider theme={sliderTheme}>
        <Slider
          value={timerange}
          onChange={changeTime}
        />
      </ThemeProvider>
    </div>

  )
}

export default StyledSlider

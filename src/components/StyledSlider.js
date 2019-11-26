import React from 'react'
import Slider from '@material-ui/core/Slider'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

function StyledSlider ({ onChange }) {
  const [timerange, setTimerange] = React.useState([20, 80])

  const changeTime = (event, newTime) => {
    setTimerange(newTime)
    console.log(timerange)
    onChange(newTime)
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
  return (
    <ThemeProvider theme={sliderTheme}>
      <Slider
        value={timerange}
        onChange={changeTime}
        valueLabelDisplay='auto'
      />
    </ThemeProvider>
  )
}

export default StyledSlider

import styled from 'styled-components'

import ayasun from '../theme'

const primaryFont = ayasun.ayasun.fonts.primary

const HeadMSG = styled.h3`
  text-align: center;
  font-family: ${({ font = primaryFont }) => font};
  margin: 15px;
  line-height: 30px;
`

const ActionButton = styled.button`
  margin: 15px;
  font-family: ${({ font = primaryFont }) => font};
  padding: 8px;
  border-radius: 5px;
  height: 40px;
  align-self: flex-end;
  margin-bottom: 20px;
`

const Logo = styled.img`
  height: ${({ height = 100 }) => `${height}px`};
  justify-self: center;
  width: ${({ width = 100 }) => `${width}px`};
  margin: 5px;
  grid-area: logo;
`

const ActionText = styled.button`
  margin: 5px;
  font-family: ${({ font = primaryFont }) => font};
  font-size: ${({ size = 13 }) => `${size}px`};
  line-height: ${({ lineHeight = 16 }) => `${lineHeight}px`};
  padding: 0px;
  border-width: 0px;
  background: none;
  align-self: flex-start;
  margin: ${({ margin = 15 }) => `${margin}px`};
  margin-left: ${({ marginLeft = 15 }) => `${marginLeft}px`};
  color: ${({ color = 'blue' }) => color};
`

const Description = styled.p`
  font-family: ${({ font = primaryFont }) => font};
  text-align: center;
  font-size: ${({ size = 13 }) => `${size}px`};
  line-height: ${({ lineHeight = 16 }) => `${lineHeight}px`};
  margin: ${({ margin = 15 }) => `${margin}px`};
`

const NumberInput = styled.input`
  font-family: ${({ font = primaryFont }) => font};
  height: 35px;
  margin: ${({ margin }) => margin || '15px'};
  border-radius: 5px;
  border-color: ${({ hasError }) => (hasError ? 'red' : '#626368')};
`

const NumberBox = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
`

const TextArea = styled.textarea`
  display: grid;
  margin: ${({ margin }) => margin || '15px'};
  font-family: ${({ font = primaryFont }) => font};
  border-radius: 5px;
  height: 100px;
  border-color: ${({ hasError }) => (hasError ? 'red' : '#626368')};
`

const Note = styled.label`
  font-family: ${({ font = primaryFont }) => font};
  font-size: 11px;
  line-height: 16px;
  margin: 0px;
  color: ${(props) => props.color};
`

export {
  HeadMSG,
  Note,
  ActionButton,
  Description,
  NumberInput,
  ActionText,
  NumberBox,
  TextArea,
  Logo,
}

import React from 'react'
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'
import { Clock } from 'react-feather'
import styled from 'styled-components'
import colors from '../../../constants/colors'
import { Center } from '../../shared'
import { Row } from '../../shared/layout'
import { Text } from '../../texts'
import { Turkish } from 'flatpickr/dist/l10n/tr'
import '../../../styles/vendors/flat-picker.css'

const InputContainer = styled.div<Pick<IProps, 'color'>>`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${({ color }) => (color ? color : colors.white.middle)};

  @media (max-width: 1100px) {
    height: 40px;
  }
`

const InputLabel = styled.div`
  @media (max-width: 1100px) {
    display: none;
  }
`

const InputLayout = styled(Row)``

const InputIcon = styled.div`
  ${Center}
  width: 40px;
  height: 40px;
  color: ${({ color }) => (color ? color : colors.white.middle)};
`
interface IProps {
  name: string
  labelText?: string | null
  placeholder?: string
  value: string
  disabled?: boolean
  color: string
  onValueChange: (value: Date[], dateText: string) => void
}

export interface IStyledProps {
  disabled?: boolean
}

const InputDatePicker: React.FC<IProps> = ({ name, placeholder, value, disabled, labelText, color, onValueChange }) => {
  return (
    <InputContainer color={color}>
      <InputLabel>{labelText && <Text color={color}>{labelText}</Text>}</InputLabel>
      <InputLayout>
        <Flatpickr
          name={name}
          options={{
            enableTime: false,
            dateFormat: 'd/F/Y',
            locale: Turkish
          }}
          disabled={disabled}
          onChange={onValueChange}
          placeholder={placeholder}
          value={value !== '' ? +value : null}
          color={color}
          style={{ color: color }}
        />
        <InputIcon color={color}>
          <Clock size={20} />
        </InputIcon>
      </InputLayout>
    </InputContainer>
  )
}

export default InputDatePicker

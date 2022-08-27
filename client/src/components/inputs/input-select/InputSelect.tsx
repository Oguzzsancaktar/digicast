import React from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { IOption } from '../../../models'
import { Column } from '../../shared/layout'
import { Text } from '../../texts'

interface IProps {
  labelText?: string
  placeholder: string
  selectedOptionValue: string
  color: string
  isDisabled?: boolean
  isLoading?: boolean
  isClearable?: boolean
  isSearchable?: boolean
  isMulti?: boolean
  validationError?: boolean
  onValueChange: ((event: React.ChangeEvent) => void) | ((option: IOption) => void) | any
  name: string
  options: IOption[]
  menuPlacement?: 'auto' | 'top' | 'bottom'
}

const InputLabel = styled.div`
  @media (max-width: 1100px) {
    display: none;
  }
`

const InputSelect: React.FC<IProps> = ({
  selectedOptionValue,
  placeholder,
  validationError,
  isDisabled,
  isLoading,
  isClearable,
  isSearchable,
  isMulti,
  name,
  labelText,
  onValueChange,
  options,
  menuPlacement,
  color
}) => {
  const selectedValues = options?.filter(option => option.value === selectedOptionValue)

  const customStyles = {
    singleValue: (base, state) => ({
      ...base,
      background: 'transparent',
      borderColor: color,
      color: color
      // '&:hover': {
      //   borderColor: state.isFocused ? 'red' : 'blue'
      // }
    }),
    control: (base, state) => ({
      ...base,
      background: 'transparent',
      borderColor: color,
      boxShadow: state.isFocused ? null : null,
      color: color,
      borderRadius: '0px',
      border: 'none',
      borderBottom: `1px solid ${color}`

      // '&:hover': {
      //   borderColor: state.isFocused ? 'red' : 'blue'
      // }
    })
  }

  return (
    <Column>
      <InputLabel>{labelText && <Text color={color}>{labelText}</Text>}</InputLabel>

      <Select
        placeholder={placeholder}
        className={`react-basic-single ${validationError && 'input-validation-error'}`}
        classNamePrefix="select"
        options={options}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name={name}
        isMulti={isMulti}
        onChange={onValueChange}
        defaultValue={selectedValues}
        value={selectedValues?.length === 1 ? selectedValues[0] : selectedValues}
        menuPlacement={menuPlacement ? menuPlacement : 'auto'}
        styles={customStyles}
      />
    </Column>
  )
}

export default InputSelect

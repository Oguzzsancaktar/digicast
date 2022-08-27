import styled from 'styled-components'
import colors from '../../../constants/colors'
import { Center } from '../../shared'
import { Row } from '../../shared/layout'
import { Text } from '../../texts'

interface IProps {
  children?: React.ReactNode
  name: string
  labelText?: string | null
  type?: string
  placeholder?: string
  validationError?: boolean
  value?: string | number
  isPasswordVisible?: boolean
  disabled?: boolean
  color?: string

  onValueChange?: (event: React.ChangeEvent<HTMLInputElement>) => void

  handleVisibility?: (isVisible: boolean) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

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

const InputLayout = styled(Row)<Pick<IProps, 'color'>>``
const InputIcon = styled.div`
  ${Center}
  width: 40px;
  height: 40px;
  color: ${({ color }) => (color ? color : colors.white.middle)};
`
const Input = styled.input<Pick<IProps, 'color'>>`
  color: ${({ color }) => (color ? color : colors.white.middle)};
  background-color: transparent;
  padding: 0.5rem 0.3rem;
  width: calc(100% - 40px);

  &::placeholder {
    color: ${({ color }) => (color ? color : colors.white.middle)}99;
  }
`

const InputWithIcon: React.FC<IProps> = ({
  children,
  name,
  labelText,
  type = 'text',
  placeholder,
  onValueChange,
  color,
  validationError,
  isPasswordVisible,
  disabled,
  handleVisibility
}) => {
  return (
    <InputContainer color={color}>
      <InputLabel>{labelText && <Text color={color}>{labelText}</Text>}</InputLabel>
      <InputLayout>
        <Input color={color} name={name} placeholder={placeholder} type={type} onChange={onValueChange} />
        <InputIcon color={color}>{children}</InputIcon>
      </InputLayout>
    </InputContainer>
  )
}

export default InputWithIcon

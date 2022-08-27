import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'
import { IComponentProps } from '../../models'

export interface IProps extends IComponentProps {
  content?: string
  disabled?: boolean
  color?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const ButtonSC = styled.button<Pick<IProps, 'width' | 'height' | 'disabled' | 'color' | 'padding'>>`
  font-family: 'Chillax-Regular';
  cursor: ${({ disabled }) => (disabled ? 'disabled' : 'pointer')};
  border-radius: 0.3rem;
  transition: all 0.3s ease-in-out;
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};
  padding: ${({ padding }) => (padding ? padding : '0.4rem 0.6rem')};
  color: ${colors.white.light};
  border: 1px solid ${({ color }) => (color ? color : colors.secondary.middle)};

  background: linear-gradient(
    45deg,
    ${({ disabled, color }) => (disabled ? colors.gray.middle : color ? color : colors.secondary['dark'])},
    ${({ disabled, color }) => (disabled ? colors.gray.middle : color ? color : colors.secondary['light'])}
  );
  background-size: 200% 100%;

  &:hover {
    background-position: 100% 0;
  }

  &:disabled {
    cursor: wait;
    background-color: ${({ disabled }) => disabled && colors.gray.middle};
  }
`

const Button: React.FC<IProps> = ({ children, disabled, width, color, ...rest }) => {
  return (
    <ButtonSC disabled={disabled} width={width} color={color} type="submit" {...rest}>
      {children}
    </ButtonSC>
  )
}

export default Button

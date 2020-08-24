import React, { InputHTMLAttributes } from 'react'

import { BiCheck } from 'react-icons/bi'

import { CheckboxContainer, HiddenCheckbox, StyledCheckbox } from './styles'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ className, checked, ...rest }) => {
  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox type="checkbox" checked={checked} {...rest} />
      <StyledCheckbox checked={checked}>
        <BiCheck size={50} color={checked ? "#FFF" : "#A9A9A9"} />
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

export default Checkbox
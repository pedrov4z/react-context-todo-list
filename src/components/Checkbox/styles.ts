import styled from 'styled-components'
import { CheckboxProps } from '.'

export const CheckboxContainer = styled.div`
  height: 100%;
  width: 5rem;
`
export const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const StyledCheckbox = styled.div<CheckboxProps>`
  height: 100%;
  width: 100%;
  background: ${({ checked }) => checked ? '#00a152' : 'gray' };

  border-top-left-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;

  cursor: pointer;

  transition: background-color .2s;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${({ checked }) => checked ? '#00e676' : '#999999' };
  }
`
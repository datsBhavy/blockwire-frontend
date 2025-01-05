import { Accessor } from "solid-js"
import { css } from "solid-styled-components"
import { Theme } from "../context/ThemeContext"

export const Grey = '#1E201E'
export const LighterDark = "#191919"
export const LightGrey = '#3C3D37'
export const Dark = '#0C0C0C'
export const Light = '#F3F3E0'
export const GreyishBlue = '#758694'
export const Violet = '#4535C1'
export const Blue = '#478CCF'
export const LightBlue = '#36C2CE'
export const Turquoise = '#77E4C8'
export const DarkYellow = '#FFB200'
export const MediumPurple = '#2E236C'
export const DarkPurple = '#2E236C'
export const DarkerPurple = '#17153B'
export const PrimaryBg = '#73EC8B'
export const HoverColor = '#DA0037'
export const SecondaryBg = '#4379F2'


export const primaryModalClass = (theme: Accessor<Theme>) => css`
    overflow-y: auto!important;
    .modal-content {
    color: ${theme()?.textColor};
  background-color: ${theme()?.backgroundColor}!important;
  padding: 1rem;
  .header-text {
      
  }

  input {
      color: ${theme()?.textColor}!important;
      border-bottom: 1px solid ${theme()?.textColor};
  }
  label {
      color: ${theme()?.textColor};
  }
}
  `
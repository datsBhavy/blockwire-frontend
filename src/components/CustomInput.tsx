import { Style } from "@solidjs/meta";
import { Component, createSignal, JSX, Show } from "solid-js";
import { Light, Violet } from "../constants/styles";
import { useTheme } from "../context/ThemeContext";

interface CustomInputProps {
    placeholder?: string;
    label: string;
    type?: string;
    class?: string
    style?: JSX.Element
    variant?: 'violet'
    name?: string
    value?: string
    onChange?: (e: InputEvent) => void
  }
  
  const CustomInput: Component<CustomInputProps> = (props) => {
    let inputRef: HTMLInputElement;
    const {theme} = useTheme()
    const [isFocused, setIsFocused] = createSignal(false);
  
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
      if (inputRef?.value.trim() === "") {
        setIsFocused(false);
      }
    };
  
    return (
      <>
        <Style>{`
          .custom-input-wrapper {
              width: 100%;
            display: flex;
            flex-direction: column;
            margin-bottom: 3rem;
            position: relative;
            justify-content: center;
          font-family: "Afacad Flux", sans-serif;
          }
  
          .custom-input {
            all: unset; /* Resets all inherited and default styles */
            width: 100%;
            padding: 0rem 0rem 1rem 0;
            font-size: 2rem;
            line-height: 2rem;
            border-bottom: 1px solid ${Light};
            transition: border-color 0.3s ease;
            padding-bottom: .5rem!important;
          }
  
          .custom-input:focus {
            border-bottom-color: ${theme()?.buttonBg};
                  border-bottom: 1px solid ${theme()?.buttonBg}!important;
          }
  
          .custom-input-label {
            position: absolute;
            top: 40%;
  
            left: 0rem;
            transform: translateY(-50%);
            font-size: 2.2rem;
            color: ${Light};
            pointer-events: none;
            transition: all 0.3s ease;
            font-weight: 500;
            opacity: .7;
          }
  
          .custom-input-wrapper.focused .custom-input-label,
          .custom-input:not(:placeholder-shown) + .custom-input-label {
            top: -0.5rem;
            font-size: 1.1rem;
            text-transform: uppercase;
              color: ${theme()?.buttonBg};
  
          }
  
          .custom-input:focus,
               .custom-input-wrapper.focused, .custom-input:not(:placeholder-shown), custom-input {
                  border-bottom: 1px solid ${theme()?.buttonBg};
                  font-weight: 500;
               }
        `}</Style>

        <Show when={props.variant === 'violet'}>
            {props.style}
        </Show>
        <div
          classList={{
            'custom-input-wrapper': true,
            'focused': isFocused(),
            [props.class ?? ""]: true,
        }}
          onClick={() => inputRef?.focus()}
        >
          <input
            classList={{
                "custom-input": true,
            }}
            name={props.name ?? ''}
            ref={(el) => (inputRef = el)}
            type={props.type ?? "text"}
            placeholder=" "
            onFocus={handleFocus}
            value={props.value ?? ''}
            onBlur={handleBlur}
            onInput={props.onChange}
          />
          <label class="custom-input-label">{props.label}</label>
        </div>
      </>
    );
  };

  export default CustomInput
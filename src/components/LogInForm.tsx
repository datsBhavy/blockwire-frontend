import { A, useNavigate, useSearchParams } from "@solidjs/router";
import CustomInput from "./CustomInput";
import { Style } from "@solidjs/meta";
import { Component, createEffect, createSignal } from "solid-js";
import { useAppContext } from "../context/AppContext";
import { Light, Turquoise, Violet } from "../constants/styles";
import { useTheme } from "../context/ThemeContext";
import { baseURL } from "../constants/constants";

interface LoginFormProps {
    onLogin: () => void;
}
const LogInForm:Component<LoginFormProps> = (props) => {
    const {user, mutateUser} = useAppContext()
    const {theme} = useTheme()
  let formRef: HTMLFormElement;
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  async function handleSubmit(e: Event) {
    e.preventDefault();

    const data = {
      identifier: email(),
      password: password(),
    };

    try {
      const response = await fetch(`${baseURL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Include cookies for session management
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result)
        if (result.user) {
            mutateUser(result.user)
            props.onLogin?.()
        }
        // console.log("Login successful:", );
        // mutateUser(result.user)
        // props.onLogin?.()
        // Redirect or update UI after login
      } else {
        const error = await response.json();
        console.error("Login failed:", error.message);
        alert(error.message || "Failed to log in");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  }

  createEffect(() => {
    if (user()) {
        navigate("/dashboard")
    }
  })

  return (
    <>
      <Style>{`
            .header-text {
                font-size: 5rem;
            }

        .checkbox-container {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            margin-bottom: .5rem;
          }
            .custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 24px; /* Adjust size */
  height: 24px; /* Adjust size */
  border: 2px solid ${Light}; /* Border color */
  border-radius: 0px; /* Optional: for rounded corners */
  background-color: transparent;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

input {
    color: ${Light};
}

.custom-checkbox:checked {
  background-color: #3498db; /* Fill color when checked */
  border-color: #3498db; /* Change border color when checked */
}

.custom-checkbox:checked::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 12px; /* Adjust for inner checkmark size */
  height: 12px;
  background-color: white;
  border-radius: 2px; /* Match checkbox border-radius */
}

.primary-color-text {
    color: ${theme()?.buttonText}!important;
  }
    button {

                    padding: .8rem 2rem;
                    border-radius: 40px;
                    border: none;
                    text-transform: uppercase;
                    font-weight: bold;
                    font-size: 1.3rem!important;
                    }

                       & h1 {
            
            font-family: "Afacad Flux", sans-serif;
            font-weight: 500;

            }

            & .submit-button {
            background-color: ${theme()?.buttonBg};  
            color: white;
            width: 100%;
    }
       `}</Style>
      <div class="">
        <h1 class="mb-5 header-text">Log In</h1>
        <form ref={(el) => (formRef = el)} onSubmit={handleSubmit}>
          <CustomInput
            label="Email"
            onChange={(e: InputEvent) => setEmail((e.target as HTMLInputElement).value)}
          />
          <CustomInput
            label="Password"
            type="password"
            onChange={(e: InputEvent) => setPassword((e.target as HTMLInputElement).value)}
          />
          <div class="d-flex justify-content-between align-items-center mb-5">
            <label class="checkbox-container mb-0">
              <input type="checkbox" class="custom-checkbox" />
              <span class="primary-color-text text-uppercase">Stay Logged In</span>
            </label>

            <A href="/forgot-password" class="primary-color-text text-uppercase">
              Forgot Password?
            </A>
          </div>
          <button class="submit-button primary-buton" type="submit">
            Log In
          </button>
        </form>
      </div>
    </>
  );
};
export default LogInForm;
import { useNavigate, useParams, useSearchParams } from "@solidjs/router";
import { VoidComponent, createEffect, createSignal } from "solid-js";
import CustomInput from "./CustomInput";
import { Style } from "@solidjs/meta";
import { useAppContext } from "../context/AppContext";
import { baseURL } from "../constants/constants";

const SignUpForm: VoidComponent = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {user, refetchUser} = useAppContext()
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = createSignal({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [error, setError] = createSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${baseURL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Allow cookies to be sent

        body: JSON.stringify(formData()),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "An error occurred");
      }
      refetchUser()
      // Optionally, redirect or clear form after submission
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

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
        `}</Style>
    <div class="mb-5">
      <h1 class="mb-5 header-text">Sign Up</h1>
      {error() && <p class="error-text">{error()}</p>}
      <form onSubmit={handleSubmit}>
        <CustomInput
          label="First Name"
          onChange={(e) => handleInputChange("firstName", e.target.value)}
        />
        <CustomInput
          label="Last Name"
          onChange={(e) => handleInputChange("lastName", e.target.value)}
        />
        <CustomInput
          label="E-mail"
          onChange={(e) => handleInputChange("email", e.target.value)}
          type="email"
        />
        <CustomInput
          label="Phone #"
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          type="tel"
        />
        <CustomInput
          label="Password"
          onChange={(e) => handleInputChange("password", e.target.value)}
          type="password"
        />
        <CustomInput
          label="Confirm Password"
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          type="password"
        />
        <button class="submit-button" type="submit" disabled={isSubmitting()}>
          {isSubmitting() ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
    </>
  );
};

export default SignUpForm;
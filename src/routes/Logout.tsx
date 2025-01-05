import { onMount, createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAppContext } from "../context/AppContext";
import { baseURL } from "../constants/constants";

const Logout = () => {
  const [loading, setLoading] = createSignal(true);
  const [message, setMessage] = createSignal("");
  const navigate = useNavigate();
    const {refetchUser, user} = useAppContext()
  const handleLogout = async () => {
    try {
      const response = await fetch(`${baseURL}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // Ensures cookies are sent with the request
      });

      if (response.ok) {
        setMessage("You have been successfully logged out.");
        refetchUser()
        window.location.reload()
        setLoading(false);

        // Redirect after a delay
        setTimeout(() => {
          navigate("/"); // Redirect to the home page or login
        }, 2000);
      } else {
        throw new Error("Failed to log out.");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      setMessage("An error occurred while logging out. Please try again.");
      setLoading(false);
    }
  };

  createEffect(() => {
    if (!user()) {
        navigate("/");
    }
  })

  onMount(() => {
    handleLogout();
  });

  return (
    <div class="logout-container">
      {loading() ? (
        <p>Loading... Logging you out...</p>
      ) : (
        <p>{message()}</p>
      )}
    </div>
  );
};

export default Logout;
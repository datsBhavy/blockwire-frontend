import { useNavigate } from '@solidjs/router';
import { createEffect, onMount } from 'solid-js';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

const ProtectedRoute = (props) => {
  const {user, loaded} = useAppContext()
  const navigate = useNavigate();
  const {setNavbarState} = useTheme()

  // onMount(() => {
  //   setNavbarState('light')
  // })

  // createEffect(() => {
  //   console.log(loaded.user)
  //   if (!user() && loaded.user) {
  //     navigate('/log-in'); // Redirect to login page if not authenticated
  //     return null;
  //   }
  // })

  return <>{props.children}</>;
};

export default ProtectedRoute;
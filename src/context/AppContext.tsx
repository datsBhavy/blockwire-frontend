import { createContext, useContext, createSignal, Accessor, ParentComponent, Setter, createResource, createEffect, Resource } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";
import { fetchUserSession } from "../utils/fetcher";

// Define types for AppContext
type AppContextType = {
    showing: Record<string, boolean>;
	setShowing: SetStoreFunction<Record<string, boolean>>;
  user: Resource<Record<string, any>>;
  mutateUser: Setter<Record<string, any> | undefined>;
  refetchUser: () => void;
  loaded: Record<string, boolean>;
  setLoaded: SetStoreFunction<Record<string, boolean>>;
};

// Default values for app settings
const defaultAppSettings = {
  language: "en",
  notificationsEnabled: true,
};

// Default values for the context
const defaultContext: AppContextType = {} as AppContextType;

// Create the context
const AppContext = createContext<AppContextType>(defaultContext);

// Create the AppContext Provider
export const AppProvider: ParentComponent = (props) => {
  const [showing, setShowing] = createStore<Record<string, boolean>>({})
  const [loaded, setLoaded] = createStore<Record<string, boolean>>({
    user: false
  })

  const [user, { mutate: mutateUser, refetch: refetchUser }] = createResource<Record<string, any>>(async () => {
    setLoaded("user", false);
    try {
      const user = await fetchUserSession();
      if (user) {
        setLoaded("user", true);
        return user;
      } else {
        setLoaded("user", true);
        return undefined;
      }
      
    } catch (error) {
      setLoaded("user", true);
      // Optionally, you could return a specific value or throw the error further
      return undefined; // Return undefined to indicate an error
    }
  });

  // const [user, mutateUser] = createResource<Record<string, any>>({});
  return (
    <AppContext.Provider
      value={{
        showing,
        setShowing,
        user,
        mutateUser,
        refetchUser,
        loaded,
        setLoaded
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);
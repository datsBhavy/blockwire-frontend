import { createEffect, createResource, createSignal, lazy, onMount, Show, Suspense, type Component } from 'solid-js';
import { Routes, Route, A, useParams, Navigate } from '@solidjs/router';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AppProvider, useAppContext } from './context/AppContext';
import Navbar from './components/navbar/Navbar';
import Preloader from './components/preloader/Preloader';
import { css } from 'solid-styled-components';
import Breadcrumb from './components/Breadcrumb';
import { Container } from 'solid-bootstrap';
import AboutCarousel from './components/aboutSection/AboutCarousel';
import KeyOpinionLeaders from './routes/about/key-opinion-leaders';
import ModalWrapper from './components/ModalWrapper';
import Blog from './components/blog/blog';
import Blogs from './components/blog/blogs';
import BlogLanding from './components/blog/BlogLanding';
import { Dark, DarkerPurple, DarkPurple, DarkYellow, Light, PrimaryBg, SecondaryBg, Turquoise, Violet } from './constants/styles';
import ContactUs from './routes/ContactUs';
import SignUp from './routes/SignUp';
import LogIn from './routes/LogIn';
import Products from './routes/products';
import Footer from './components/footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './routes/profile';
import Logout from './routes/Logout';
import Dashboard from './routes/Dashboard';
import Influencers from './routes/influencers';
import BookMeeting from './routes/book-meeting';
import Nav from './components/Nav/Nav';
import Work from './components/Work/Work';

// Lazy-load your pages
const Home = lazy(() => import('./routes/index'));
const About = lazy(() => import('./routes/about'));
const Services = lazy(() => import('./routes/services'));
const NotFound = lazy(() => import('./routes/[...404]'))
const InfluencerDetails = lazy(() => import('./routes/about/[...name]'))
const MarketAnalysis = lazy(() => import ('./routes/MarketAnalysis'))

const App: Component = () => {
  const {user, loaded} = useAppContext()
  // Simulate a loading screen

  createEffect(() => {
    console.log(user())
  })

  return (
    <ThemeProvider>
      {/* <Show when={loaded?.user} fallback={
        <Preloader isLoaded={() => false} />
      }> */}

          {/* <Navbar /> */}
          <Nav />
          <AppRoutes />
          <Footer />
      {/* </Show> */}
    </ThemeProvider>
  );
};

export default App;

export const appCSS = (theme: () => Record<string, string>) => css`
.no-scroll {
  overflow: hidden; /* Prevents scrolling */
  height: 100%;     /* Ensures the height is contained */
  width: 100%;      /* Ensures the width is contained */
  position: relative; /* Optional for consistent layout */
}

h1, h2, h3, h4, h5, h6 {
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings:
    "slnt" 0;
}

button {

                    padding: .8rem 2rem;
                    border-radius: 8px;
                    border: none;
                    text-transform: uppercase;
                    font-weight: bold;
                    font-size: 1.3rem!important;
                    }

                       & h1 {
            
            font-weight: 500;

            }

            & .submit-button {
            background-color: ${theme()?.buttonBg};  
            color: white;
            width: 100%;
    }
  .pt-6 {
    padding-top: 100px!important;
  }

    .primary-modal .modal-content {
  background-color: ${theme()?.backgroundColor}!important;
  padding: 1rem;
  .header-text {
      color: ${Light};
  }
}

  .border-right-primary {
    border-right: 1px solid ${theme()?.buttonBg};
  }
  .border-left-primary {
    border-left: 1px solid ${theme()?.buttonBg};
  }
  .border-top-primary {
    border-top: 1px solid ${theme()?.buttonBg};
  }
  .border-bottom-primary {

    border-bottom: 1px solid ${theme()?.buttonBg};
  }

  .border-right-secondary {
    border-right: 1px solid ${theme()?.buttonBg1};
  }

  .border-left-secondary {
    border-left: 1px solid ${theme()?.buttonBg1};
  } 

  .border-top-secondary {
    border-top: 1px solid ${theme()?.buttonBg1};
  }

  .border-bottom-secondary {
    border-bottom: 1px solid ${theme()?.buttonBg1};
  }

  .border-right-dark {
    border-right: 1px solid ${Dark};
  }
  
  .border-left-dark {
    border-left: 1px solid ${Dark};
  }

  .border-top-dark {
    border-top: 1px solid ${Dark};
  }

  .border-bottom-dark {
    border-bottom: 1px solid ${Dark};
  }

.error-text {
  color: red!important;
}

primary-text {
  color: ${PrimaryBg}!important;
}

secondary-text {
  color: ${SecondaryBg}!important;
}

    .primary-button {
      display: flex;
          align-items: center;
                      background-color: ${theme()?.buttonBg};

                      color: ${theme()?.buttonText};
                      padding: .8rem 2rem;
                      border-radius: 8px;
                      border: 1px solid ${theme()?.buttonBg};
                      text-transform: uppercase;
                      font-weight: bold;
                      font-size: 1rem!important;
                      text-decoration: none;
                      transition: all 0.3s ease, color 0.3s ease;


                      &:hover {
                        background-color: transparent;
                        color: ${theme()?.buttonBg};
                      }
    }

    .secondary-color-button {
          display: flex;
          align-items: center;
                      background-color: ${theme()?.buttonBg1};

                      color: ${Light};
                      padding: .8rem 2rem;
                      border-radius: 8px;
                      border: 1px solid ${theme()?.buttonBg1};
                      text-transform: uppercase;
                      font-weight: bold;
                      font-size: 1rem!important;
                      text-decoration: none;
                      transition: all 0.3s ease, color 0.3s ease;


                      &:hover {
                        background-color: transparent;
                        color: ${theme()?.buttonBg1};
                      }
    }

    .secondary-button {
          display: flex;
          align-items: center;
          background-color: transparent;
                 padding: .8rem 2rem;
                      border-radius: 8px;
          border: 1px solid ${theme()?.buttonBg};
          color: ${theme()?.buttonBg};
            text-transform: uppercase;
                      font-weight: bold;
                      font-size: 1rem!important;
                      text-decoration: none;
                           &:hover {
                        background-color: ${theme()?.buttonBg};
                        color: ${theme()?.buttonText};
                      }

    }

                    .primary-link-button {
                      background: unset;
                      border: unset;
                      color: ${theme()?.buttonBg};
                      padding: unset;
                      font-size: 1.3rem;
                      text-decoration: none;
                      font-weight: bold;
                    }
        background-color: ${theme().backgroundColor};
        min-height: 100vh;
        width: 100vw;
        overflow-x: hidden;
        padding-top: calc(100px);
        color: ${theme().textColor};

        & h1 {
          text-transform: capitalize;
        }

        .checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-bottom: .5rem;
}

.primary-color-text {
  color: ${Light}!important;
}

.tab-button {
    border-radius: 0px;
    width: 100%;
    background-color: unset;
    text-align: start;
    padding: .5rem 0;
    border-bottom: 1px solid ${Light}30;
    color: ${Light}30;
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



        .spin {
  display: inline-block; /* Ensure it's inline-block or block for rotation */
  animation: spin-animation 2s linear infinite; /* Animation details */
}

@keyframes spin-animation {
  0% {
    transform: rotate(0deg); /* Start at 0 degrees */
  }
  100% {
    transform: rotate(360deg); /* Complete a full rotation */
  }
}




      `

      function getPath({navigate, location}) {
        return '/404'
      }

const AppRoutes = () => {
  const { theme } = useTheme()
  return (
    <>
      <main classList={{
        [appCSS(theme )]: true
      }}>
        {/* Define your routes */}
        <Routes>
    
          <Route path="/" component={Home} />
          <Route path="/contact" component={ContactUs} />
          <Route path="/profile" component={() =>
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/*" component={() => <ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/book-meeting" component={BookMeeting} />
          <Route path="/log-in" component={LogIn} />
          <Route path='/market-analysis' component={MarketAnalysis} />
          <Route path="/logout" component={Logout} />
          <Route path="/sign-up" component={SignUp} />
          <Route path='/influencers/' component={Influencers} />
          <Route path='/influencers/:name' component={InfluencerDetails} />
          <Route path="/about/*" component={AboutRoutes} />
          <Route path="/blog/*" component={BlogRoutes} />
          <Route path="/services" component={Services} />
          <Route path="/products/*" component={ProductRoutes} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate href={getPath} />} />
          <ModalWrapper />
        </Routes>
      </main></>

  )
}

const BlogRoutes = () => {
  const { theme, setNavbarState } = useTheme()

  const BlogCategory = lazy(() => import('./routes/blog/[...category]'))

  return (
    <Routes>
      <Route path="/" component={BlogLanding} />
      <Route path="/:category/" component={BlogCategory} />
      <Route path="/:category/:name" component={Blog} />
    </Routes>
  )
}

const ProductRoutes = () => {
  return (
    <>
      {/* <Breadcrumb /> */}
      <Routes>
        <Route path="/" component={() => <Products />} />
        <Route path="/:name/" component={ProductDetails} />
      </Routes></>

  )
}

const AboutRoutes = () => {

  return (
    <div classList={{
      [css`

      `]: true
    }}>
      <Routes>
        <Route path="/" component={AboutCarousel} />

      </Routes></div>

  )
}

const ProductDetails = () => {
  const params = useParams()
  const [product] = createResource(() => ({
    productName: params.name as string,
    productId: params.id
  }), ({ productName, productId }) => {
    console.log({
      productname: productName,
      productid: productId
    })
    return {
      name: productName?.replaceAll('-', ' '),
      id: productId
    }
  })
  createEffect(() => {
    console.log(product()?.id, product()?.name)
  })
  return (

    <div>
      <Breadcrumb />
      <h1>{product()?.name}</h1>
    </div>
  )
}
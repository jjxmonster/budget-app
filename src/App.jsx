import React from 'react';
import { ThemeProvider } from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';

import GlobalStyles from './index.css';
import theme from 'themes/theme'

import { Navigation, Wrapper, LoadingIndicator, Button, HomePage, BudgetPage } from 'components'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function App () {

  const { i18n } = useTranslation();


  return (
    <>
      <GlobalStyles />
      <Router>
        <Navigation items={ [
          { content: 'Homepage', to: "/" },
          { content: 'Budget', to: "/budget" }
        ] }
          RightElement={ (
            <div>
              <Button variant="regular" onClick={ () => i18n.changeLanguage('pl') } >pl</Button>
              <Button variant="regular" onClick={ () => i18n.changeLanguage('en') } >en</Button>
            </div>
          ) }
        />
        <Wrapper>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/budget">
              <BudgetPage />
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </>
  );
}



const RootApp = () => {
  return (
    <ThemeProvider theme={ theme }>
      <React.Suspense fallback={ <LoadingIndicator /> }>
        <App />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default RootApp;


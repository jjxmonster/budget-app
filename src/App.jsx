import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux'

import GlobalStyles from './index.css';
import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions'

import theme from 'themes/theme'

import { Navigation, Wrapper, LoadingIndicator, Button, HomePage } from 'components'

function App ({ fetchBudget, fetchBudgetedCategories }) {

  const { i18n } = useTranslation();
  const budget = useSelector(state => state.budget.budget)


  useEffect(() => {
    fetchBudget(1)
    fetchBudgetedCategories(1)
  }, [fetchBudget])



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
              Budget Page
          </Route>
          </Switch>
        </Wrapper>
      </Router>
    </>
  );
}

const ConnectedApp = connect(null, {
  fetchBudget,
  fetchBudgetedCategories
})(App)

const RootApp = () => {
  return (
    <ThemeProvider theme={ theme }>
      <React.Suspense fallback={ <LoadingIndicator /> }>
        <ConnectedApp />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default RootApp;


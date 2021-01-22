import React from 'react';
import { useQueryClient } from 'react-query'
 

import { LoadingIndicator, Button, ErrorView } from 'components'


class SuspenseErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
      this.client = props.client
    }
   
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error) {
      console.log(error);
    }
  
  tryAgain = async () => {
      await this.client.refetchQueries({ stale: true })
    
      this.setState({ hasError: false });
    }
  

  render () {
    return (
        <React.Suspense fallback={<LoadingIndicator/>}>
          { this.state.hasError ? (
            <div>
             <Button onClick={this.tryAgain.bind(this)}>Try again!</Button><ErrorView/> 
            </div>
          ) : (
            <>
              {this.props.children}
            </>
        )}
      </React.Suspense>
      )
       
    }
}

const ErrorBoundaryRoot = ({children}) => {
  const queryClient = useQueryClient()

  return ( 
    <SuspenseErrorBoundary client={queryClient}>
      {children}
    </SuspenseErrorBoundary>
   );
}
 
export default ErrorBoundaryRoot;
  

import React, { Component } from 'react';
import ErrorMessage from '../errorMessage/errorMessage';

export default class ErrorBoundary extends Component {
   state = {
      error: false
   }

   componentDidCatch() {
      this.setState({ error: true });
   }

   render() {
      const { children } = this.props
      const { error } = this.state

      if (error) {
         return <ErrorMessage />
      }
      return <>{children}</>
   }
}

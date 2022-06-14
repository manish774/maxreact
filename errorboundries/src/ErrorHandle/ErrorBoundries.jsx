import React, { Component } from 'react'
import classes from './Errors.module.css'
export default class ErrorBoundries extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false,errorMsg:"" };
      }
    
      static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        console.log(error)
        return { hasError: true,errorMsg:error };
      }
    
      componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        //console.log(error, errorInfo);
      }
    
      render() {
        console.log(this.state)
        if (this.state.hasError) {
          // You can render any custom fallback UI
          return <h3 className={classes.red}>{this.state.errorMsg.message}</h3>;
        }
    
        return this.props.children; 
      }
}

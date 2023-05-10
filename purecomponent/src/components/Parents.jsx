import React, { Component } from 'react'
import PureComp from './PureComp'
import RegComp from './RegComp'

export default class Parents extends Component {
    constructor() {
        super()
        this.state = {name:"manish"}
    }
    componentDidMount(){
        setInterval(()=>{
            this.setState({
                name:"h"
            })
        },2000)
        
    }
  render() {
    return (
      <div>
        <RegComp name={this.state.name}/>
        <PureComp name={this.state.name}/>
      </div>
    )
  }
}

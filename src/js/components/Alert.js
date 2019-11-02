import React ,{Component} from 'react'
import {Redirect} from 'react-router'

class Alert extends Component {

    state = {
      redirect: false
    }
  
    componentDidMount() {
      this.id = setTimeout(() => this.setState({ redirect: true }), 5000)
    }
  
    componentWillUnmount() {
      clearTimeout(this.id)
    }
  
    render() {
      return this.state.redirect  ? <Redirect to="/" />
        : <div>
<div className={this.props.dataClass} role="alert">
  Message :  {this.props.message}
</div>
      </div>
    }
  }
  export default Alert
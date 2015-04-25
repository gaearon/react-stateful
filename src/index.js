import { Component } from 'react';

export default function Stateful({ initialize, reducers }) {
  return DecoratedComponent => class StateContainer extends Component {
    constructor(props) {
      super(props);
      this.state = initialize(props);

      this.reducers = {};
      Object.keys(reducers).forEach(key => {
        this.reducers[key] = (...args) => {
          const nextState = reducers[key](this.props, this.state, ...args);
          this.setState(nextState);
        }
      });
    }

    render() {
      return <DecoratedComponent {...this.props}
                                 {...this.state}
                                 {...this.reducers} />;
    }
  }
}
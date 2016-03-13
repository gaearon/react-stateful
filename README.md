# No Maintenance Intended

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

<img src='http://i.imgur.com/S8ddNDs.gif' height='200'>

This project is no longer maintained. It does its job, but there are no plans to extend or change it.  
We don’t recommend you to depend on it, but you are free to reimplement a similar idea if you’d like.

# react-stateful

>*The last enemy that shall be destroyed is `this`.*  
>— An old JavaScript tutorial

A [higher-order React component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) for lifting simple state and keeping your components pure.  

This API is tiny and experimental.  
It may change a lot, or I may abandon it in the future. Feel free to play with it now!

### Why

You want to move the `state` out of your own components and rely on `props` as much as possible.  
You want to keep all possible mutations of your component's state declarative, co-located, and named.  

### Why Not

This won't help you with data subscriptions a la Flux.  
We're only talking about local component UI state.  
This also won't work with props triggering a state change (at least, not yet).

### Inspiration

This repo was inspired by [react-controllables](https://github.com/matthewwithanm/react-controllables) and [Reduce State](https://github.com/reactjs/react-future/blob/master/09%20-%20Reduce%20State/01%20-%20Declarative%20Component%20Module.js) proposal from [react-future](https://github.com/reactjs/react-future).

### Usage

This example assumes [ES7 decorators](https://github.com/wycats/javascript-decorators) ([Babel](https://babeljs.io/) supports them with `"stage": 1`). However they're easy and clean to write in desugared form, so try [Babel REPL](https://babeljs.io/repl/) if you're curious.

```js
import React, { PropTypes } from 'react';
import Stateful from 'react-stateful';

// So what's your state like?
const CounterState = {
  // like getInitialState
  initialize(props) {
    return {
      counter: 0
    };
  },

  // kinda like Flux actions
  reducers: {
    // how does your state change?
    increment(props, state) {
      return {
        counter: state.counter + 1
      };
    }
  }
};

@Stateful(CounterState) // injects state and reducers as props! component stays pure.
class Counter {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired
  };

  render() {
    const { counter, increment } = this.props;
    return <div onClick={increment}>{counter}</div>;
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Counter />
    );
  }
}
```

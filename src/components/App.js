import React, { Component } from 'react';
import CompareForm from './CompareForm';
import CompareInfo from './CompareInfo';

export default class App extends Component {
  render () {
    return (
      <div>
        <CompareForm />
        <CompareInfo />
      </div>
    );
  }
}

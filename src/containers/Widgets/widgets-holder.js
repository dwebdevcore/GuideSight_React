import React, { Component } from 'react';

export default class extends Component {
  render() {
    const { width, gutterTop, gutterBottom, children } = this.props;

    const holderStyle = {
      display: 'flex',
      flexFlow: 'row wrap',
      padding: '0 15px',
      marginTop: gutterTop,
      marginBottom: gutterBottom,
      width: width
    };
    return (
      <div className="isoWidgetsHolder" style={holderStyle}>
        {this.props.children}
      </div>
    );
  }
}

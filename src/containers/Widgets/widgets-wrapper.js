import React, { Component } from 'react';
import { WidgetWrapper } from './style';

export default class extends Component {
  render() {
    const {
      width,
      gutterTop,
      gutterRight,
      gutterBottom,
      gutterLeft,
      padding,
      bgColor,
      children
    } = this.props;
    const wrapperStyle = {
      width: width,
      marginTop: gutterTop,
      marginRight: gutterRight,
      marginBottom: gutterBottom,
      marginLeft: gutterLeft,
      padding: padding,
      backgroundColor: bgColor
    };

    return (
      <WidgetWrapper className="isoWidgetsWrapper" style={wrapperStyle}>
        {children}
      </WidgetWrapper>
    );
  }
}

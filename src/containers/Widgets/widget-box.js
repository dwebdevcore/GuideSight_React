import React, { Component } from 'react';
import { WidgetBox } from './style';

export default class extends Component {
  render() {
    const { children, style, height, padding } = this.props;

    // const boxStyle = {
    //   height: this.props.height,
    //   padding: this.props.padding,
    //   ...style,
    // };

    return (
      <WidgetBox
        className="isoWidgetBox"
        height={height}
        padding={padding}
        style={style}
      >
        {children}
      </WidgetBox>
    );
  }
}

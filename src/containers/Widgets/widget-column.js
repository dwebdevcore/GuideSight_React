import React, { Component } from 'react';
import { WidgetColumn } from './style';

export default class extends Component {
  render() {
    const {
      width,
      gutterTop,
      gutterRight,
      gutterBottom,
      gutterLeft,
      padding,
      children,
      align
    } = this.props;
    const alignContent =
      this.props.align === 'start'
        ? 'flex-start'
        : this.props.align === 'end'
          ? 'flex-end'
          : this.props.align === 'center'
            ? 'center'
            : this.props.align === 'stretch' ? 'stretch' : '';

    const columnStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      marginTop: gutterTop,
      marginRight: gutterRight,
      marginBottom: gutterBottom,
      marginLeft: gutterLeft,
      padding: padding,
      width: this.props.width,
      alignContent: alignContent
    };
    return (
      <WidgetColumn className="isoWidgetsColumn" style={columnStyle}>
        {this.props.children}
      </WidgetColumn>
    );
  }
}

import React, { Component } from 'react';
import { SaleWidgetWrapper } from './style';

export default class extends Component {
  render() {
    const { fontColor, label, price, details } = this.props;

    const textColor = {
      color: fontColor
    };

    return (
      <SaleWidgetWrapper className="isoSaleWidget">
        <h3 className="isoSaleLabel">{label}</h3>
        <span className="isoSalePrice" style={textColor}>
          {price}
        </span>
        <p className="isoSaleDetails">{details}</p>
      </SaleWidgetWrapper>
    );
  }
}

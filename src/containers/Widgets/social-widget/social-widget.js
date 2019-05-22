import React, { Component } from 'react';
import { SocialWidgetWrapper } from './style';

export default class extends Component {
  render() {
    const { children } = this.props;
    return (
      <SocialWidgetWrapper className="isoSocialWidgetWrapper">
        {children}
      </SocialWidgetWrapper>
    );
  }
}

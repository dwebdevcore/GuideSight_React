import React, { Component } from 'react';
import Progress from '../../../components/uielements/progress';
import { SingleProgressWidgetBar } from './style';

export default class SingleProgressWidget extends Component {
  render() {
    const { label, percent, barHeight, status, info, fontColor } = this.props;
    return (
      <SingleProgressWidgetBar className="isoSingleProgressBar">
        <h3 style={{ color: fontColor }}>
          {label}
        </h3>
        <Progress
          percent={percent}
          strokeWidth={barHeight}
          status={status}
          showInfo={info}
        />
      </SingleProgressWidgetBar>
    );
  }
}

import React, { Component } from 'react';
import Progress from '../../../components/uielements/progress';
import { CircleProgressWidgetBar } from './style';

export default class CircleProgressWidget extends Component {
  render() {
    const { label, percent, barHeight, status, info, fontColor } = this.props;
    return (
      <CircleProgressWidgetBar className="isoCircleProgress">
        <Progress
          type="circle"
          percent={percent}
          strokeWidth={barHeight}
          status={status}
          showInfo={info}
        />
        <h3 style={{ color: fontColor }}>
          {label}
        </h3>
      </CircleProgressWidgetBar>
    );
  }
}

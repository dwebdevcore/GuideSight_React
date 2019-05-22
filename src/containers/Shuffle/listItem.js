import React, { Component } from 'react';
import moment from 'moment';
import { Icon } from 'antd';
import { SingleCardWrapper } from './shuffle.style';

export default class extends Component {
  render() {
    const listClass = `isoSingleCard card ${this.props.view}`;
    const style = { zIndex: 100 - this.props.index };

    return (
      <SingleCardWrapper id={this.props.id} className={listClass} style={style}>
        <div className="isoCardImage">
          <img alt="#" src={process.env.PUBLIC_URL + this.props.img} />
        </div>
        <div className="isoCardContent">
          <h3 className="isoCardTitle">{this.props.desc}</h3>
          <span className="isoCardDate">
            {moment(this.props.timestamp).format('MMM Do, YYYY')}
          </span>
        </div>
        <button className="isoDeleteBtn" onClick={this.props.clickHandler}>
          <Icon type="close" />
        </button>
      </SingleCardWrapper>
    );
  }
}

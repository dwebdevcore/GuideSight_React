import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import AutoComplete from './composeAutoComplete.style';

function createArray(array) {
  if (array && array.length > 0) {
    return array.map(element => `${element.name}<${element.email}>`);
  }
  return [];
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      suggestions: createArray(props.allMails || []),
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDelete(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({ tags: tags });
  }

  handleAddition(tag) {
    let tags = this.state.tags;
    tags.push({
      id: tags.length + 1,
      text: tag,
    });
    this.setState({ tags: tags });
  }

  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags;
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);
    this.setState({ tags: tags });
  }

  render() {
    const { tags, suggestions } = this.state;
    return (
      <AutoComplete>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          placeholder={this.props.placeholder}
          minQueryLength={1}
          autofocus={this.props.autofocus || false}
        />
      </AutoComplete>
    );
  }
}

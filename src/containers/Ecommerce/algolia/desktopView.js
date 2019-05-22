import React, { Component } from 'react';
import { InstantSearch } from 'react-instantsearch/dom';
import { Footer, Sidebar } from '../../../components/algolia';
import Content from './content';
import EmptyComponent from '../../../components/emptyComponent.js';
import { AlgoliaSearchConfig } from '../../../settings';
import { setUrl, getInitData } from '../../../helpers/urlSync';
import './instantSearch.css';
import AlgoliaSearchPageWrapper from './algolia.style';

export default class extends Component {
  state = {
    searchState: getInitData()
  };
  setVoice = query => {
    const searchState = {
      ...this.state.searchState,
      page: '1',
      query
    };
    this.setState({ searchState });
    setUrl(searchState);
  };
  render() {
    const searchInfo = {
      ...AlgoliaSearchConfig,
      indexName: 'default_search',
      searchState: this.state.searchState,
      urlSync: true,
      onSearchStateChange: searchState => {
        this.setState({ searchState });
        setUrl(searchState);
      }
    };
    return (
      <AlgoliaSearchPageWrapper className="isoAlgoliaSearchPage">
        {AlgoliaSearchConfig.appId ? (
          <InstantSearch {...searchInfo}>
            <div className="isoAlgoliaMainWrapper">
              <Sidebar setVoice={this.setVoice} />
              <Content {...this.props} />
            </div>
            <Footer />
          </InstantSearch>
        ) : (
          <EmptyComponent value="Please include algolia appId" />
        )}
      </AlgoliaSearchPageWrapper>
    );
  }
}

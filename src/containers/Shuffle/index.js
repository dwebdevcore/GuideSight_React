import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import shuffle from 'lodash/shuffle';
import throttle from 'lodash/throttle';
import articles from './config';
import Toggle from './Toggle.js';
import ListItem from './listItem';
import IntlMessages from '../../components/utility/intlMessages';
import { SortableCardWrapper } from './shuffle.style';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removedArticles: [],
      view: 'grid',
      order: 'asc',
      sortingMethod: 'chronological',
      enterLeaveAnimation: 'accordionVertical',
      articles
    };

    this.toggleList = this.toggleList.bind(this);
    this.toggleGrid = this.toggleGrid.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.sortRotate = this.sortRotate.bind(this);
    this.sortShuffle = this.sortShuffle.bind(this);
  }

  toggleList() {
    this.setState({
      view: 'list',
      enterLeaveAnimation: 'accordionVertical'
    });
  }

  toggleGrid() {
    this.setState({
      view: 'grid',
      enterLeaveAnimation: 'accordionHorizontal'
    });
  }

  toggleSort() {
    const sortAsc = (a, b) => a.timestamp - b.timestamp;
    const sortDesc = (a, b) => b.timestamp - a.timestamp;

    this.setState({
      order: this.state.order === 'asc' ? 'desc' : 'asc',
      sortingMethod: 'chronological',
      articles: this.state.articles.sort(
        this.state.order === 'asc' ? sortDesc : sortAsc
      )
    });
  }

  sortShuffle() {
    this.setState({
      sortingMethod: 'shuffle',
      articles: shuffle(this.state.articles)
    });
  }

  moveArticle(source, dest, id) {
    const sourceArticles = this.state[source].slice();
    let destArticles = this.state[dest].slice();

    if (!sourceArticles.length) return;

    // Find the index of the article clicked.
    // If no ID is provided, the index is 0
    const i = id ? sourceArticles.findIndex(article => article.id === id) : 0;

    // If the article is already removed, do nothing.
    if (i === -1) return;

    destArticles = [].concat(sourceArticles.splice(i, 1), destArticles);

    this.setState({
      [source]: sourceArticles,
      [dest]: destArticles
    });
  }

  sortRotate() {
    const articles = this.state.articles.slice();
    articles.unshift(articles.pop());

    this.setState({
      sortingMethod: 'rotate',
      articles
    });
  }

  renderArticles() {
    return this.state.articles.map((article, i) => {
      return (
        <ListItem
          key={article.id}
          view={this.state.view}
          index={i}
          clickHandler={throttle(
            () => this.moveArticle('articles', 'removedArticles', article.id),
            800
          )}
          {...article}
        />
      );
    });
  }

  render() {
    return (
      <SortableCardWrapper
        id="shuffle"
        className={`isomorphicSortableCardsHolder ${this.state.view}`}
      >
        <header className="isoControlBar">
          <div className="isoViewBtnGroup">
            <Toggle
              clickHandler={this.toggleList}
              text={<IntlMessages id="toggle.list" />}
              icon="bars"
              active={this.state.view === 'list'}
            />
            <Toggle
              clickHandler={this.toggleGrid}
              text={<IntlMessages id="toggle.grid" />}
              icon="appstore"
              active={this.state.view === 'grid'}
            />
          </div>

          <div className="isoControlBtnGroup">
            <Toggle
              clickHandler={this.toggleSort}
              text={
                this.state.order === 'asc' ? (
                  <IntlMessages id="toggle.ascending" />
                ) : (
                  <IntlMessages id="toggle.descending" />
                )
              }
              icon={this.state.order === 'asc' ? 'up' : 'down'}
              active={this.state.sortingMethod === 'chronological'}
            />
            <Toggle
              clickHandler={this.sortShuffle}
              text={<IntlMessages id="toggle.shuffle" />}
              icon="shake"
              active={this.state.sortingMethod === 'shuffle'}
            />
            <Toggle
              clickHandler={this.sortRotate}
              text={<IntlMessages id="toggle.rotate" />}
              icon="reload"
              active={this.state.sortingMethod === 'rotate'}
            />
          </div>
        </header>

        <div className="isoSortableCardsContainer">
          <FlipMove
            staggerDurationBy="30"
            duration={500}
            enterAnimation={this.state.enterLeaveAnimation}
            leaveAnimation={this.state.enterLeaveAnimation}
            typeName="ul"
          >
            {this.renderArticles()}

            <footer key="foot" className="isoAddRemoveControlBar">
              <div className="isoControlBtnGroup">
                <Toggle
                  clickHandler={() =>
                    this.moveArticle('removedArticles', 'articles')}
                  text={<IntlMessages id="toggle.addItem" />}
                  icon="plus"
                  active={this.state.removedArticles.length > 0}
                />
                <Toggle
                  clickHandler={() =>
                    this.moveArticle('articles', 'removedArticles')}
                  text={<IntlMessages id="toggle.removeItem" />}
                  icon="close"
                  active={this.state.articles.length > 0}
                />
              </div>
            </footer>
          </FlipMove>
        </div>
      </SortableCardWrapper>
    );
  }
}

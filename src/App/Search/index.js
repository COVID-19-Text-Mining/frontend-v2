import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, Grid, Responsive } from 'semantic-ui-react';
import { LoadingFakeCard, ResultCard } from './ResultCard';
import {
  Button as FloatingButton,
  Container as FloatingContainer
} from 'react-floating-action-button';
import Sidebar from './Sidebar';
import SearchOptions from './SearchOptions';
import { CSSTransition } from 'react-transition-group';
import {
  generateApiQueryParams,
  getSearchState,
  onSearch,
  relatedToRegex
} from './Utils';
import NavMenu from 'App/shared/components/NavMenu';
import { Get } from 'App/shared/Fetcher';
import SearchForm from 'App/shared/components/SearchForm';
import { Error } from 'App/shared/components/Messages';
import Footer from 'App/shared/components/Footer';
import Pagination from 'App/shared/components/Pagination';
import { Box } from 'rebass';
import SummaryFixLink from './ResultComponents/SummaryFixLink';

const ContainerSearch = styled(Container)`
  &&& {
    font-size: 1rem;
    width: 100%;
    margin: 0.5em auto 0;
    padding: 1rem 0;
    display: flex;

    #sidebar {
      width: 30%;
      max-width: 250px;
      height: fit-content;
      margin-right: 1em;
      padding: 0.5em;
      border-radius: 0.28571429rem;

      .ui.button {
        width: calc(100% - 1em);
        padding: 0.78125rem 0.4rem;
        line-height: 1.4285em;
        border-radius: 1.3rem;
        margin: 0 0.5em 0.5em;
        background: rgba(0, 90, 142, 0.1);
        color: #3f9dd8;
      }
    }

    #search_results {
      flex: 1;
      margin-top: 0.5em; // Must match #sidebar top padding
    }

    #no_matches {
      text-align: center;
      margin: 2rem;
    }
  }
`;

const appendRelatedToQuery = (query, id) => {
  return query.replace(relatedToRegex, ' ').trim() + ' related_to:' + id;
};

function NoMatches({ query }) {
  return (
    <div id="no_matches">
      <br />
      No matches for <b>{query}</b>. Not finding what you're looking for?
      <br />
      {SummaryFixLink({
        link: null,
        doi: null,
        abstract: null,
        title: null,
        message: 'Help improve COVIDScholar by submitting articles.'
      })}
    </div>
  );
}

function SearchResults({ articles, query, isFieldSetAll, loading, error }) {
  // if (loading) return <Loading message="Searching..." />;
  if (loading) {
    articles = [];
    let loading = { loading: true };
    for (let i = 0; i < 10; i++) articles.push(loading);
  } else {
    articles.forEach(article => {
      article.loading = false;
    });
  }
  if (error)
    return <Error message={error.message || 'Unknown search error...'} />;

  if (articles.length === 0) return <NoMatches query={query} />;

  return (
    <>
      {articles.map((article, i) =>
        article.loading ? (
          <LoadingFakeCard key={i} />
        ) : (
          <ResultCard
            key={i}
            {...article}
            isFieldSetAll={isFieldSetAll}
            onSearchSimilar={() =>
              onSearch({
                query: appendRelatedToQuery(query, article.fields.id)
              })
            }
            onFilterCategory={tag => onSearch({ tags: tag })}
          />
        )
      )}
    </>
  );
}

const FloatingSideBar = styled(Grid)`
  && {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;

    #sidebar {
      width: 90% !important;
      max-width: 90vw !important;
    }
  }
`;

const AnimatedSidebar = styled.div`
  && {
    .sidebar-enter-active > div {
      animation-name: slide-right;
      animation-duration: 0.55s;
    }

    .sidebar-exit-active > div {
      animation-name: slide-left;
      animation-duration: 0.7s;
    }

    @keyframes slide-right {
      from {
        left: -100%;
      }
      to {
        left: 0;
      }
    }

    @keyframes slide-left {
      from {
        left: 0;
      }
      to {
        left: -100%;
      }
    }
  }
`;

function MobileFloatingButton({ onSearch, valuesState, dateRangePickerState }) {
  const [showProp, setShowProp] = useState(false);
  return (
    <Responsive {...Responsive.onlyMobile} style={{ zIndex: '100' }}>
      <AnimatedSidebar>
        <CSSTransition
          in={showProp}
          timeout={600}
          classNames="sidebar"
          unmountOnExit
        >
          <FloatingSideBar>
            <Sidebar
              onSearch={onSearch}
              dateDropdownValue={dateRangePickerState}
              {...valuesState}
            />
          </FloatingSideBar>
        </CSSTransition>
      </AnimatedSidebar>

      <FloatingContainer>
        <FloatingButton
          icon="bars icon lightBlue"
          styles={{ backgroundColor: '#0E6EB8' }}
          onClick={() => {
            setShowProp(!showProp);
          }}
        />
      </FloatingContainer>
    </Responsive>
  );
}

function DesktopSidebar({ onSearch, dateRangePickerState, valuesState }) {
  const R = styled(Responsive)`
    && {
      width: 30%;

      #sidebar {
        width: 100% !important;
        max-width: 300px !important;
      }
    }
  `;
  return (
    <R minWidth={Responsive.onlyTablet.minWidth}>
      <Sidebar
        onSearch={onSearch}
        dateDropdownValue={dateRangePickerState}
        {...valuesState}
      />
    </R>
  );
}

function CleverSidebar({ onSearch, dateRangePickerState, valuesState }) {
  if (dateRangePickerState.length === 0) {
    dateRangePickerState = ['-1'];
  }
  return (
    <>
      <MobileFloatingButton
        onSearch={onSearch}
        dateRangePickerState={dateRangePickerState}
        valuesState={valuesState}
      />
      <DesktopSidebar
        onSearch={onSearch}
        dateRangePickerState={dateRangePickerState}
        valuesState={valuesState}
      />
    </>
  );
}

function Search() {
  const searchState = getSearchState();
  const groupingId = 'group:root:0';
  const query = generateApiQueryParams();
  query.set('type', 'any');
  query.set('summary', 'short');
  query.set('restrict', 'doc');
  query.set('hits', 10);

  const { loading, response, error } = Get(
    '/search/?' + query.toString()
  ).state();
  const [grouping, setGrouping] = useState();
  // Sort results to make sure the grouping hit is first
  const [groupingResponse, ...articles] = (
    response?.root?.children || []
  ).sort(({ id: id1, relevance: rev1 }, { id: id2, relevance: rev2 }) =>
    id1 === groupingId ? -1 : id2 === groupingId ? 1 : rev2 - rev1
  );

  // Store grouping in own state so we can keep sidebar populated while making a new search
  useEffect(() => {
    if (loading) return;
    setGrouping(groupingResponse);
  }, [groupingResponse, setGrouping, loading]);

  const totalCount = response?.root?.fields?.totalCount || 0;

  // Combine grouping data with search state (search related query parameters, i.e. which filters have been enabled)
  const valuesState = !grouping?.children
    ? {}
    : grouping.children.reduce((obj, { label, children }) => {
        obj[label] = children.map(({ value, fields }) => ({
          value,
          count: fields['count()'],
          checked: searchState[label].includes(value)
        }));
        return obj;
      }, {});
  return (
    <React.Fragment>
      <Box width={1}>
        <Box width={1}>
          <NavMenu logo="show" />
        </Box>
        <ContainerSearch>
          <CleverSidebar
            onSearch={onSearch}
            dateRangePickerState={searchState.date_range}
            valuesState={valuesState}
          />
          <div id="search_results">
            <SearchForm onSearch={onSearch} {...searchState} />
            <SearchOptions
              totalCount={totalCount}
              onSearch={onSearch}
              {...searchState}
            />
            <SearchResults
              query={searchState.query}
              isFieldSetAll={searchState.fieldset === 'all'}
              {...{ articles, loading, error }}
            />
            <Pagination
              total={totalCount}
              offset={parseInt(query.get('offset')) || 0}
              onOffsetChange={offset => onSearch({ offset })}
            />
          </div>
        </ContainerSearch>
        <Footer page={'search'} />
      </Box>
    </React.Fragment>
  );
}

export default Search;

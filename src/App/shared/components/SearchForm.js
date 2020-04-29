import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Form, Icon } from 'semantic-ui-react';
import Autosuggest from 'react-autosuggest';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const StyledSearchForm = styled(Form)`
  &&& {
    font-size: 1.1rem;
    margin: 0 auto;

    input[type='text'] {
      border-radius: 1.3rem;
    }
  }
`;

function SearchForm({ onSearch, query = '' }) {
  const [currentQuery, setCurrentQuery] = useState(query);
  const [suggestions, setSuggestions] = useState([]);
  const trigger = useRef(new Subject());
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });

  useEffect(() => {
    const subscription = trigger.current
      .pipe(
        switchMap(v =>
          fetch(`https://scholar.google.com/scholar_complete?q=${v}`).then(r =>
            r.json()
          )
        )
      )
      .subscribe(({ l }) => {
        if (!l) {
          console.warn('response is null');
        } else {
          isMounted.current && setSuggestions(l); // component can be unmounted when the request is done
        }
      });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (query !== currentQuery) setCurrentQuery(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  const handleSearch = () => onSearch({ query: currentQuery });
  const onChange = (e, { newValue }) => setCurrentQuery(newValue);

  const inputProps = {
    value: currentQuery,
    onChange
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    trigger.current.next(value);
  };

  const onSuggestionsClearRequested = () => setSuggestions([]);

  // I've intended to use this, but it looses the focus
  // https://github.com/artsy/reaction/blob/c58f6407a00393dbd3940a401c82d1e470a692b1/src/Components/Search/SearchBar.tsx#L319
  const CustomInput = React.forwardRef((props, ref) => {
    return (
      <Form.Field
        icon={<Icon name="search" link onClick={handleSearch} />}
        className="input"
      >
        <input {...props} className="input" ref={ref} placeholder="Search..." />
      </Form.Field>
    );
  });

  return (
    <StyledSearchForm onSubmit={handleSearch}>
      <Autosuggest
        suggestions={suggestions}
        multiSection={false}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        renderSectionTitle={() => {}}
        getSectionItems={() => {}}
        getSuggestionValue={s => s}
        inputProps={inputProps}
        renderSuggestion={renderSuggestion}
        renderInputComponent={props => (
          <input {...props} className="input" placeholder="Search..." />
        )}
      />
    </StyledSearchForm>
  );
}

function renderSuggestion(suggestion) {
  return <span>{suggestion}</span>;
}

export default SearchForm;

// import _ from 'lodash'
// import faker from 'faker'
// import React, { Component } from 'react'
// import { Search, Grid, Header, Segment } from 'semantic-ui-react'
//
// const initialState = { isLoading: false, results: [], value: '' }
//
// const source = _.times(5, () => ({
//     title: faker.company.companyName(),
//     description: faker.company.catchPhrase(),
//     image: faker.internet.avatar(),
//     price: faker.finance.amount(0, 100, 2, '$'),
// }))
//
// export default class SearchExampleStandard extends Component {
//     state = initialState
//
//     handleResultSelect = (e, { result }) => this.setState({ value: result.title })
//
//     handleSearchChange = (e, { value }) => {
//         this.setState({ isLoading: true, value })
//
//         setTimeout(() => {
//             if (this.state.value.length < 1) return this.setState(initialState)
//
//             const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
//             const isMatch = (result) => re.test(result.title)
//
//             this.setState({
//                 isLoading: false,
//                 results: _.filter(source, isMatch),
//             })
//         }, 300)
//     }
//
//     render() {
//         const { isLoading, value, results } = this.state
//
//         return (
//             <Grid>
//                 <Grid.Column width={6}>
//                     <Search
//                         loading={isLoading}
//                         onResultSelect={this.handleResultSelect}
//                         onSearchChange={_.debounce(this.handleSearchChange, 500, {
//                             leading: true,
//                         })}
//                         results={results}
//                         value={value}
//                         {...this.props}
//                     />
//                 </Grid.Column>
//                 <Grid.Column width={10}>
//                     <Segment>
//                         <Header>State</Header>
//                         <pre style={{ overflowX: 'auto' }}>
//               {JSON.stringify(this.state, null, 2)}
//             </pre>
//                         <Header>Options</Header>
//                         <pre style={{ overflowX: 'auto' }}>
//               {JSON.stringify(source, null, 2)}
//             </pre>
//                     </Segment>
//                 </Grid.Column>
//             </Grid>
//         )
//     }
// }

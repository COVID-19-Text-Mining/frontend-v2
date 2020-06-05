import React, { useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import faker from 'faker';
import { Button, Checkbox, Dropdown, Form } from 'semantic-ui-react';
import { tagToColor, docTypeToColor } from 'App/Theme';
import { SearchSyntaxModal } from 'App/shared/components/SearchForm';

const addressDefinitions = faker.definitions.address;
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: addressDefinitions.state_abbr[index]
}));

const dateRangeOptions = [
  { key: 'all', text: 'All Time', value: '-1' },
  { key: '72hrs', text: 'Last 24 hours', value: '1' },
  { key: '1week', text: 'Last week', value: '7' },
  { key: '1month', text: 'Last month', value: '30' },
  { key: '1yr', text: 'Last year', value: '365' }
];

const checkboxFacets = [
  {
    name: 'Specific to COVID-19',
    field: 'is_covid19',
    colormap: null
  },
  {
    name: 'Peer Reviewed',
    field: 'is_preprint',
    colormap: null
  },
  {
    name: 'Document Type',
    field: 'document_type',
    colormap: docTypeToColor
  },
  {
    name: 'Tag',
    field: 'tags',
    colormap: tagToColor
  },
  {
    name: 'Year Published',
    field: 'year',
    colormap: null
  },
  {
    name: 'Data Source',
    field: 'source_display',
    colormap: null
  }
];

const PaddedCheckbox = styled(Checkbox)`
  && {
    display: block;
    padding: 2px;
    font-size: 0.9em;
    label {
      color: #303030;
    }
  }

  &&.red > label {
    color: #db2828 !important;
  }
  &&.orange > label {
    color: #f2711c !important;
  }
  &&.yellow > label {
    color: #fbbd08 !important;
  }
  &&.olive > label {
    color: #b5cc18 !important;
  }
  &&.green > label {
    color: #21ba45 !important;
  }
  &&.teal > label {
    color: #00b5ad !important;
  }
  &&.blue > label {
    color: #2185d0 !important;
  }
  &&.violet > label {
    color: #6435c9 !important;
  }
  &&.purple > label {
    color: #a333c8 !important;
  }
  &&.pink > label {
    color: #e03997 !important;
  }
  &&.brown > label {
    color: #a5673f !important;
  }
  &&.gray > label {
    color: #767676 !important;
  }
  &&.black > label {
    color: #1b1c1d !important;
  }
`;

function filterOutUndesiredCheckboxes(field, value) {
  if (value.length <= 0) {
    return false;
  } else if (field === 'is_covid19' && value === 'false') {
    return false;
  } else if (field === 'is_preprint' && value === 'true') {
    return false;
  } else {
    return true;
  }
}

function formatFacetLabel(field, value) {
  if (field === 'is_preprint' && value === 'false') {
    return 'yes';
  } else if (field === 'is_covid19' && value === 'true') {
    return 'yes';
  } else {
    return value;
  }
}

function Checkboxes({ name, field, values, colormap, onSearch }) {
  if (!values || values.length === 0) return null;
  const onChange = (event, { value, checked }) => {
    // The new selected checkboxes are the ones that were previously selected
    // and the current value of the checkbox that triggered the event
    const selected = values
      .filter(({ value: oValue, checked: oChecked }) =>
        oValue === value ? checked : oChecked
      )
      .map(({ value: oValue }) => oValue);
    onSearch({ [field]: selected });
  };
  return (
    <Form.Field>
      <label>{name}</label>
      {values
        .filter(({ value }) => filterOutUndesiredCheckboxes(field, value))
        .map(({ value, count, checked }, i) => (
          <PaddedCheckbox
            className={(colormap && colormap[value]) || ''}
            key={i}
            name={name}
            value={value}
            onChange={onChange}
            label={`${formatFacetLabel(field, value)} (${count})`}
            checked={checked}
          />
        ))}
    </Form.Field>
  );
}

function DateDropdown({ options, onSearch, defaultValue }) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = value => {
    onSearch({ date_range: value });
    setValue(value);
  };

  return (
    <Form.Field>
      <label>{'Filter by Date Published'}</label>
      <Dropdown
        value={value}
        defalutValue={options[0]}
        fluid
        selection
        options={options}
        onChange={(event, { value }) => handleChange(value)}
      />
    </Form.Field>
  );
}

function Sidebar({ onSearch, dateDropdownValue, ...filterValues }) {
  const noneChecked =
    Object.values(filterValues)
      .flatMap(values => values.map(({ checked }) => checked))
      .find(c => c) !== true;

  return (
    <div id="sidebar" className="ui form">
      <div
        style={{
          backgroundColor: '#e6eff5',
          padding: '10px'
        }}
      >
        <div
          style={{
            'text-align': 'center'
          }}
        >
          {SearchSyntaxModal()}
        </div>
        <Button
          disabled={noneChecked}
          onClick={() =>
            onSearch(
              checkboxFacets.reduce(
                (obj, { field }) => ({ ...obj, [field]: [] }),
                {}
              )
            )
          }
        >
          Clear all
        </Button>
        {
          <DateDropdown
            options={dateRangeOptions}
            onSearch={onSearch}
            defaultValue={dateDropdownValue[0]}
          />
        }
        {checkboxFacets.map(({ name, field, colormap }) => (
          <Checkboxes
            key={field}
            name={name}
            field={field}
            values={filterValues[field]}
            colormap={colormap}
            onSearch={onSearch}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

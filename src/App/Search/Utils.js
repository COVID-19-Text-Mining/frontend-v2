import { navigate } from '@reach/router';

const relatedToRegex = /(?:^|\s)(\+?related_to:[0-9]+)(?:$|\s)/;

const select = `all(
     all(group(source_display) order(-count()) each(output(count())))
     all(group(document_type) order(-count()) each(output(count())))
     all(group(is_covid19) order(-count()) each(output(count())))
     all(group(tags) order(-count()) each(output(count())))
     all(group(is_preprint) order(-count()) each(output(count())))
     all(group(time.year(timestamp)) max(10) order(-max(time.year(timestamp))) each(output(count())) as(year))
   )`
  .split('\n')
  .map(s => s.trim())
  .join('');

// Combines an array of possible values for a given field into an OR expression that is ANDed with other filters
const orCombiner = (field, array, range = false) =>
  array.length
    ? '+(' +
      array
        .map(s => (range ? `${field}:[${s}]` : `${field}:"${s}"`))
        .join(' ') +
      ')'
    : null;

function timestampRange(days) {
  let date = new Date();
  date.setMilliseconds(0);
  const now = date / 1000;
  if (days > 0) {
    date.setDate(date.getDate() - days);
    date.setHours(0, 0, 0, 0);
    const then = date / 1000;
    return now + ';' + then;
  } else {
    const then = 0;
    return now + ';' + then;
  }
}

const generateApiQueryParams = () => {
  const {
    is_covid19,
    is_preprint,
    tags,
    source_display,
    document_type,
    year,
    date_range
  } = getSearchState();
  // const timestampRanges = year
  //   .map(y => parseInt(y))
  //   .map(
  //     y =>
  //       timestampStartOfYearUtc(y) + ';' + (timestampStartOfYearUtc(y + 1) - 1)
  //   );
  const timestampRanges = [timestampRange(parseInt(date_range))];

  const filter = [
    orCombiner('is_covid19', is_covid19),
    orCombiner('is_preprint', is_preprint),
    orCombiner('document_type', document_type),
    orCombiner('tags', tags ? tags : []),
    orCombiner('source_display', source_display),
    orCombiner('year', year),
    orCombiner('timestamp', timestampRanges, true)
  ]
    .filter(s => s)
    .join(' ');
  console.log(window.location.search);
  const query = new URLSearchParams(window.location.search);
  const ranking = query.get('ranking');
  const fieldset = query.get('fieldset') || 'all';
  // Remove query parameters used in the UI, these are either sent to backend under a different name
  // or as part of an expression (filters)
  [
    'is_covid19',
    'is_preprint',
    'tags',
    'source_display',
    'document_type',
    'year',
    'ranking',
    'fieldset'
  ].forEach(q => query.delete(q));
  if (filter) query.set('filter', filter);
  if (ranking) query.set('ranking.profile', ranking);
  if (fieldset) query.set('model.defaultIndex', fieldset);
  query.set('select', select);
  if (query.get('query') === null || query.get('query').trim().length === 0) {
    query.set(
      'yql',
      `select * from sources * where timestamp > 0 AND userQuery();`
    );
  }
  console.log(query.toString());
  return query;
};

const onSearch = params => {
  const urlParams = new URLSearchParams(window.location.search);

  for (let [key, value] of Object.entries(params)) {
    urlParams.delete(key);
    if (Array.isArray(value)) value.forEach(v => urlParams.append(key, v));
    else if (value) urlParams.set(key, value);
  }
  // Offset must be reset whenever result set changes, which we assume may be
  // every time the URL changes due to other interactions than with pagination.
  if (!params.hasOwnProperty('offset')) urlParams.delete('offset');

  // No query or filters specified
  if (urlParams.entries().next().done) return;
  navigate('/search?' + urlParams);
};

const getRelatedId = urlParams => {
  const query = urlParams.get('query');
  if (!query) return null;
  const match = query.match(relatedToRegex);
  if (!match) return null;
  return match[1].split(':')[1];
};

const getSearchState = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return {
    query: urlParams.get('query') || '',
    journal: urlParams.getAll('journal'),
    is_covid19: urlParams.getAll('is_covid19'),
    is_preprint: urlParams.getAll('is_preprint'),
    document_type: urlParams.getAll('document_type'),
    source_display: urlParams.getAll('source_display'),
    tags: urlParams.getAll('tags'),
    year: urlParams.getAll('year'),
    author: urlParams.getAll('author'),
    has_full_text: urlParams.getAll('has_full_text'),
    use_specter: urlParams.getAll('use_specter'),
    ranking: urlParams.get('ranking'),
    fieldset: urlParams.get('fieldset') || 'all',
    relatedId: getRelatedId(urlParams),
    date_range: urlParams.getAll('date_range')
  };
};

export { generateApiQueryParams, getSearchState, onSearch, relatedToRegex };

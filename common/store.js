import { createStore } from 'redux';

import data from '../build/data.json';
import * as Sorting from '../common/sorting';

const originalData = [...data.libraries];

const INITIAL_STATE = {
  libraries: originalData,
  topics: data.topics,
  topicsList: data.topicsList,
  tooltip: null,
  modal: null,
  sortBy: 'updated',
  querySearch: '',
  queryTopic: undefined,
  rangeStart: 0,
  rangeEnd: 50,
};

const handleSorting = (state, sortBy) => {
  if (sortBy === 'recommended') {
    return Sorting.recommended(state, [...originalData], sortBy);
  }

  if (sortBy === 'compatibility') {
    return Sorting.compatibility(state, [...originalData], sortBy);
  }

  if (sortBy === 'issues') {
    return Sorting.issues(state, [...originalData], sortBy);
  }

  if (sortBy === 'stars') {
    return Sorting.stars(state, [...originalData], sortBy);
  }

  if (sortBy === 'downloads') {
    return Sorting.downloads(state, [...originalData], sortBy);
  }

  if (sortBy === 'updated') {
    return Sorting.updated(state, [...originalData], sortBy);
  }

  if (sortBy === 'quality') {
    return Sorting.quality(state, [...originalData], sortBy);
  }

  return { ...state, libraries: [...originalData], sortBy };
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_PAGINATION':
      return { ...state, rangeStart: action.start, rangeEnd: action.end };
    case 'CLEAR_TOOLTIP':
      return { ...state, tooltip: null };
    case 'CLEAR_MODAL':
      return { ...state, modal: null };
    case 'SET_TOOLTIP':
      return { ...state, tooltip: action.tooltip };
    case 'SET_MODAL':
      return { ...state, modal: action.modal };
    case 'SORT_BY':
      return handleSorting(state, action.sortBy);
    case 'SEARCH_LIBRARY':
      return { ...state, querySearch: action.value };
    case 'TOPIC_PICKED':
      return { ...state, queryTopic: action.value, querySearch: '' };
    case 'CLEAR_TOPIC':
      return { ...state, queryTopic: '' };
    case 'CLEAR_SEARCH':
      return { ...state, querySearch: '' };
    default:
      return state;
  }
};

export const initStore = initialState => {
  return createStore(reducer, initialState);
};

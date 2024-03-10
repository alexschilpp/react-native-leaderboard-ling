// userTableReducer.test.ts
import userTableReducer, { UserTableState, TableData, fuzzySearch, multiSort, tableData } from './userTableReducer';
import { SortOrder, SortBy } from '../../enums/enums';

const sampleState: UserTableState = {
  tableData: [{
    name: "Galvyn Chow",
    rank: 1,
    bananas: 200
  },
  {
    name: "Dang Nhan",
    rank: 2,
    bananas: 100
  },
  {
    name: "Martinus Putegra",
    rank: 3,
    bananas: 50
  }],
  searchQuery: '',
  sortBy: SortBy.rank,
  sortOrder: SortOrder.ASC,
};

describe('userTableReducer', () => {
  describe('SET_SEARCH_QUERY action', () => {
    it('should update the searchQuery state', () => {
      const newQuery: string = 'test';
      const action: { type: 'SET_SEARCH_QUERY'; payload: string } = {
        type: 'SET_SEARCH_QUERY',
        payload: newQuery,
      };
      const expectedState: UserTableState = { ...sampleState, searchQuery: newQuery };

      const newState = userTableReducer(sampleState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('FUZZY_SEARCH_USER action', () => {
    it('should filter and sort tableData based on search query and current sorting', () => {
      const searchQuery: string = 'ang'; // Matches 'Dang Nhan' and 'Martinus Putegra'
      const action: { type: 'FUZZY_SEARCH_USER'; payload: string } = {
        type: 'FUZZY_SEARCH_USER',
        payload: searchQuery,
      };
      const expectedState: UserTableState = {
        ...sampleState,
        tableData: filterAndSortTableData(searchQuery, tableData, sampleState.sortBy, sampleState.sortOrder),
      };

      const newState = userTableReducer(sampleState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('SORT_USER_TABLE action', () => {
    it('should update sortBy, sortOrder, and sort tableData accordingly', () => {
      const sortBy: SortBy = SortBy.bananas;
      const sortOrder: SortOrder = SortOrder.ASC;
      const action: { type: 'SORT_USER_TABLE'; payload: { sortBy: SortBy; sortOrder: SortOrder } } = {
        type: 'SORT_USER_TABLE',
        payload: { sortBy, sortOrder },
      };
      const expectedState: UserTableState = {
        ...sampleState,
        sortBy,
        sortOrder,
        tableData: sortTableData(sampleState.tableData, sortBy, sortOrder),
      };

      const newState = userTableReducer(sampleState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('default case', () => {
    it('should return the initial state for unknown actions', () => {
      const action = { type: 'UNKNOWN_ACTION' };

      const newState = userTableReducer(sampleState, action);

      expect(newState).toEqual(sampleState);
    });
  });
});

function filterAndSortTableData(searchQuery: string, tableData: TableData[], sortBy: SortBy, sortOrder: SortOrder): TableData[] {
  const newTableData = [...tableData]
    .filter((items) => fuzzySearch(searchQuery, items.name))
    .sort((a, b) => multiSort(a, b, sortBy, sortOrder));
  return newTableData;
}

function sortTableData(tableData: TableData[], sortBy: SortBy, sortOrder: SortOrder): TableData[] {
  const newTableData = [...tableData]
    .sort((a, b) => multiSort(a, b, sortBy, sortOrder));
  return newTableData;
}
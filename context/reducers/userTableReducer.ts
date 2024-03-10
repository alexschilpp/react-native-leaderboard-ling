import sampleData from '../../assets/sampleData.json';
import { SortOrder, SortBy } from '../../enums/enums';

export interface TableData {
    name: string;
    rank: number;
    bananas: number;
}

export interface UserTableState {
 tableData: TableData[],
 searchQuery: string,
 sortBy: SortBy,
 sortOrder: SortOrder
}

export const tableData: TableData[] = Object.keys(sampleData)
    .map((item) => sampleData[item])
    .sort((a, b) => a.bananas !== b.bananas ? b.bananas - a.bananas : a.name.localeCompare(b.name))
    .map((item, index) => ({
        name: item.name,
        rank: index+1,
        bananas: item.bananas
    }));

const initialState: UserTableState = {
    tableData: [],
    searchQuery: '',
    sortBy: SortBy.rank,
    sortOrder: SortOrder.ASC
}

const userTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                searchQuery: action.payload,
            };
        case 'FUZZY_SEARCH_USER':
            return {
                ...state,
                tableData: action.payload.length > 0 ?
                    [...tableData]
                        .filter((items) => fuzzySearch(action.payload, items.name))
                        .sort((a, b) => multiSort(a, b, state.sortBy, state.sortOrder)) :
                    [],
            };
        case 'SORT_USER_TABLE':
            const { sortBy, sortOrder } = action.payload;
            return {
                ...state,
                sortBy,
                sortOrder,
                tableData: [...state.tableData].sort((a, b) => multiSort(a, b, sortBy, sortOrder))
            };
        default:
            return state
    }
}

/*
When sorting by 'rank' or by 'bananas' - both ascending and
descending - list users with the same score alphabetically
*/
export const multiSort = (a, b, sortBy, sortOrder): number => {
    if (sortBy === SortBy.rank) {
        if (a.rank !== b.rank) {
            return sortOrder === SortOrder.ASC ? a.rank - b.rank : b.rank - a.rank;
        } else {
            return a.name.localeCompare(b.name);
        }
    } else if (sortBy === SortBy.bananas) {
        if (a.bananas !== b.bananas) {
            return sortOrder === SortOrder.ASC ? a.bananas - b.bananas : b.bananas - a.bananas;
        } else {
            return a.name.localeCompare(b.name);
        }
    } else {
        if (a[sortBy] < b[sortBy]) {
            return sortOrder === SortOrder.ASC ? -1 : 1;
        } else if (a[sortBy] > b[sortBy]) {
            return sortOrder === SortOrder.ASC ? 1 : -1;
        } else {
            return 0;
        }
    }
}

/*
FUZZY SEARCH (approximate string matching):
If first letter of needle is found iterate through subsequent
characters in the haystack to see if they match the remaining
characters in the needle.
*/
export const fuzzySearch = (needle: string, haystack: string): boolean => {
    const lowerNeedle = needle.toLowerCase();
    const lowerHaystack = haystack.toLowerCase();

    for (let i = 0; i < lowerHaystack.length; i++) {
        if (lowerHaystack[i] === lowerNeedle[0]) {
            let matchedChars = 1;
            for (let j = i + 1; j < lowerHaystack.length && matchedChars < lowerNeedle.length; j++) {
                if (lowerHaystack[j] === lowerNeedle[matchedChars]) {
                    matchedChars++;
                }
            }
            if (matchedChars === lowerNeedle.length) {
                return true;
            }
        }
    }
    return false;
}

export default userTableReducer;
export const setSearchQuery = (query: string) => ({
    type: 'SET_SEARCH_QUERY',
    payload: query
})

export const fuzzySearchUser = (userName: string) => ({
    type: 'FUZZY_SEARCH_USER',
    payload: userName
})

export const sortUserTable = (sortBy: string, sortOrder: 'asc' | 'desc') => ({
    type: 'SORT_USER_TABLE',
    payload: {
        sortBy,
        sortOrder
    }
})
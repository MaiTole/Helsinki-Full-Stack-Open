import React from 'react'

const Search = ({searchFilter, handleFilterChange}) => {
  return (
    <>
    <div>
      Filter shown with: <input name='search' value={searchFilter} onChange={handleFilterChange} />
    </div>
    <br />
    </>
  )
}

export default Search
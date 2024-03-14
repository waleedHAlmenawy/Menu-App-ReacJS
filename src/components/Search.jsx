import React from 'react'

export default function Search({ searchInput, handlerSearch }) {

    return (
        <input type="text" placeholder="Search" className="input input-bordered input-warning m-2" onChange={handlerSearch} value={searchInput} />
    )
}

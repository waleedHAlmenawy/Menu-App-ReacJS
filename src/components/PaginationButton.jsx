import React from 'react'

export default function PaginationButton({page, handlerSelectPage, selectedPage}) {
  return (
    <button className={`join-item btn ${selectedPage === page ? "bg-amber-300" : "bg-slate-100"}`} onClick={() =>handlerSelectPage(page)}>{page}</button>
  )
}

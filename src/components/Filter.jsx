import React from 'react'

export default function Filter({ category, handlerFilter, selectedCategoryId }) {
    return (
        <button className={`btn m-2 ${selectedCategoryId === +category.id ? "bg-amber-300" : "bg-slate-200"}`} onClick={() => handlerFilter(+category.id)}>{category.name}</button>
    )
}
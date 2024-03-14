import React, { useState } from "react";
import CartItem from "../components/CartItem";

export default function Cart({ items, setItems }) {
  function handlerIncrememnt(item) {
    let newItems = [...items];
    var i = items.findIndex((newItem) => newItem.name === item.name);

    newItems[i] = { ...newItems[i] };
    newItems[i].count++;

    setItems(newItems);
  }

  function handlerDecrement(item) {
    let newItems = [...items];
    var i = items.findIndex((newItem) => newItem.name === item.name);

    newItems[i] = { ...newItems[i] };
    if (newItems[i].count) {
      newItems[i].count--;
    }

    setItems(newItems);
  }

  function handlerDelete(item) {
    let newItems = [...items];
    var i = items.findIndex((newItem) => newItem.name === item.name);

    newItems[i].isInCart = false;
    setItems(newItems);
  }

  function handlerReset() {
    let newItems = [...items];

    newItems = newItems.map((item) => {
      item.count = 0;
      return item;
    });

    setItems(newItems);
  }

  return (
    <>
      <div className="p-1">

        {items.map((item) => (
          <CartItem
            item={item}
            handlerDecrement={handlerDecrement}
            handlerIncrememnt={handlerIncrememnt}
            handlerDelete={handlerDelete}
            key={item.name}
          />
        ))}

      </div>

      {items.length !== 0 && (
        <div className="grid">
          <button
            className="border border-b-2 bg-slate-200 hover:bg-slate-400 p-2 m-3 rounded transition-all"
            onClick={handlerReset}
          >
            Reset
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex justify-center items-center h-80 text-7xl text-slate-300">
          cart is empty
        </div>
      ) : (
        true
      )}

    </>
  );
}

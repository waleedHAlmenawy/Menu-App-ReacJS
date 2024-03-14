import DeleteCart from "../svg/DeleteCart";

export default function CartItem(props) {
  return (
    <div className="grid grid-cols-9 gap-8 text-bold p-3">
      <span className="col-span-2">{props.item.name}</span>
      <span className="bg-yellow-300 text-center rounded col-span-2">
        {props.item.count}
      </span>
      <button
        className="border-b-2 bg-slate-300 rounded hover:bg-slate-400 transition-all col-span-2"
        onClick={() => props.handlerIncrememnt(props.item)}
      >
        +
      </button>
      <button
        className="border-b-2 bg-slate-300 rounded hover:bg-slate-400 transition-all col-span-2"
        onClick={() => props.handlerDecrement(props.item)}
      >
        -
      </button>

      <button
        className="border-b-2 bg-red-400 rounded hover:bg-red-500 transition-all col-span-1 flex justify-center"
        onClick={() => props.handlerDelete(props.item)}
      >
        <DeleteCart></DeleteCart>
      </button>
    </div>
  );
}

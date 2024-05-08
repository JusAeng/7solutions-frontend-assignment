"use client";

import data from "@/app/data/mock.json";
import { useEffect, useRef, useState } from "react";

interface ItemType {
  name: string;
  type: string;
}

export default function Home() {
  const [items, setItems] = useState(data as ItemType[]);
  const [queue, setQueue] = useState([] as ItemType[]);
  const queueRef = useRef([] as ItemType[]);
  const itemRef = useRef([] as ItemType[]);

  const handleAdd = (added: ItemType) => {
    const filtered = items.filter((item) => item.name !== added.name);
    setItems(filtered);
    setQueue([...queue, added]);
    setTimeout(() => {
      let temp = queueRef.current;
      let itemOut = temp.shift();
      let tempItems = itemRef.current;
      setQueue([...temp]);
      if (itemOut) setItems([...tempItems, itemOut]);
    }, 5000);
  };

  useEffect(() => {
    queueRef.current = queue;
    itemRef.current = items;
  }, [queue, items]);

  return (
    <main className="grid grid-cols-3 gap-[20px] mt-[20px] px-[100px]">
      <section className="flex flex-col items-center gap-[20px]">
        {items.map((item, idx) => (
          <button
            className="border py-[10px] txt w-[300px]"
            onClick={() => handleAdd(item)}
            key={idx}
          >
            {item.name}
          </button>
        ))}
      </section>
      <section className="type-box">
        <div className="bg-[#cccccc] w-full py-[10px] txt">Fruits</div>
        <div className="px-[10px] w-full flex flex-col gap-[20px] items-center mt-[10px]">
          {queue.map(
            (item, idx) =>
              item.type == "Fruit" && (
                <div className="border py-[10px] txt w-[300px]" key={idx}>
                  {item.name}
                </div>
              )
          )}
        </div>
      </section>
      <section className="type-box">
        <div className="bg-[#cccccc] w-full py-[10px] txt">Vegetables</div>
        <div className="px-[10px] w-full flex flex-col gap-[20px] items-center mt-[10px]">
          {queue.map(
            (item, idx) =>
              item.type == "Vegetable" && (
                <div className="border py-[10px] txt w-[300px]" key={idx}>
                  {item.name}
                </div>
              )
          )}
        </div>
      </section>
    </main>
  );
}

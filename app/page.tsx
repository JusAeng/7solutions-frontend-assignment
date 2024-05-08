"use client";

import data from "@/app/data/mock.json";
import { useEffect, useRef, useState } from "react";

interface ItemType {
  name: string;
  type: string;
}

export default function Home() {
  const [items, setItems] = useState(data as ItemType[]);
  const [fruits, setFruits] = useState([] as ItemType[]);
  const [vegetables, setVegetables] = useState([] as ItemType[]);

  const handleAdd = async (item: ItemType) => {
    switch (item.type) {
      case "Fruit":
        setFruits([...fruits, item]);
        itemLeaveOut(item);
        break;
      case "Vegetable":
        setVegetables([...vegetables, item]);
        itemLeaveOut(item);
        break;
      default:
        console.log(item.name);
    }
  };

  const itemLeaveOut = (leave: ItemType) => {
    const filtered = items.filter((item) => item.name !== leave.name);
    setItems(filtered);
  };

  useEffect(() => {
    setTimeout(() => {
      let outItem = fruits.shift();
      console.log(outItem);
    }, 5000);
  }, [fruits]);

  useEffect(() => {
    setTimeout(() => {
      let outItem = vegetables.shift();
    }, 5000);
  }, [vegetables]);

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
        <div className="bg-[#cccccc] w-full py-[10px] txt">Fruit</div>
        <div className="px-[10px] w-full flex flex-col gap-[20px] items-center mt-[10px]">
          {fruits.map((fruit, idx) => (
            <div className="border py-[10px] txt w-[300px]" key={idx}>
              {fruit.name}
            </div>
          ))}
        </div>
      </section>
      <section className="type-box">
        <div className="bg-[#cccccc] w-full py-[10px] txt">Vegetable</div>
        <div className="px-[10px] w-full flex flex-col gap-[20px] items-center mt-[10px]">
          {vegetables.map((vegetable, idx) => (
            <div className="border py-[10px] txt w-[300px]" key={idx}>
              {vegetable.name}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

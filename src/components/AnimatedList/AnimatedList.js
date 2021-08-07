import { useState } from "react";

import { usePrevious } from "services/hooks";

import "./AnimatedList.css";
import {
  getNewItemsAtTheBeginning,
  hasNewItemsAtTheBeginning,
} from "./AnimatedList.services";

const AnimatedList = ({ ItemComponent, itemHeight, items }) => {
  const [currentItems, setCurrentItems] = useState(items);
  const [opacityItems, setOpacityItems] = useState([]);

  const previousItems = usePrevious(items);
  let newItems = [];

  if (hasNewItemsAtTheBeginning(previousItems || items, items)) {
    const newItemsAtBeginning = getNewItemsAtTheBeginning(
      previousItems || items,
      items
    );
    newItems = newItemsAtBeginning;
    setTimeout(() => {
      setOpacityItems(newItemsAtBeginning);
      newItems = [];
      setTimeout(() => {
        setCurrentItems([...newItemsAtBeginning, ...currentItems]);
        setOpacityItems([]);
      }, 1000);
    }, 1000);
  }

  const newMessagesHeight = newItems.length * itemHeight;

  return (
    <div>
      <ul>
        <div
          className={
            newMessagesHeight > 0 ? ".pimp-my-list-height-transition" : ""
          }
          style={{
            height: `${newMessagesHeight}px`,
          }}
        ></div>
        <div
          style={{
            opacity: opacityItems.length > 0 ? 1 : 0,
            transition: "opacity 250ms ease-in",
          }}
        >
          {opacityItems.map((item, index) => (
            <li key={index}>
              <ItemComponent {...item} />
            </li>
          ))}
        </div>
        {currentItems.map((item, index) => (
          <li key={index}>
            <ItemComponent {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimatedList;

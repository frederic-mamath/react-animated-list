export const previousItemsIsEmptyAndThereAreNewItems = /*<T>*/ (
  previousItems /*: Array<T>*/,
  newItems /*: Array<T>*/
) /*: boolean*/ => {
  if (previousItems.length === 0 && newItems.length > 0) {
    return true;
  }

  return false;
};

export const hasNewItemsAtTheBeginning = /* <T> */ (
  previousItems /* : Array<T> */,
  newItems /* : Array<T> */
) /* : boolean */ => {
  if (previousItemsIsEmptyAndThereAreNewItems(previousItems, newItems)) {
    return true;
  }

  const firstItemIndex = newItems.indexOf(previousItems[0]);

  return firstItemIndex > 0;
};

export const getNewItemsAtTheBeginning = /* <T> */ (
  previousItems /* : Array<T> */,
  newItems /* : Array<T> */
) /* : Array<T> */ => {
  if (!hasNewItemsAtTheBeginning(previousItems, newItems)) {
    return [];
  }

  const firstItemIndex = newItems.indexOf(previousItems[0]);

  return newItems.slice(0, firstItemIndex);
};

export const hasNewItemsAtTheEnd = /*<T>*/ (
  previousItems /* : Array<T> */,
  newItems /* : Array<T> */
) /* : boolean */ => {
  if (previousItemsIsEmptyAndThereAreNewItems(previousItems, newItems)) {
    return true;
  }

  const lastItemIndex = newItems.indexOf(
    previousItems[previousItems.length - 1]
  );

  return lastItemIndex !== newItems.length - 1 && lastItemIndex > -1;
};

export const getNewItemsAtTheEnd = /* <T> */ (
  previousItems /* : Array<T> */,
  newItems /* : Array<T> */
) /* : Array<T> */ => {
  if (!hasNewItemsAtTheEnd(previousItems, newItems)) {
    return [];
  }

  const lastItemIndex = newItems.indexOf(
    previousItems[previousItems.length - 1]
  );

  return newItems.slice(lastItemIndex + 1);
};

export const hasNewItemsInTheMiddle = () => {};

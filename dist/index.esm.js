import React, { useState } from 'react';
import { usePrevious } from 'services/hooks';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".pimp-my-list-height-transition {\n  height: 0;\n  transition: height 250ms ease-in;\n}\n";
styleInject(css_248z);

const previousItemsIsEmptyAndThereAreNewItems =
/*<T>*/
(previousItems
/*: Array<T>*/
, newItems
/*: Array<T>*/
) => {
  if (previousItems.length === 0 && newItems.length > 0) {
    return true;
  }

  return false;
};
const hasNewItemsAtTheBeginning =
/* <T> */
(previousItems
/* : Array<T> */
, newItems
/* : Array<T> */
) => {
  if (previousItemsIsEmptyAndThereAreNewItems(previousItems, newItems)) {
    return true;
  }

  const firstItemIndex = newItems.indexOf(previousItems[0]);
  return firstItemIndex > 0;
};
const getNewItemsAtTheBeginning =
/* <T> */
(previousItems
/* : Array<T> */
, newItems
/* : Array<T> */
) => {
  if (!hasNewItemsAtTheBeginning(previousItems, newItems)) {
    return [];
  }

  const firstItemIndex = newItems.indexOf(previousItems[0]);
  return newItems.slice(0, firstItemIndex);
};

var AnimatedList = function AnimatedList(_ref) {
  var ItemComponent = _ref.ItemComponent,
      itemHeight = _ref.itemHeight,
      items = _ref.items;

  var _useState = useState(items),
      _useState2 = _slicedToArray(_useState, 2),
      currentItems = _useState2[0],
      setCurrentItems = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      opacityItems = _useState4[0],
      setOpacityItems = _useState4[1];

  var previousItems = usePrevious(items);
  var newItems = [];

  if (hasNewItemsAtTheBeginning(previousItems || items, items)) {
    var newItemsAtBeginning = getNewItemsAtTheBeginning(previousItems || items, items);
    newItems = newItemsAtBeginning;
    setTimeout(function () {
      setOpacityItems(newItemsAtBeginning);
      newItems = [];
      setTimeout(function () {
        setCurrentItems([].concat(_toConsumableArray(newItemsAtBeginning), _toConsumableArray(currentItems)));
        setOpacityItems([]);
      }, 1000);
    }, 1000);
  }

  var newMessagesHeight = newItems.length * itemHeight;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("div", {
    className: newMessagesHeight > 0 ? "pimp-my-list-height-transition" : "",
    style: {
      height: "".concat(newMessagesHeight, "px")
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: opacityItems.length > 0 ? 1 : 0,
      transition: "opacity 250ms ease-in"
    }
  }, opacityItems.map(function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index
    }, /*#__PURE__*/React.createElement(ItemComponent, item));
  })), currentItems.map(function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index
    }, /*#__PURE__*/React.createElement(ItemComponent, item));
  })));
};

export { AnimatedList };

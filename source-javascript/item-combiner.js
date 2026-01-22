var timeouts = {
  unstrungBows: 82
};
var itemCombinationData = [{
  combined_item_name: 'Maple longbow (u)',
  combined_item_id: 62,
  deposit_all: false,
  items: [{
    id: 946,
    name: 'Knife',
    quantity: 1
  }, {
    id: 1517,
    name: 'Maple logs',
    quantity: 27
  }],
  make_widget_data: {
    packed_widget_id: 17694737,
    identifier: 1,
    opcode: 57,
    p0: -1
  },
  timeout: timeouts.unstrungBows
}, {
  combined_item_name: 'Pastry dough',
  combined_item_id: 1953,
  deposit_all: true,
  items: [{
    id: 1937,
    name: 'Jug of water',
    quantity: 9
  }, {
    id: 1933,
    name: 'Pot of flour',
    quantity: 9
  }],
  make_widget_data: {
    packed_widget_id: 17694736,
    identifier: 1,
    opcode: 57,
    p0: -1
  },
  timeout: 16
}, {
  combined_item_name: 'Pie shell',
  combined_item_id: 2315,
  deposit_all: true,
  items: [{
    id: 1953,
    name: 'Pastry dough',
    quantity: 14
  }, {
    id: 2313,
    name: 'Pie dish',
    quantity: 14
  }],
  make_widget_data: {
    packed_widget_id: 17694735,
    identifier: 1,
    opcode: 57,
    p0: -1
  },
  timeout: 30
}, {
  combined_item_name: 'Ultracompost',
  combined_item_id: 21483,
  deposit_all: true,
  items: [{
    id: 21622,
    name: 'Volcanic ash',
    quantity: 54
  }, {
    id: 6034,
    name: 'Supercompost',
    quantity: 27
  }],
  make_widget_data: {
    packed_widget_id: 17694735,
    identifier: 1,
    opcode: 57,
    p0: -1
  },
  timeout: 56
}];

var logger = (state, type, source, message) => {
  var logMessage = "[".concat(source, "] ").concat(message);
  if (type == 'all') bot.printGameMessage(logMessage);
  if (type == 'all' || type == 'debug' && state.debugEnabled) bot.printLogMessage(logMessage);
};

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var utilityFunctions = {
  convertToTitleCase: stringToConvert => stringToConvert.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
  getObjectByValues: (array, match) => {
    var item = array.find(object => Object.entries(match).every(_ref => {
      var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];
      return object[k] === v;
    }));
    return item !== null && item !== void 0 ? item : false;
  },
  setArrObjValues: (array, match, setValues) => {
    var object = array.find(item => Object.entries(match).every(_ref3 => {
      var _ref4 = _slicedToArray(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];
      return v !== false && item[k] === v;
    }));
    if (!object) return false;
    Object.entries(setValues).forEach(_ref5 => {
      var _ref6 = _slicedToArray(_ref5, 2),
        k = _ref6[0],
        v = _ref6[1];
      object[k] = v;
    });
    return true;
  },
  randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
};

var antibanFunctions = {
  getRandomisedAfkTimeout: function getRandomisedAfkTimeout() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    var triggerChancePercentage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var additionalAfkChancePercentage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var timeout = 0;
    if (utilityFunctions.randomInt(1, 100) <= triggerChancePercentage) {
      timeout = utilityFunctions.randomInt(min, max);
      if (utilityFunctions.randomInt(1, 100) <= additionalAfkChancePercentage) timeout += utilityFunctions.randomInt(min, max);
    }
    return timeout;
  },
  afkTrigger: state => {
    if (!state.antibanTriggered) {
      var antibanTimeout = antibanFunctions.getRandomisedAfkTimeout(5, 15, 1, 5) || antibanFunctions.getRandomisedAfkTimeout(1, 5, 1, 5);
      if (antibanTimeout > 0) {
        state.timeout = antibanTimeout;
        state.antibanTriggered = true;
        logger(state, 'all', 'antibanFunctions.afkTrigger', "Random AFK for ".concat(antibanTimeout, " ticks."));
        return true;
      }
    }
    state.antibanTriggered = false;
    return false;
  }
};

var debugFunctions = {
  stateDebugger: function stateDebugger(state) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var _recurse = function recurse(object) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      for (var _i = 0, _Object$entries = Object.entries(object); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];
        var type = _typeof(value);
        if (type === 'string' || type === 'number' || type === 'boolean') {
          logger(state, 'debug', 'stateDebugger', "".concat(prefix).concat(key, ": ").concat(String(value)));
        } else if (Array.isArray(value)) {
          logger(state, 'debug', 'stateDebugger', "".concat(prefix).concat(key, " Length: ").concat(value.length));
        } else if (type === 'object' && value !== null) {
          _recurse(value, "".concat(prefix).concat(key, "."));
        }
      }
    };
    _recurse(state, prefix);
  }
};

var timeoutManager = {
  conditions: [],
  globalFallback: undefined,
  globalFallbackThreshold: 60,
  globalTicksWaited: 0,
  add(_ref) {
    var state = _ref.state,
      conditionFunction = _ref.conditionFunction,
      maxWait = _ref.maxWait,
      onFail = _ref.onFail,
      _ref$initialTimeout = _ref.initialTimeout,
      initialTimeout = _ref$initialTimeout === void 0 ? 0 : _ref$initialTimeout;
    var failCallback = typeof onFail === 'string' ? () => logger(state, 'all', 'Timeout', onFail) : onFail;
    this.conditions.push({
      conditionFunction,
      maxWait,
      ticksWaited: 0,
      ticksDelayed: initialTimeout,
      onFail: failCallback
    });
  },
  tick() {
    this.conditions = this.conditions.filter(condition => {
      if (condition.ticksDelayed > 0) {
        condition.ticksDelayed--;
        return true;
      }
      if (condition.conditionFunction()) return false;
      condition.ticksWaited++;
      if (condition.ticksWaited >= condition.maxWait) {
        var _condition$onFail;
        (_condition$onFail = condition.onFail) === null || _condition$onFail === void 0 || _condition$onFail.call(condition);
        return false;
      }
      return true;
    });
    if (this.conditions.length > 0) {
      this.globalTicksWaited++;
      if (this.globalTicksWaited >= this.globalFallbackThreshold && this.globalFallback) {
        this.globalFallback();
        this.globalTicksWaited = 0;
      }
    } else {
      this.globalTicksWaited = 0;
    }
  },
  isWaiting() {
    return this.conditions.length > 0;
  }
};

var generalFunctions = {
  gameTick: state => {
    try {
      logger(state, 'debug', 'onGameTick', "Script game tick ".concat(state.gameTick, " -------------------------"));
      state.gameTick++;
      if (state.debugEnabled && state.debugFullState) debugFunctions.stateDebugger(state);
      if (state.timeout > 0) {
        state.timeout--;
        return false;
      }
      timeoutManager.tick();
      if (timeoutManager.isWaiting()) return false;
      if (state.antibanEnabled && antibanFunctions.afkTrigger(state)) return false;
      return true;
    } catch (error) {
      var fatalMessage = error.toString();
      logger(state, 'all', 'Script', fatalMessage);
      generalFunctions.handleFailure(state, 'gameTick', fatalMessage);
      return false;
    }
  },
  handleFailure: (state, failureLocation, failureMessage, failResetState) => {
    var failureKey = "".concat(failureLocation, " - ").concat(failureMessage);
    logger(state, 'debug', 'handleFailure', failureMessage);
    state.failureCounts[failureKey] = state.lastFailureKey === failureKey ? (state.failureCounts[failureKey] || 1) + 1 : 1;
    state.lastFailureKey = failureKey;
    state.failureOrigin = failureKey;
    if (state.failureCounts[failureKey] >= 3) {
      logger(state, 'all', 'Script', "Fatal error: \"".concat(failureKey, "\" occurred 3x in a row."));
      bot.terminate();
      return;
    }
    if (failResetState) state.mainState = failResetState;
  },
  endScript: state => {
    bot.breakHandler.setBreakHandlerStatus(false);
    bot.printGameMessage("Terminating ".concat(state.scriptName, "."));
    bot.walking.webWalkCancel();
    bot.events.unregisterAll();
  }
};

var inventoryFunctions = {
  dropItem: (state, itemId, failResetState) => {
    if (bot.inventory.containsId(itemId)) {
      bot.inventory.interactWithIds([itemId], ['Drop']);
      inventoryFunctions.itemInventoryTimeout.absent(state, itemId, failResetState);
      return false;
    }
    return true;
  },
  getFirstExistingItemId: itemIds => {
    if (!bot.inventory.containsAnyIds(itemIds)) return undefined;
    return itemIds.find(itemId => bot.inventory.containsId(itemId));
  },
  getRandomExistingItemId: itemIds => {
    if (!bot.inventory.containsAnyIds(itemIds)) return undefined;
    var existingItemIds = itemIds.filter(itemId => bot.inventory.containsId(itemId));
    if (existingItemIds.length === 0) return undefined;
    return existingItemIds[Math.floor(Math.random() * existingItemIds.length)];
  },
  checkQuantitiesMatch: (state, items) => {
    logger(state, 'debug', "checkQuantitiesMatch", 'Checking inventory item quantities.');
    var _iterator = _createForOfIteratorHelper(items),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        if (bot.inventory.getQuantityOfId(item.itemId) !== item.quantity) return false;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return true;
  },
  itemInventoryTimeout: {
    present: (state, itemId, failResetState) => itemInventoryTimeoutCore(state, itemId, failResetState, true),
    absent: (state, itemId, failResetState) => itemInventoryTimeoutCore(state, itemId, failResetState, false)
  }
};
function itemInventoryTimeoutCore(state, itemId, failResetState) {
  var waitForPresence = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var inInventory = bot.inventory.containsId(itemId);
  var shouldPass = waitForPresence ? inInventory : !inInventory;
  if (!shouldPass) {
    logger(state, 'debug', 'inventoryFunctions.itemInventoryTimeout', "Item ID ".concat(itemId, " ").concat(waitForPresence ? 'not in' : 'still in', " inventory."));
    timeoutManager.add({
      state,
      conditionFunction: () => waitForPresence ? bot.inventory.containsId(itemId) : !bot.inventory.containsId(itemId),
      initialTimeout: 1,
      maxWait: 10,
      onFail: () => generalFunctions.handleFailure(state, 'inventoryFunctions.itemInventoryTimeout', "Item ID ".concat(itemId, " ").concat(waitForPresence ? 'not in' : 'still in', " inventory after 10 ticks."), failResetState)
    });
    return false;
  }
  logger(state, 'debug', 'inventoryFunctions.itemInventoryTimeout', "Item ID ".concat(itemId, " is ").concat(waitForPresence ? 'in' : 'not in', " inventory."));
  return true;
}

var bankFunctions = {
  openBank: state => {
    if (!bot.bank.isOpen()) {
      logger(state, 'debug', "bankFunctions.openBank", 'Opening the bank');
      bot.bank.open();
      timeoutManager.add({
        state,
        conditionFunction: () => bot.bank.isOpen(),
        initialTimeout: 1,
        maxWait: 10,
        onFail: () => generalFunctions.handleFailure(state, 'bankFunctions.openBank', 'Bank is not open after 10 ticks.')
      });
      return false;
    }
    return true;
  },
  closeBank: state => {
    if (bot.bank.isOpen()) {
      logger(state, 'debug', "bankFunctions.closeBank", 'Closing the bank');
      bot.bank.close();
      timeoutManager.add({
        state,
        conditionFunction: () => !bot.bank.isOpen(),
        initialTimeout: 1,
        maxWait: 10,
        onFail: () => generalFunctions.handleFailure(state, 'bankFunctions.closeBank', 'Bank is not closed after 10 ticks.')
      });
      return false;
    }
    return true;
  },
  requireBankOpen: (state, fallbackState) => {
    if (!bot.bank.isOpen()) {
      state.mainState = fallbackState;
      return false;
    }
    return true;
  },
  requireBankClosed: (state, fallbackState) => {
    if (bot.bank.isOpen()) {
      state.mainState = fallbackState;
      return false;
    }
    return true;
  },
  isQuantityLow: (itemId, quantity) => bot.bank.getQuantityOfId(itemId) < quantity,
  anyQuantitiyLow: items => items.some(item => bankFunctions.isQuantityLow(item.id, item.quantity)),
  depositItemsTimeout: {
    all: (state, failResetState) => depositItemsTimeoutBase(state, undefined, failResetState),
    some: (state, itemId, failResetState) => depositItemsTimeoutBase(state, itemId, failResetState)
  },
  withdrawMissingItems: (state, items, failResetState) => {
    var _iterator = _createForOfIteratorHelper(items),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        if (!bot.inventory.containsId(item.id)) {
          logger(state, 'debug', 'bankFunctions.withdrawMissingItems', "Withdrawing item ID ".concat(item.id, " with quantity ").concat(item.quantity));
          item.quantity == 'all' ? bot.bank.withdrawAllWithId(item.id) : bot.bank.withdrawQuantityWithId(item.id, item.quantity);
          if (!inventoryFunctions.itemInventoryTimeout.present(state, item.id, failResetState)) return false;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return true;
  },
  withdrawFirstExisting: (state, itemIds, quantity, failResetState) => {
    var _iterator2 = _createForOfIteratorHelper(itemIds),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var itemId = _step2.value;
        if (bot.bank.getQuantityOfId(itemId) >= quantity) {
          logger(state, 'debug', 'bankFunctions.withdrawFirstExisting', "Withdrawing item ID ".concat(itemId, " with quantity ").concat(quantity));
          bot.bank.withdrawQuantityWithId(itemId, quantity);
          if (!inventoryFunctions.itemInventoryTimeout.present(state, itemId, failResetState)) return false;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return true;
  }
};
var depositItemsTimeoutBase = (state, itemId, failResetState) => {
  var currentEmptySlots = bot.inventory.getEmptySlots();
  if (currentEmptySlots == 28) return true;
  if (!itemId || itemId && bot.inventory.containsId(itemId)) {
    logger(state, 'debug', 'bankFunctions.depositItemsTimeout', "Depositing ".concat(itemId ? "item ID ".concat(itemId) : 'all items'));
    itemId ? bot.bank.depositAllWithId(itemId) : bot.bank.depositAll();
    timeoutManager.add({
      state,
      conditionFunction: () => currentEmptySlots < bot.inventory.getEmptySlots(),
      initialTimeout: 1,
      maxWait: 10,
      onFail: () => generalFunctions.handleFailure(state, 'bankFunctions.depositItemsTimeout', "Failed to deposit ".concat(itemId ? "item ID ".concat(itemId) : 'all items', " after 10 ticks."), failResetState)
    });
    return false;
  }
  return true;
};

function createBasicWindow(title) {
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
  var layout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new java.awt.FlowLayout();
  var buttons = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var callback = arguments.length > 5 ? arguments[5] : undefined;
  var frame = new javax.swing.JFrame(title);
  var panel = new javax.swing.JPanel(layout);
  var buttonMap = {};
  var mousePointer = java.awt.MouseInfo.getPointerInfo().getLocation();
  buttons.forEach(_ref => {
    var label = _ref.label,
      position = _ref.position;
    var button = new javax.swing.JButton(label);
    if (callback) {
      button.addActionListener(() => callback(label, button));
    }
    if (layout instanceof java.awt.BorderLayout && position) {
      panel.add(button, position);
    } else {
      panel.add(button);
    }
    buttonMap[label] = button;
  });
  frame.add(panel);
  frame.setSize(width, height);
  frame.setVisible(true);
  frame.setLocation(mousePointer.getX() - width / 2, mousePointer.getY() - height / 2);
  frame.setDefaultCloseOperation(javax.swing.WindowConstants.DO_NOTHING_ON_CLOSE);
  frame.addWindowListener(new java.awt.event.WindowAdapter({
    windowClosing: () => {
      var response = javax.swing.JOptionPane.showConfirmDialog(frame, 'Are you sure you want to close this window?', 'Confirm Exit', javax.swing.JOptionPane.YES_NO_OPTION, javax.swing.JOptionPane.WARNING_MESSAGE);
      if (response === javax.swing.JOptionPane.YES_OPTION) {
        frame.dispose();
        bot.terminate();
      }
    }
  }));
  return {
    frame,
    panel,
    buttons: buttonMap
  };
}
var addStartButton = (state, frame, panel, colorScheme) => {
  var startButton = createButton('Start Script', () => {
    state.uiCompleted = true;
    frame.dispose();
  }, colorScheme.ACCENT, colorScheme.TEXT, '', true).panel;
  panel.add(startButton, java.awt.BorderLayout.SOUTH);
};
var createMainPanel = (colorScheme, panelTitle) => {
  var mainPanel = createPanel('BorderLayout', undefined, {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15
  }, javax.swing.BorderFactory.createTitledBorder(panelTitle));
  mainPanel.setBackground(colorScheme.BACKGROUND);
  mainPanel.setForeground(colorScheme.TEXT);
  return mainPanel;
};
function createButton(buttonText, onClick, backgroundColor, foregroundColor, tooltip) {
  var enabled = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
  var panel = new javax.swing.JPanel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 5, 0));
  var button = new javax.swing.JButton(buttonText);
  button.addActionListener(() => {
    onClick();
  });
  if (backgroundColor) {
    button.setBackground(backgroundColor);
  }
  if (foregroundColor) {
    button.setForeground(foregroundColor);
  }
  button.setEnabled(enabled);
  panel.add(button);
  return {
    panel,
    button
  };
}
function createDropdown(labelText, variableName, options, defaultOption, textColor) {
  var panel = new javax.swing.JPanel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 5, 0));
  var label = new javax.swing.JLabel(labelText);
  if (textColor) {
    label.setForeground(textColor);
  }
  fixHeight(label);
  panel.add(label, java.awt.BorderLayout.WEST);
  var cachedValue = bot.bmCache.getString(variableName, defaultOption);
  var comboBox = new javax.swing.JComboBox(options);
  comboBox.setSelectedItem(cachedValue);
  if (textColor) {
    comboBox.setForeground(textColor);
  }
  comboBox.addActionListener(() => {
    var selected = comboBox.getSelectedItem();
    bot.bmCache.saveString(variableName, selected);
  });
  fixHeight(comboBox);
  panel.add(comboBox, java.awt.BorderLayout.CENTER);
  return {
    panel,
    comboBox
  };
}
function createPanel() {
  var layout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'FlowLayout';
  var layoutOptions = arguments.length > 1 ? arguments[1] : undefined;
  var padding = arguments.length > 2 ? arguments[2] : undefined;
  var border = arguments.length > 3 ? arguments[3] : undefined;
  var panel = new javax.swing.JPanel();
  switch (layout) {
    case 'FlowLayout':
      {
        if (layoutOptions !== null && layoutOptions !== void 0 && layoutOptions.flowLayout) {
          var _layoutOptions$flowLa, _layoutOptions$flowLa2;
          panel.setLayout(new java.awt.FlowLayout((_layoutOptions$flowLa = layoutOptions.flowLayout.horizontalGap) !== null && _layoutOptions$flowLa !== void 0 ? _layoutOptions$flowLa : 0, (_layoutOptions$flowLa2 = layoutOptions.flowLayout.verticalGap) !== null && _layoutOptions$flowLa2 !== void 0 ? _layoutOptions$flowLa2 : 0));
        } else {
          panel.setLayout(new java.awt.FlowLayout());
        }
        break;
      }
    case 'BorderLayout':
      {
        if (layoutOptions !== null && layoutOptions !== void 0 && layoutOptions.borderLayout) {
          var _layoutOptions$border, _layoutOptions$border2;
          panel.setLayout(new java.awt.BorderLayout((_layoutOptions$border = layoutOptions.borderLayout.hgap) !== null && _layoutOptions$border !== void 0 ? _layoutOptions$border : 0, (_layoutOptions$border2 = layoutOptions.borderLayout.vgap) !== null && _layoutOptions$border2 !== void 0 ? _layoutOptions$border2 : 0));
        } else {
          panel.setLayout(new java.awt.BorderLayout());
        }
        break;
      }
    case 'BoxLayout':
      {
        if (layoutOptions !== null && layoutOptions !== void 0 && layoutOptions.boxLayout) {
          panel.setLayout(new javax.swing.BoxLayout(panel, layoutOptions.boxLayout.axis));
        } else {
          panel.setLayout(new javax.swing.BoxLayout(panel, 1));
        }
        break;
      }
    case 'GridLayout':
      {
        if (layoutOptions !== null && layoutOptions !== void 0 && layoutOptions.gridLayout) {
          var _layoutOptions$gridLa, _layoutOptions$gridLa2, _layoutOptions$gridLa3, _layoutOptions$gridLa4;
          panel.setLayout(new java.awt.GridLayout((_layoutOptions$gridLa = (_layoutOptions$gridLa2 = layoutOptions.gridLayout) === null || _layoutOptions$gridLa2 === void 0 ? void 0 : _layoutOptions$gridLa2.rows) !== null && _layoutOptions$gridLa !== void 0 ? _layoutOptions$gridLa : 0, (_layoutOptions$gridLa3 = (_layoutOptions$gridLa4 = layoutOptions.gridLayout) === null || _layoutOptions$gridLa4 === void 0 ? void 0 : _layoutOptions$gridLa4.columns) !== null && _layoutOptions$gridLa3 !== void 0 ? _layoutOptions$gridLa3 : 0));
          break;
        } else {
          panel.setLayout(new java.awt.GridLayout(0, 0));
        }
        break;
      }
    default:
      {
        panel.setLayout(new java.awt.FlowLayout());
        break;
      }
  }
  if (padding) {
    panel.setBorder(javax.swing.BorderFactory.createEmptyBorder(padding.top, padding.left, padding.bottom, padding.right));
  } else {
    panel.setBorder(javax.swing.BorderFactory.createEmptyBorder(5, 5, 5, 5));
  }
  if (border) {
    panel.setBorder(border);
  }
  return panel;
}
function fixHeight(c) {
  var pref = c.getPreferredSize();
  c.setMaximumSize(new java.awt.Dimension(java.lang.Integer.MAX_VALUE, pref.height));
}

var colorScheme = {
  BACKGROUND: new java.awt.Color(0x000A30),
  PANEL: new java.awt.Color(0x010014),
  ACCENT: new java.awt.Color(0x060254),
  TEXT: new java.awt.Color(0xFFFFFF)
};
var createUi = state => {
  var _createBasicWindow = createBasicWindow(state.scriptName, 325, 150, new java.awt.BorderLayout()),
    frame = _createBasicWindow.frame,
    panel = _createBasicWindow.panel;
  panel.setBackground(colorScheme.BACKGROUND);
  var mainPanel = createMainPanel(colorScheme, 'Combination Selection');
  var combinationDropdown = createDropdown('Item to Make', 'itemCombination', ['Maple longbow (u)', 'Pastry dough', 'Pie shell', 'Ultracompost'], 'Maple longbow (u)', colorScheme.TEXT);
  mainPanel.add(combinationDropdown.panel, java.awt.BorderLayout.CENTER);
  addStartButton(state, frame, panel, colorScheme);
  panel.add(mainPanel, java.awt.BorderLayout.CENTER);
  panel.revalidate();
  panel.repaint();
  return frame;
};

var widgetFunctions = {
  widgetExists: widgetId => Boolean(client.getWidget(widgetId)),
  widgetTimeout: (state, widgetData, interactWhenFound) => {
    if (!widgetFunctions.widgetExists(widgetData.packed_widget_id)) {
      timeoutManager.add({
        state,
        conditionFunction: () => widgetFunctions.widgetExists(widgetData.packed_widget_id) !== null,
        initialTimeout: 1,
        maxWait: 10,
        onFail: () => generalFunctions.handleFailure(state, 'widgetFunctions.widgetTimeout', "Widget ID ".concat(widgetData.packed_widget_id, " not visible after 10 ticks"))
      });
      return false;
    }
    interactWhenFound && bot.widgets.interactSpecifiedWidget(widgetData.packed_widget_id, widgetData.identifier, widgetData.opcode, widgetData.p0);
    return true;
  }
};

var state = {
  antibanEnabled: true,
  antibanTriggered: false,
  debugEnabled: false,
  debugFullState: false,
  failureCounts: {},
  failureOrigin: '',
  gameTick: 0,
  lastFailureKey: '',
  mainState: 'open_bank',
  scriptName: '[Stark] Item Combiner',
  timeout: 0,
  scriptInitialised: false,
  uiCompleted: false,
  itemCombinationData: undefined,
  startDepositAllCompleted: false
};
var onStart = () => {
  try {
    createUi(state);
    logger(state, 'all', 'Script', "Starting ".concat(state.scriptName, "."));
  } catch (error) {
    logger(state, 'all', 'Script', error.toString());
    bot.terminate();
  }
};
var onGameTick = () => {
  bot.breakHandler.setBreakHandlerStatus(false);
  try {
    if (state.uiCompleted) {
      if (!state.scriptInitialised) getGuiItemCombinationData();
      state.scriptInitialised = true;
    } else {
      return;
    }
    if (!generalFunctions.gameTick(state)) return;
    if (!bot.bank.isBanking() && bot.localPlayerIdle() && !bot.walking.isWebWalking() && state.mainState == 'open_bank') bot.breakHandler.setBreakHandlerStatus(true);
    stateManager();
  } catch (error) {
    logger(state, 'all', 'Script', error.toString());
    bot.terminate();
  }
};
var onEnd = () => generalFunctions.endScript(state);
var getGuiItemCombinationData = () => {
  var itemCombination = itemCombinationData.find(itemCombination => itemCombination.combined_item_name.toLowerCase() == bot.bmCache.getString('itemCombination', 'Maple longbow (u)').toLowerCase());
  if (!itemCombination) throw new Error('Item combination not initialized');
  logger(state, 'all', 'Script', "We are creating ".concat(utilityFunctions.convertToTitleCase(itemCombination.combined_item_name), "."));
  state.itemCombinationData = itemCombination;
};
var stateManager = () => {
  logger(state, 'debug', "stateManager", "".concat(state.mainState));
  var itemCombinationData = state.itemCombinationData;
  if (!itemCombinationData) throw new Error('Item combination not initialized');
  switch (state.mainState) {
    case 'open_bank':
      {
        if (!bot.localPlayerIdle()) break;
        if (!bankFunctions.openBank(state)) break;
        state.mainState = 'deposit_items';
        break;
      }
    case 'deposit_items':
      {
        if (!bankFunctions.requireBankOpen(state, 'open_bank') || !bot.localPlayerIdle()) break;
        var timeoutTrue = itemCombinationData.deposit_all || !state.startDepositAllCompleted ? bankFunctions.depositItemsTimeout.all(state, 'close_bank') : bankFunctions.depositItemsTimeout.some(state, itemCombinationData.combined_item_id, 'close_bank');
        if (!timeoutTrue) break;
        state.startDepositAllCompleted = true;
        state.mainState = 'check_bank_quantities';
        break;
      }
    case 'check_bank_quantities':
      {
        if (!bankFunctions.requireBankOpen(state, 'open_bank') || !bot.localPlayerIdle()) break;
        logger(state, 'debug', "stateManager: ".concat(state.mainState), 'Checking bank item quantities.');
        if (bankFunctions.anyQuantitiyLow(itemCombinationData.items)) throw new Error('Ran out of items to combine.');
        state.mainState = 'withdraw_items';
        break;
      }
    case 'withdraw_items':
      {
        if (!bankFunctions.requireBankOpen(state, 'open_bank') || !bot.localPlayerIdle() || bot.bank.isBanking()) break;
        if (!bankFunctions.withdrawMissingItems(state, itemCombinationData.items, 'close_bank')) break;
        state.mainState = 'validate_inventory_quantities';
        break;
      }
    case 'validate_inventory_quantities':
      {
        if (!bot.localPlayerIdle()) break;
        if (!inventoryFunctions.checkQuantitiesMatch(state, itemCombinationData.items.map(item => ({
          itemId: item.id,
          quantity: item.quantity
        })))) {
          generalFunctions.handleFailure(state, "stateManager: ".concat(state.mainState), 'Inventory quantities do not match required quantities.', 'open_bank');
          break;
        }
        state.mainState = 'close_bank';
        break;
      }
    case 'close_bank':
      {
        if (!bot.localPlayerIdle()) break;
        if (!bankFunctions.closeBank(state)) break;
        state.mainState = 'item_interact';
        break;
      }
    case 'item_interact':
      {
        if (!bankFunctions.requireBankClosed(state, 'close_bank') || !bot.localPlayerIdle()) break;
        if (!bot.inventory.containsAllIds(itemCombinationData.items.map(item => item.id))) {
          generalFunctions.handleFailure(state, "stateManager: ".concat(state.mainState), 'Inventory does not contain the correct items.', 'open_bank');
          break;
        }
        var item1 = itemCombinationData.items[0];
        var item2 = itemCombinationData.items[1];
        bot.inventory.itemOnItemWithIds(item1.id, item2.id);
        var widgetData = itemCombinationData.make_widget_data;
        if (widgetData && !widgetFunctions.widgetTimeout(state, widgetData, true)) break;
        state.timeout = itemCombinationData.timeout;
        logger(state, 'debug', "stateManager: ".concat(state.mainState), "Combining ".concat(utilityFunctions.convertToTitleCase(item1.name), " with ").concat(utilityFunctions.convertToTitleCase(item2.name), ". Timeout: ").concat(itemCombinationData.timeout, "."));
        state.mainState = 'open_bank';
        break;
      }
    default:
      {
        state.mainState = 'open_bank';
        break;
      }
  }
};


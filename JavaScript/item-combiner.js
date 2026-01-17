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
  timeout: 54
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
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
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
      action = _ref.action,
      maxAttempts = _ref.maxAttempts,
      retryTimeout = _ref.retryTimeout;
    var failCallback = typeof onFail === 'string' ? () => logger(state, 'all', 'Timeout', onFail) : onFail;
    this.conditions.push({
      conditionFunction,
      maxWait,
      ticksWaited: 0,
      onFail: failCallback,
      action,
      maxAttempts,
      retryTimeout,
      _attempts: 0,
      _retryCooldown: 0
    });
  },
  tick() {
    this.conditions = this.conditions.filter(condition => {
      if (condition.conditionFunction()) return false;
      if (condition.action && (condition.maxAttempts === undefined || condition._attempts < condition.maxAttempts)) {
        while (condition._retryCooldown <= 0 && (condition.maxAttempts === undefined || condition._attempts < condition.maxAttempts)) {
          var _condition$retryTimeo;
          condition.action();
          condition._attempts++;
          if (condition.conditionFunction()) return false;
          condition._retryCooldown = (_condition$retryTimeo = condition.retryTimeout) !== null && _condition$retryTimeo !== void 0 ? _condition$retryTimeo : 1;
          if (condition._retryCooldown > 0) break;
        }
        if (condition._retryCooldown > 0) condition._retryCooldown--;
        if (condition.conditionFunction()) return false;
      }
      condition.ticksWaited++;
      if (condition.maxWait !== undefined && condition.ticksWaited >= condition.maxWait) {
        if (condition.onFail) condition.onFail();
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

var bankFunctions = {
  requireBankOpen: (state, fallbackState) => {
    if (!bot.bank.isOpen()) {
      state.main_state = fallbackState;
      return false;
    }
    return true;
  },
  requireBankClosed: (state, fallbackState) => {
    if (bot.bank.isOpen()) {
      state.main_state = fallbackState;
      return false;
    }
    return true;
  },
  isQuantityLow: (itemId, quantity) => bot.bank.getQuantityOfId(itemId) < quantity,
  anyQuantitiyLow: items => items.some(item => bankFunctions.isQuantityLow(item.id, item.quantity)),
  withdrawMissingItems: (state, items) => {
    var _iterator = _createForOfIteratorHelper(items),
      _step;
    try {
      var _loop = function _loop() {
          var item = _step.value;
          if (!bot.inventory.containsId(item.id)) {
            timeoutManager.add({
              state,
              conditionFunction: () => bot.inventory.containsId(item.id),
              action: () => {
                logger(state, 'debug', 'bankFunctions.withdrawMissingItems', "Withdrawing item ID ".concat(item.id, " with quantity ").concat(item.quantity));
                bot.bank.withdrawQuantityWithId(item.id, item.quantity);
              },
              maxWait: 10,
              maxAttempts: 3,
              retryTimeout: 3,
              onFail: () => "Failed to withdraw item ID ".concat(item.id, " after 3 attempts and 10 ticks.")
            });
            return {
              v: true
            };
          }
        },
        _ret;
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _ret = _loop();
        if (_ret) return _ret.v;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return false;
  }
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

var utilityFunctions = {
  convertToTitleCase: stringToConvert => stringToConvert.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
  coordsToWorldPoint: _ref => {
    var _ref2 = _slicedToArray(_ref, 3),
      x = _ref2[0],
      y = _ref2[1],
      z = _ref2[2];
    return new net.runelite.api.coords.WorldPoint(x, y, z);
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
    for (var _i = 0, _Object$entries = Object.entries(state); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      var type = _typeof(value);
      if (type === 'string' || type === 'number' || type === 'boolean') logger(state, 'debug', 'stateDebugger', "".concat(prefix).concat(key, ": ").concat(String(value)));else if (Array.isArray(value)) logger(state, 'debug', 'stateDebugger', "".concat(prefix).concat(key, " Length: ").concat(value.length));else if (type === 'object' && value !== null) debugFunctions.stateDebugger(value, "".concat(prefix).concat(key, "."));
    }
  }
};

var generalFunctions = {
  gameTick: state => {
    try {
      logger(state, 'debug', 'onGameTick', "Function start. Script game tick ".concat(state.gameTick));
      state.gameTick++;
      if (state.debugEnabled && state.debugFullState) debugFunctions.stateDebugger(state);
      bot.breakHandler.setBreakHandlerStatus(false);
      if (state.timeout > 0) {
        state.timeout--;
        return false;
      }
      timeoutManager.tick();
      if (timeoutManager.isWaiting()) return false;
      if (state.antibanEnabled && antibanFunctions.afkTrigger(state)) return false;
      bot.breakHandler.setBreakHandlerStatus(true);
      return true;
    } catch (error) {
      logger(state, 'all', 'Script', error.toString());
      bot.terminate();
      return false;
    }
  },
  endScript: state => {
    bot.printGameMessage("Terminating ".concat(state.scriptName, "."));
    bot.walking.webWalkCancel();
    bot.events.unregisterAll();
  }
};

var inventoryFunctions = {
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
  checkQuantitiesMatch: items => {
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
  }
};

var state = {
  scriptName: '[Stark] Item Combiner',
  main_state: 'start_state',
  itemCombinationData: undefined,
  antibanTriggered: false,
  startDepositAllCompleted: false,
  gameTick: 0,
  timeout: 0,
  uiCompleted: false,
  scriptInitialised: false,
  antibanEnabled: true,
  debugEnabled: false,
  debugFullState: false
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
  try {
    if (state.uiCompleted) {
      if (!state.scriptInitialised) getGuiItemCombinationData();
      state.scriptInitialised = true;
    } else {
      return;
    }
    if (!generalFunctions.gameTick(state)) return;
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
  logger(state, 'debug', "stateManager: ".concat(state.main_state), "Function start.");
  var itemCombinationData = state.itemCombinationData;
  if (!itemCombinationData) throw new Error('Item combination not initialized');
  switch (state.main_state) {
    case 'start_state':
      {
        if (!bot.localPlayerIdle()) break;
        var startStateTimeoutAction = () => {
          logger(state, 'debug', "stateManager: ".concat(state.main_state), 'Opening the bank');
          bot.bank.open();
        };
        startStateTimeoutAction();
        if (!bot.bank.isOpen()) {
          timeoutManager.add({
            state,
            conditionFunction: () => bot.bank.isOpen(),
            action: () => startStateTimeoutAction(),
            maxWait: 10,
            maxAttempts: 3,
            retryTimeout: 3,
            onFail: () => {
              throw new Error('Bank did not open during `start_state` after 3 attempts and 10 ticks.');
            }
          });
          break;
        }
        state.main_state = 'deposit_items';
        break;
      }
    case 'deposit_items':
      {
        if (!bankFunctions.requireBankOpen(state, 'start_state') || !bot.localPlayerIdle()) break;
        logger(state, 'debug', "stateManager: ".concat(state.main_state), 'Depositing items.');
        itemCombinationData.deposit_all || !state.startDepositAllCompleted ? bot.bank.depositAll() : bot.bank.depositAllWithId(itemCombinationData.combined_item_id);
        state.startDepositAllCompleted = true;
        state.main_state = 'check_bank_quantities';
        break;
      }
    case 'check_bank_quantities':
      {
        if (!bankFunctions.requireBankOpen(state, 'start_state') || !bot.localPlayerIdle()) break;
        logger(state, 'debug', "stateManager: ".concat(state.main_state), 'Checking bank item quantities.');
        if (bankFunctions.anyQuantitiyLow(itemCombinationData.items)) throw new Error('Ran out of items to combine.');
        state.main_state = 'withdraw_items';
        break;
      }
    case 'withdraw_items':
      {
        if (!bankFunctions.requireBankOpen(state, 'start_state') || !bot.localPlayerIdle()) break;
        if (bankFunctions.withdrawMissingItems(state, itemCombinationData.items)) break;
        if (!bot.inventory.containsAllIds(itemCombinationData.items.map(item => item.id))) {
          state.main_state = 'start_state';
          break;
        }
        state.main_state = 'validate_inventory_quantities';
        break;
      }
    case 'validate_inventory_quantities':
      {
        if (!bot.localPlayerIdle()) break;
        logger(state, 'debug', "stateManager: ".concat(state.main_state), 'Checking inventory item quantities.');
        if (!inventoryFunctions.checkQuantitiesMatch(itemCombinationData.items.map(item => ({
          itemId: item.id,
          quantity: item.quantity
        })))) {
          state.main_state = 'start_state';
          break;
        }
        state.main_state = 'close_bank';
        break;
      }
    case 'close_bank':
      {
        if (!bot.localPlayerIdle()) break;
        var closeBankTimeoutAction = () => {
          logger(state, 'debug', "stateManager: ".concat(state.main_state), 'Closing the bank');
          bot.bank.close();
        };
        closeBankTimeoutAction();
        if (bot.bank.isOpen()) {
          timeoutManager.add({
            state,
            conditionFunction: () => !bot.bank.isOpen(),
            action: () => closeBankTimeoutAction(),
            maxWait: 10,
            maxAttempts: 3,
            retryTimeout: 3,
            onFail: () => {
              logger(state, 'debug', "stateManager: ".concat(state.main_state), 'Bank did not close after 3 attempts and 10 ticks.');
              state.main_state = 'start_state';
            }
          });
          break;
        }
        state.main_state = 'item_interact';
        break;
      }
    case 'item_interact':
      {
        if (!bankFunctions.requireBankClosed(state, 'close_bank') || !bot.localPlayerIdle()) break;
        if (!bot.inventory.containsAllIds(itemCombinationData.items.map(item => item.id))) {
          state.main_state = 'start_state';
          break;
        }
        var item1 = itemCombinationData.items[0];
        var item2 = itemCombinationData.items[1];
        var itemInteractTimeoutAction = () => {
          logger(state, 'debug', "stateManager: ".concat(state.main_state), "Combining ".concat(utilityFunctions.convertToTitleCase(item1.name), " with ").concat(utilityFunctions.convertToTitleCase(item2.name), ". Timeout: ").concat(itemCombinationData.timeout, "."));
          bot.inventory.itemOnItemWithIds(item1.id, item2.id);
        };
        itemInteractTimeoutAction();
        var widgetData = itemCombinationData.make_widget_data;
        if (widgetData) {
          if (!client.getWidget(widgetData.packed_widget_id)) {
            timeoutManager.add({
              state,
              conditionFunction: () => client.getWidget(widgetData.packed_widget_id) !== null,
              action: () => itemInteractTimeoutAction(),
              maxWait: 10,
              maxAttempts: 3,
              retryTimeout: 3,
              onFail: () => {
                throw new Error('Make item widget not visible after 3 attempts and 10 ticks.');
              }
            });
            break;
          }
          bot.widgets.interactSpecifiedWidget(widgetData.packed_widget_id, widgetData.identifier, widgetData.opcode, widgetData.p0);
        }
        state.timeout = itemCombinationData.timeout;
        state.main_state = 'start_state';
        break;
      }
    default:
      {
        state.main_state = 'start_state';
        break;
      }
  }
};


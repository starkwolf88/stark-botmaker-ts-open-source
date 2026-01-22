var itemIds = {
  butterfly_jar: 10012,
  snowy_knight: 10016,
  stamina_potion_1: 12631,
  stamina_potion_2: 12629,
  stamina_potion_3: 12627,
  stamina_potion_4: 12625};

var locationCoords = {
  mons_gratia: {
    snowy_knight_area: [1433, 3257, 0]
  },
  quetzacali_gorge: {
    bank: [1519, 3229, 0]
  }};

var npcIds = {
  mons_gratia: {
    snowy_knight: 5554
  }
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

var logger = (state, type, source, message) => {
  var logMessage = "[".concat(source, "] ").concat(message);
  if (type == 'all') bot.printGameMessage(logMessage);
  if (type == 'all' || type == 'debug' && state.debugEnabled) bot.printLogMessage(logMessage);
};

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

var locationFunctions = {
  coordsToWorldPoint: _ref => {
    var _ref2 = _slicedToArray(_ref, 3),
      x = _ref2[0],
      y = _ref2[1],
      z = _ref2[2];
    return new net.runelite.api.coords.WorldPoint(x, y, z);
  },
  localPlayerDistanceFromWorldPoint: worldPoint => client.getLocalPlayer().getWorldLocation().distanceTo(worldPoint),
  isPlayerNearWorldPoint: function isPlayerNearWorldPoint(worldPoint) {
    var tileThreshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    return locationFunctions.localPlayerDistanceFromWorldPoint(worldPoint) <= tileThreshold;
  },
  webWalkTimeout: function webWalkTimeout(state, worldPoint, targetDescription, maxWait) {
    var targetDistance = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 3;
    var isPlayerAtLocation = () => locationFunctions.isPlayerNearWorldPoint(worldPoint, targetDistance);
    if (!isPlayerAtLocation() && !bot.walking.isWebWalking()) {
      logger(state, 'all', 'webWalkTimeout', "Web walking to ".concat(targetDescription));
      bot.walking.webWalkStart(worldPoint);
      timeoutManager.add({
        state,
        conditionFunction: () => isPlayerAtLocation(),
        maxWait,
        onFail: () => generalFunctions.handleFailure(state, 'webWalkTimeout', "Unable to locate player at ".concat(targetDescription, " after ").concat(maxWait, " ticks."))
      });
      return false;
    }
    logger(state, 'debug', 'webWalkTimeout', "Player is at ".concat(targetDescription, "."));
    return true;
  }
};

var npcFunctions = {
  getClosestNpc: npcIds => {
    var npcs = bot.npcs.getWithIds(npcIds);
    if (!(npcs !== null && npcs !== void 0 && npcs.length)) return undefined;
    var closest = null;
    var min = Number.POSITIVE_INFINITY;
    npcs.forEach(npc => {
      var d = client.getLocalPlayer().getWorldLocation().distanceTo(npc.getWorldLocation());
      if (d < min) min = d, closest = npc;
    });
    return closest || undefined;
  },
  getFirstNpc: npcId => bot.npcs.getWithIds([npcId])[0],
  npcExists: npcId => bot.npcs.getWithIds([npcId]).some(npc => npc.getId() === npcId)
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
  mainState: 'walk_to_snowy_knights',
  scriptName: '[Stark] Snowy Knight Catcher',
  timeout: 0,
  useStaminas: bot.variables.getBooleanVariable('Use Staminas')
};
var onStart = () => logger(state, 'all', 'Script', "Starting ".concat(state.scriptName, "."));
var onGameTick = () => {
  bot.breakHandler.setBreakHandlerStatus(false);
  try {
    if (!generalFunctions.gameTick(state)) return;
    if (bot.localPlayerIdle() && !bot.walking.isWebWalking() && state.mainState == 'open_bank') bot.breakHandler.setBreakHandlerStatus(true);
    stateManager();
  } catch (error) {
    logger(state, 'all', 'Script', error.toString());
    bot.terminate();
  }
};
var onEnd = () => generalFunctions.endScript(state);
var scriptLocations = {
  quetzacaliGorgeBank: locationFunctions.coordsToWorldPoint(locationCoords.quetzacali_gorge.bank),
  monsGratiaSnowyKnightArea: locationFunctions.coordsToWorldPoint(locationCoords.mons_gratia.snowy_knight_area)
};
var stateManager = () => {
  logger(state, 'debug', "stateManager", "".concat(state.mainState));
  switch (state.mainState) {
    case 'walk_to_snowy_knights':
      {
        if (!bot.localPlayerIdle() || bot.walking.isWebWalking()) break;
        if (!bot.inventory.containsId(itemIds.butterfly_jar)) {
          state.mainState = 'walk_to_bank';
          break;
        }
        if (!locationFunctions.webWalkTimeout(state, scriptLocations.monsGratiaSnowyKnightArea, 'Snowy Knight start location.', 200)) break;
        state.mainState = 'catch_snowy_knight';
        break;
      }
    case 'catch_snowy_knight':
      {
        if (!bot.localPlayerIdle() || bot.walking.isWebWalking()) break;
        if (!locationFunctions.isPlayerNearWorldPoint(scriptLocations.monsGratiaSnowyKnightArea, 5)) state.mainState = 'walk_to_snowy_knights';
        if (!bot.inventory.containsId(itemIds.butterfly_jar)) {
          state.mainState = 'walk_to_bank';
          break;
        }
        var snowyKnight = npcFunctions.getClosestNpc([npcIds.mons_gratia.snowy_knight]);
        if (snowyKnight) {
          var currentSnowyKnightCount = bot.inventory.getQuantityOfId(itemIds.snowy_knight);
          bot.npcs.interactSupplied(snowyKnight, 'Catch');
          timeoutManager.add({
            state,
            conditionFunction: () => bot.inventory.getQuantityOfId(itemIds.snowy_knight) > currentSnowyKnightCount,
            maxWait: 10
          });
        }
        break;
      }
    case 'walk_to_bank':
      {
        if (!bot.localPlayerIdle() || bot.walking.isWebWalking()) break;
        if (!locationFunctions.webWalkTimeout(state, scriptLocations.quetzacaliGorgeBank, 'Quetzacali Gorge bank.', 200)) break;
        state.mainState = 'open_bank';
        break;
      }
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
        if (!bankFunctions.depositItemsTimeout.all(state, 'close_bank')) break;
        state.mainState = 'check_bank_quantities';
        break;
      }
    case 'check_bank_quantities':
      {
        if (!bankFunctions.requireBankOpen(state, 'open_bank') || !bot.localPlayerIdle()) break;
        logger(state, 'debug', "stateManager: ".concat(state.mainState), 'Checking butterfly jar quantity.');
        if (bankFunctions.isQuantityLow(itemIds.butterfly_jar, 1)) throw new Error('Ran out of Butterfly jars.');
        state.useStaminas && !bankFunctions.isQuantityLow(itemIds.stamina_potion_4, 1) ? state.mainState = 'withdraw_stamina' : state.mainState = 'withdraw_jars';
        break;
      }
    case 'withdraw_stamina':
      {
        if (!bankFunctions.requireBankOpen(state, 'open_bank') || !bot.localPlayerIdle() || bot.bank.isBanking()) break;
        var staminaIds = [itemIds.stamina_potion_1, itemIds.stamina_potion_2, itemIds.stamina_potion_3, itemIds.stamina_potion_4];
        if (!bot.inventory.containsAnyIds(staminaIds) && !bankFunctions.withdrawFirstExisting(state, staminaIds, 1)) break;
        state.mainState = 'withdraw_jars';
        break;
      }
    case 'withdraw_jars':
      {
        if (!bankFunctions.requireBankOpen(state, 'open_bank') || !bot.localPlayerIdle() || bot.bank.isBanking()) break;
        if (bankFunctions.withdrawMissingItems(state, [{
          id: itemIds.butterfly_jar,
          quantity: 'all'
        }], 'close_bank')) break;
        state.mainState = 'walk_to_snowy_knights';
        break;
      }
    default:
      {
        state.mainState = 'walk_to_snowy_knights';
        break;
      }
  }
};


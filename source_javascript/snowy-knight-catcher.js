var itemIds = {
  butterfly_jar: 10012,
  snowy_knight: 10016,
  stamina_potion_4: 12625};

var locationCoords = {
  mons_gratia: {
    snowy_knight_area: [1433, 3257, 0]
  },
  quetzacali_gorge: {
    bank: [1519, 3229, 0]
  }
};

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
  tick(state) {
    this.conditions = this.conditions.filter(condition => {
      if (this.conditions.length === 0) {
        state.stuck_count = 0;
      }
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
      logger(state, 'debug', 'onGameTick', "Function start. Script game tick ".concat(state.gameTick));
      state.gameTick++;
      if (state.debugEnabled && state.debugFullState) debugFunctions.stateDebugger(state);
      if (state.stuck_count > 3) throw new Error("Fatal error with script. Failure origin: ".concat(state.failure_origin));
      if (state.timeout > 0) {
        state.timeout--;
        return false;
      }
      timeoutManager.tick(state);
      if (timeoutManager.isWaiting()) return false;
      state.stuck_count = 0;
      if (state.antibanEnabled && antibanFunctions.afkTrigger(state)) return false;
      return true;
    } catch (error) {
      logger(state, 'all', 'Script', error.toString());
      bot.terminate();
      return false;
    }
  },
  handleFailure: (state, failureLocation, failureMessage, failResetState) => {
    logger(state, 'debug', 'handleFailure', failureMessage);
    state.failure_origin = "".concat(failureLocation, " - ").concat(failureMessage);
    state.stuck_count++;
    if (failResetState) state.main_state = failResetState;
  },
  endScript: state => {
    bot.breakHandler.setBreakHandlerStatus(false);
    bot.printGameMessage("Terminating ".concat(state.scriptName, "."));
    bot.walking.webWalkCancel();
    bot.events.unregisterAll();
  }
};

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
  withdrawMissingItems: (state, items, failResetState) => {
    var _iterator = _createForOfIteratorHelper(items),
      _step;
    try {
      var _loop = function _loop() {
          var item = _step.value;
          if (!bot.inventory.containsId(item.id)) {
            logger(state, 'debug', 'bankFunctions.withdrawMissingItems', "Withdrawing item ID ".concat(item.id, " with quantity ").concat(item.quantity));
            item.quantity == 'all' ? bot.bank.withdrawAllWithId(item.id) : bot.bank.withdrawQuantityWithId(item.id, item.quantity);
            timeoutManager.add({
              state,
              conditionFunction: () => bot.inventory.containsId(item.id),
              initialTimeout: 1,
              maxWait: 10,
              onFail: () => generalFunctions.handleFailure(state, 'bankFunctions.withdrawMissingItems', "Failed to withdraw item ID ".concat(item.id, " after 10 ticks."), failResetState)
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
  },
  depositAllItems: (state, itemId, failResetState) => {
    var currentEmptySlots = bot.inventory.getEmptySlots();
    if (currentEmptySlots == 28) return true;
    if (!itemId || itemId && bot.inventory.containsId(itemId)) {
      logger(state, 'debug', 'bankFunctions.depositAllItems', "Depositing ".concat(itemId ? "item ID ".concat(itemId) : 'all items'));
      itemId ? bot.bank.depositAllWithId(itemId) : bot.bank.depositAll();
      timeoutManager.add({
        state,
        conditionFunction: () => currentEmptySlots < bot.inventory.getEmptySlots(),
        initialTimeout: 1,
        maxWait: 10,
        onFail: () => generalFunctions.handleFailure(state, 'bankFunctions.depositAllItems', "Failed to deposit ".concat(itemId ? "item ID ".concat(itemId) : 'all items', " after 10 ticks."), failResetState)
      });
      return false;
    }
    return true;
  }
};

var locationFunctions = {
  localPlayerDistanceFromWorldPoint: worldPoint => client.getLocalPlayer().getWorldLocation().distanceTo(worldPoint),
  isPlayerNearWorldPoint: function isPlayerNearWorldPoint(worldPoint) {
    var tileThreshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    return locationFunctions.localPlayerDistanceFromWorldPoint(worldPoint) <= tileThreshold;
  }
};

var npcFunctions = {
  getClosestNpc: npcId => {
    var npcs = bot.npcs.getWithIds([npcId]);
    if (npcs) {
      var closestNpc = null;
      var minDistance = Number.MAX_VALUE;
      npcs.forEach(npc => {
        var distance = client.getLocalPlayer().getWorldLocation().distanceTo(npc.getWorldLocation());
        if (distance < minDistance) {
          minDistance = distance;
          closestNpc = npc;
        }
      });
      if (closestNpc) return closestNpc;
      return undefined;
    }
    return undefined;
  },
  getFirstNpc: npcId => bot.npcs.getWithIds([npcId])[0],
  npcExists: npcId => bot.npcs.getWithIds([npcId]).some(npc => npc.getId() === npcId)
};

var state = {
  antibanEnabled: true,
  antibanTriggered: false,
  debugEnabled: false,
  debugFullState: false,
  failure_origin: '',
  gameTick: 0,
  main_state: 'walk_to_snowy_whites',
  scriptName: '[Stark] Snowy Knight Catcher',
  stuck_count: 0,
  timeout: 0,
  useStaminas: bot.variables.getBooleanVariable('Use Staminas')
};
var onStart = () => logger(state, 'all', 'Script', "Starting ".concat(state.scriptName, "."));
var onGameTick = () => {
  bot.breakHandler.setBreakHandlerStatus(false);
  try {
    if (!generalFunctions.gameTick(state)) return;
    if (bot.localPlayerIdle() && !bot.walking.isWebWalking() && state.main_state == 'open_bank') bot.breakHandler.setBreakHandlerStatus(true);
    stateManager();
  } catch (error) {
    logger(state, 'all', 'Script', error.toString());
    bot.terminate();
  }
};
var onEnd = () => generalFunctions.endScript(state);
var scriptLocations = {
  quetzacaliGorgeBank: utilityFunctions.coordsToWorldPoint(locationCoords.quetzacali_gorge.bank),
  monsGratiaSnowyWhiteArea: utilityFunctions.coordsToWorldPoint(locationCoords.mons_gratia.snowy_knight_area)
};
var isPlayerAtSnowyWhites = () => locationFunctions.isPlayerNearWorldPoint(scriptLocations.monsGratiaSnowyWhiteArea);
var getSnowyWhiteCount = () => bot.inventory.getQuantityOfId(itemIds.snowy_knight);
var isPlayerAtBank = () => locationFunctions.isPlayerNearWorldPoint(scriptLocations.quetzacaliGorgeBank);
var stateManager = () => {
  logger(state, 'debug', "stateManager: ".concat(state.main_state), "Function start.");
  switch (state.main_state) {
    case 'walk_to_snowy_whites':
      {
        if (!bot.localPlayerIdle() || bot.walking.isWebWalking()) break;
        if (!bot.inventory.containsId(itemIds.butterfly_jar)) {
          state.main_state = 'walk_to_bank';
          break;
        }
        if (!isPlayerAtSnowyWhites()) {
          logger(state, 'all', "stateManager: ".concat(state.main_state), 'Walking back to catch area.');
          bot.walking.webWalkStart(scriptLocations.monsGratiaSnowyWhiteArea);
          timeoutManager.add({
            state,
            conditionFunction: () => isPlayerAtSnowyWhites(),
            maxWait: 200,
            onFail: () => generalFunctions.handleFailure(state, "stateManager: ".concat(state.main_state), 'Unable to locate player at Mons Gratia after 200 ticks.')
          });
          break;
        }
        logger(state, 'debug', "stateManager: ".concat(state.main_state), 'Player is at start location.');
        state.main_state = 'catch_snowy_knight';
        break;
      }
    case 'catch_snowy_knight':
      {
        if (!bot.localPlayerIdle() || bot.walking.isWebWalking()) break;
        if (!locationFunctions.isPlayerNearWorldPoint(scriptLocations.monsGratiaSnowyWhiteArea, 5)) state.main_state = 'walk_to_snowy_whites';
        if (!bot.inventory.containsId(itemIds.butterfly_jar)) {
          state.main_state = 'walk_to_bank';
          break;
        }
        var snowyKnight = npcFunctions.getClosestNpc(npcIds.mons_gratia.snowy_knight);
        if (snowyKnight) {
          var currentSnowyWhiteCount = getSnowyWhiteCount();
          bot.npcs.interactSupplied(snowyKnight, 'Catch');
          timeoutManager.add({
            state,
            conditionFunction: () => getSnowyWhiteCount() > currentSnowyWhiteCount,
            maxWait: 10
          });
        }
        break;
      }
    case 'walk_to_bank':
      {
        if (!bot.localPlayerIdle() || bot.walking.isWebWalking()) break;
        if (!isPlayerAtBank()) {
          logger(state, 'all', "stateManager: ".concat(state.main_state), 'Walking to the Quetzacali Gorge bank.');
          bot.walking.webWalkStart(scriptLocations.quetzacaliGorgeBank);
          timeoutManager.add({
            state,
            conditionFunction: () => isPlayerAtBank(),
            maxWait: 200,
            onFail: () => generalFunctions.handleFailure(state, "stateManager: ".concat(state.main_state), 'Unable to find Quetzacali Gorge bank after 200 ticks.')
          });
          break;
        }
        state.main_state = 'open_bank';
        break;
      }
    case 'open_bank':
      {
        if (!bot.localPlayerIdle()) break;
        if (!bankFunctions.openBank(state)) break;
        state.main_state = 'deposit_items';
        break;
      }
    case 'deposit_items':
      {
        if (!bankFunctions.requireBankOpen(state, 'open_bank') || !bot.localPlayerIdle()) break;
        if (!bankFunctions.depositAllItems(state, 0, 'close_bank')) break;
        state.main_state = 'check_bank_quantities';
        break;
      }
    case 'check_bank_quantities':
      {
        if (!bankFunctions.requireBankOpen(state, 'open_bank') || !bot.localPlayerIdle()) break;
        logger(state, 'debug', "stateManager: ".concat(state.main_state), 'Checking butterfly jar quantity.');
        if (bankFunctions.isQuantityLow(itemIds.butterfly_jar, 1)) throw new Error('Ran out of Butterfly jars.');
        state.useStaminas ? state.main_state = 'withdraw_stamina' : state.main_state = 'withdraw_jars';
        break;
      }
    case 'withdraw_stamina':
      {
        if (!state.useStaminas || !bankFunctions.requireBankOpen(state, 'open_bank') || !bot.localPlayerIdle() || bot.bank.isBanking()) break;
        if (bankFunctions.withdrawMissingItems(state, [{
          id: itemIds.stamina_potion_4,
          quantity: 1
        }], 'close_bank')) break;
        state.main_state = 'withdraw_jars';
        break;
      }
    case 'withdraw_jars':
      {
        if (!bankFunctions.requireBankOpen(state, 'open_bank') || !bot.localPlayerIdle() || bot.bank.isBanking()) break;
        if (bankFunctions.withdrawMissingItems(state, [{
          id: itemIds.butterfly_jar,
          quantity: 'all'
        }], 'close_bank')) break;
        state.main_state = 'walk_to_snowy_whites';
        break;
      }
    default:
      {
        state.main_state = 'walk_to_snowy_whites';
        break;
      }
  }
};


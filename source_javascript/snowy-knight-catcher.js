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
      if (state.timeout > 0) {
        state.timeout--;
        return false;
      }
      timeoutManager.tick();
      if (timeoutManager.isWaiting()) return false;
      if (state.antibanEnabled && antibanFunctions.afkTrigger(state)) return false;
      return true;
    } catch (error) {
      logger(state, 'all', 'Script', error.toString());
      bot.terminate();
      return false;
    }
  },
  endScript: state => {
    bot.breakHandler.setBreakHandlerStatus(false);
    bot.printGameMessage("Terminating ".concat(state.scriptName, "."));
    bot.walking.webWalkCancel();
    bot.events.unregisterAll();
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
  scriptName: '[Stark] Snowy Knight Catcher',
  main_state: 'walk_to_snowy_whites',
  gameTick: 0,
  timeout: 0,
  useStaminas: true,
  antibanTriggered: false,
  antibanEnabled: true,
  debugEnabled: false,
  debugFullState: false
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
var openBankActionTimeout = () => {
  logger(state, 'debug', "stateManager: ".concat(state.main_state), 'Opening the bank');
  bot.bank.open();
};
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
            onFail: () => {
              throw new Error('Unable to find start point after 200 ticks.');
            }
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
            onFail: () => {
              throw new Error('Unable to find Quetzacali Gorge bank after 200 ticks.');
            }
          });
          break;
        }
        state.main_state = 'open_bank';
        break;
      }
    case 'open_bank':
      {
        if (!bot.localPlayerIdle()) break;
        openBankActionTimeout();
        if (!bot.bank.isOpen()) {
          timeoutManager.add({
            state,
            conditionFunction: () => bot.bank.isOpen(),
            action: () => openBankActionTimeout(),
            maxWait: 10,
            maxAttempts: 3,
            retryTimeout: 3,
            onFail: () => {
              throw new Error('Bank did not open during `open_bank` after 3 attempts and 10 ticks.');
            }
          });
          break;
        }
        state.main_state = 'deposit_items';
        break;
      }
    case 'deposit_items':
      {
        if (!bankFunctions.requireBankOpen(state, 'open_bank') || !bot.localPlayerIdle()) break;
        logger(state, 'debug', "stateManager: ".concat(state.main_state), 'Depositing items.');
        bot.bank.depositAll();
        state.main_state = 'check_bank_quantities';
        break;
      }
    case 'check_bank_quantities':
      {
        if (!bankFunctions.requireBankOpen(state, 'open_bank') || !bot.localPlayerIdle()) break;
        logger(state, 'debug', "stateManager: ".concat(state.main_state), 'Checking butterfly jar quantity.');
        if (bankFunctions.isQuantityLow(itemIds.butterfly_jar, 1)) throw new Error('Ran out of Butterfly jars.');
        state.main_state = 'withdraw_stamina';
        break;
      }
    case 'withdraw_stamina':
      {
        if (state.useStaminas && !bot.inventory.containsId(itemIds.stamina_potion_4) && bot.bank.getQuantityOfId(itemIds.stamina_potion_4)) {
          bot.bank.withdrawAllWithId(itemIds.stamina_potion_4);
          timeoutManager.add({
            state,
            conditionFunction: () => bot.inventory.containsId(itemIds.stamina_potion_4),
            action: () => {
              logger(state, 'debug', "stateManager: ".concat(state.main_state), 'Withdrawing Stamina potion (4).');
              bot.bank.withdrawAllWithId(itemIds.stamina_potion_4);
            },
            maxWait: 10,
            maxAttempts: 3,
            retryTimeout: 3,
            onFail: () => {
              logger(state, 'all', "stateManager: ".concat(state.main_state), 'Failed to withdraw Stamina potion (4) after 3 attempts and 10 ticks.');
              state.main_state = 'open_bank';
            }
          });
        }
        state.main_state = 'withdraw_jars';
        break;
      }
    case 'withdraw_jars':
      {
        if (!bankFunctions.requireBankOpen(state, 'open_bank') || !bot.localPlayerIdle()) break;
        if (!bot.inventory.containsId(itemIds.butterfly_jar)) {
          bot.bank.withdrawAllWithId(itemIds.butterfly_jar);
          timeoutManager.add({
            state,
            conditionFunction: () => bot.inventory.containsId(itemIds.butterfly_jar),
            action: () => {
              logger(state, 'debug', "stateManager: ".concat(state.main_state), 'Withdrawing Butterfly jars.');
              bot.bank.withdrawAllWithId(itemIds.butterfly_jar);
            },
            maxWait: 10,
            maxAttempts: 3,
            retryTimeout: 3,
            onFail: () => {
              logger(state, 'all', "stateManager: ".concat(state.main_state), 'Failed to withdraw Butterfly jars after 3 attempts and 10 ticks.');
              state.main_state = 'open_bank';
            }
          });
        }
        state.main_state = 'walk_to_snowy_whites';
        break;
      }
  }
};


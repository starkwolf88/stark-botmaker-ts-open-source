var locationCoords = {
  ardougne: {
    herb_patch: [2672, 3375, 0]
  },
  catherby: {
    herb_patch: [2813, 3465, 0]
  },
  falador: {
    herb_patch: [3056, 3310, 0]},
  farming_guild: {
    herb_patch: [1240, 3730, 0]
  },
  hosidious: {
    herb_patch: [1740, 3550, 0]
  },
  morytania: {
    herb_patch: [3607, 3532, 0]
  },
  varlamore: {
    herb_patch: [1583, 3095, 0]
  }
};

var objectIds = {
  ardougne: {
    herb_patch: 8152
  },
  catherby: {
    herb_patch: 8151
  },
  falador: {
    herb_patch: 8150
  },
  farming_guild: {
    herb_patch: 33979
  },
  hosidious: {
    herb_patch: 27115
  },
  morytania: {
    herb_patch: 8153
  },
  varlamore: {
    herb_patch: 50697
  }
};

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
  itemInInventoryTimeout: (state, itemId, failResetState) => {
    if (!bot.inventory.containsId(itemId)) {
      logger(state, 'debug', 'inventoryFunctions.itemInInventoryTimeout', "Item ID ".concat(itemId, " not in the inventory."));
      timeoutManager.add({
        state,
        conditionFunction: () => bot.inventory.containsId(itemId),
        initialTimeout: 1,
        maxWait: 10,
        onFail: () => generalFunctions.handleFailure(state, 'inventoryFunctions.itemInInventoryTimeout', "Item ID ".concat(itemId, " not in inventory after 10 ticks."), failResetState)
      });
      return false;
    }
    logger(state, 'debug', 'inventoryFunctions.itemInInventoryTimeout', "Item ID ".concat(itemId, " is in the inventory."));
    return true;
  }
};

var itemIds = {
  bottomlessBucketUltraId: 22997,
  spade: 952};
var itemIdGroups = {
  herb_seeds: [5291, 5292, 5293, 5294, 5295, 5296, 5297, 5298, 5299, 5300, 5301, 5302, 5303, 5304, 30088],
  grimy_herbs: [199, 201, 203, 205, 207, 209, 211, 213, 215, 217, 219, 2485, 3049, 3051, 30094],
  herbs: [249, 251, 253, 255, 257, 259, 261, 263, 265, 267, 269, 2481, 2998, 3000, 30097]
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
  webWalkTimeout: (state, worldPoint, targetDescription, maxWait) => {
    var isPlayerAtLocation = () => locationFunctions.isPlayerNearWorldPoint(worldPoint);
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

var npcIdGroups = {
  tool_leprechaun: [0, 757, 7757, 12109, 12765]
};

var tileFunctions = {
  getAction: (tileObjectId, actionIndexToGet) => bot.objects.getTileObjectComposition(tileObjectId).getActions()[actionIndexToGet],
  getTileObjectById: tileObjectId => {
    var tileObjects = bot.objects.getTileObjectsWithIds([tileObjectId]);
    return tileObjects.find(tileObject => tileObject.getId() === tileObjectId);
  },
  validateTileName: (tileObjectId, tileName) => bot.objects.getTileObjectComposition(tileObjectId).getName() == tileName
};

var widgetData = {
  farming: {
    tool_leprechaun: {
      deposit: {
        rake: {
          packed_widget_id: 8257537,
          identifier: 2,
          opcode: 57,
          p0: -1
        },
        seed_dibbler: {
          packed_widget_id: 8257538,
          identifier: 2,
          opcode: 57,
          p0: -1
        },
        spade: {
          packed_widget_id: 8257539,
          identifier: 2,
          opcode: 57,
          p0: -1
        },
        secateurs: {
          packed_widget_id: 8257540,
          identifier: 2,
          opcode: 57,
          p0: -1
        },
        bottomlessBucket: {
          packed_widget_id: 8257544,
          identifier: 1,
          opcode: 57,
          p0: -1
        }
      },
      withdraw: {
        rake: {
          packed_widget_id: 8192008,
          identifier: 2,
          opcode: 57,
          p0: -1
        },
        seed_dibbler: {
          packed_widget_id: 8192009,
          identifier: 2,
          opcode: 57,
          p0: -1
        },
        spade: {
          packed_widget_id: 8192010,
          identifier: 1,
          opcode: 57,
          p0: -1
        },
        secateurs: {
          packed_widget_id: 8192011,
          identifier: 1,
          opcode: 57,
          p0: -1
        },
        bottomlessBucket: {
          packed_widget_id: 8192015,
          identifier: 1,
          opcode: 57,
          p0: -1
        }
      }
    }
  }
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
  mainState: 'assign_herb_patch',
  scriptName: '[Stark] Herb Run',
  timeout: 0,
  herbPatches: [{
    id: objectIds.ardougne.herb_patch,
    name: 'Ardougne',
    enabled: bot.variables.getBooleanVariable('Ardougne'),
    worldPoint: locationFunctions.coordsToWorldPoint(locationCoords.ardougne.herb_patch),
    inProgress: false,
    composted: false,
    completed: false
  }, {
    id: objectIds.catherby.herb_patch,
    name: 'Catherby',
    enabled: bot.variables.getBooleanVariable('Catherby'),
    worldPoint: locationFunctions.coordsToWorldPoint(locationCoords.catherby.herb_patch),
    inProgress: false,
    composted: false,
    completed: false
  }, {
    id: objectIds.falador.herb_patch,
    name: 'Falador',
    enabled: bot.variables.getBooleanVariable('Falador'),
    worldPoint: locationFunctions.coordsToWorldPoint(locationCoords.falador.herb_patch),
    inProgress: false,
    composted: false,
    completed: false
  }, {
    id: objectIds.farming_guild.herb_patch,
    name: 'Farming Guild',
    enabled: bot.variables.getBooleanVariable('Farming Guild'),
    worldPoint: locationFunctions.coordsToWorldPoint(locationCoords.farming_guild.herb_patch),
    inProgress: false,
    composted: false,
    completed: false
  }, {
    id: objectIds.hosidious.herb_patch,
    name: 'Hosidious',
    enabled: bot.variables.getBooleanVariable('Hosidious'),
    worldPoint: locationFunctions.coordsToWorldPoint(locationCoords.hosidious.herb_patch),
    inProgress: false,
    composted: false,
    completed: false
  }, {
    id: objectIds.morytania.herb_patch,
    name: 'Morytania',
    enabled: bot.variables.getBooleanVariable('Morytania'),
    worldPoint: locationFunctions.coordsToWorldPoint(locationCoords.morytania.herb_patch),
    inProgress: false,
    composted: false,
    completed: false
  }, {
    id: objectIds.varlamore.herb_patch,
    name: 'Varlamore',
    enabled: bot.variables.getBooleanVariable('Varlamore'),
    worldPoint: locationFunctions.coordsToWorldPoint(locationCoords.varlamore.herb_patch),
    inProgress: false,
    composted: false,
    completed: false
  }]
};
var onStart = () => logger(state, 'all', 'Script', "Starting ".concat(state.scriptName, "."));
var onGameTick = () => {
  bot.breakHandler.setBreakHandlerStatus(false);
  try {
    if (!generalFunctions.gameTick(state)) return;
    if (!bot.bank.isBanking() && bot.localPlayerIdle() && !bot.walking.isWebWalking() && state.mainState == 'assign_herb_patch') bot.breakHandler.setBreakHandlerStatus(true);
    stateManager();
  } catch (error) {
    logger(state, 'all', 'Script', error.toString());
    bot.terminate();
  }
};
var onEnd = () => generalFunctions.endScript(state);
var stateManager = () => {
  logger(state, 'debug', "stateManager", "".concat(state.mainState));
  switch (state.mainState) {
    case 'assign_herb_patch':
      {
        var herbPatchNotHarvested = utilityFunctions.getObjectByValues(state.herbPatches, {
          completed: false,
          enabled: true
        });
        if (!herbPatchNotHarvested) {
          if (bot.inventory.containsId(itemIds.spade)) {
            exchangeToolLeprechaun('deposit');
            break;
          }
          throw new Error('All herb patches harvested.');
        }
        herbPatchNotHarvested.inProgress = true;
        state.mainState = 'walk_to_herb_patch';
        break;
      }
    case 'walk_to_herb_patch':
      {
        var herbPatchInProgress = utilityFunctions.getObjectByValues(state.herbPatches, {
          inProgress: true
        });
        if (!herbPatchInProgress) {
          generalFunctions.handleFailure(state, "stateManager (".concat(state.mainState, ")"), 'Could not determine which herb patch is in progress', 'assign_herb_patch');
          break;
        }
        locationFunctions.webWalkTimeout(state, herbPatchInProgress.worldPoint, "".concat(herbPatchInProgress.name), 200);
        state.mainState = 'note_herbs';
        break;
      }
    case 'note_herbs':
      {
        if (!bot.localPlayerIdle()) break;
        if (bot.inventory.containsAnyIds(itemIdGroups.grimy_herbs.concat(itemIdGroups.herbs))) {
          var toolLeprechaun = npcFunctions.getClosestNpc(npcIdGroups.tool_leprechaun);
          if (!toolLeprechaun) {
            generalFunctions.handleFailure(state, "stateManager (".concat(state.mainState, ")"), 'Could not locate Tool Leprechaun', 'walk_to_herb_patch');
            break;
          }
          var randomHerbId = inventoryFunctions.getRandomExistingItemId(itemIdGroups.grimy_herbs.concat(itemIdGroups.herbs));
          randomHerbId && bot.inventory.itemOnNpcWithIds(randomHerbId, toolLeprechaun);
          break;
        }
        state.mainState = 'withdraw_tools';
        break;
      }
    case 'withdraw_tools':
      {
        if (!bot.localPlayerIdle()) break;
        if (!bot.inventory.containsId(itemIds.spade) && !exchangeToolLeprechaun('withdraw')) break;
        state.mainState = 'herb_patch_interaction';
        break;
      }
    case 'herb_patch_interaction':
      {
        if (!bot.localPlayerIdle()) break;
        var _herbPatchInProgress = utilityFunctions.getObjectByValues(state.herbPatches, {
          inProgress: true
        });
        if (!_herbPatchInProgress) {
          generalFunctions.handleFailure(state, "stateManager (".concat(state.mainState, ")"), 'Could not determine which herb patch is in progress.', 'assign_herb_patch');
          break;
        }
        var herbPatchTileObject = tileFunctions.getTileObjectById(_herbPatchInProgress.id);
        if (!herbPatchTileObject || !bot.objects.isNearIds([_herbPatchInProgress.id], 15)) {
          completeHerbPatch(_herbPatchInProgress);
          break;
        }
        var herbPatchState = tileFunctions.getAction(_herbPatchInProgress.id, 0);
        logger(state, 'debug', "stateManager (".concat(state.mainState, ")"), "Herb patch state: ".concat(herbPatchState));
        switch (String(herbPatchState)) {
          case 'Rake':
            {
              bot.objects.interactObject('Herb patch', 'Rake');
              break;
            }
          case 'Clear':
            {
              bot.objects.interactObject('Dead herbs', 'Clear');
              state.timeout = 8;
              break;
            }
          case 'Cure':
            {
              completeHerbPatch(_herbPatchInProgress);
              break;
            }
          case 'Pick':
            {
              bot.objects.interactObject('Herbs', 'Pick');
              break;
            }
          default:
            {
              if (!_herbPatchInProgress.composted) {
                bot.inventory.itemOnObjectWithIds(itemIds.bottomlessBucketUltraId, herbPatchTileObject);
                _herbPatchInProgress.composted = true;
                state.timeout = 7;
                break;
              }
              var herbSeedId = inventoryFunctions.getFirstExistingItemId(itemIdGroups.herb_seeds);
              if (!herbSeedId) throw new Error('Ran out of herb seeds.');
              bot.inventory.itemOnObjectWithIds(herbSeedId, herbPatchTileObject);
              state.timeout = 6;
              completeHerbPatch(_herbPatchInProgress);
              break;
            }
        }
        break;
      }
    default:
      {
        state.mainState = 'assign_herb_patch';
        break;
      }
  }
};
var completeHerbPatch = herbPatchInProgress => {
  logger(state, 'all', "completeHerbPatch (".concat(state.mainState, ")"), 'Moving onto next herb patch.');
  herbPatchInProgress.completed = true;
  herbPatchInProgress.inProgress = false;
  state.mainState = 'assign_herb_patch';
};
var exchangeToolLeprechaun = withdrawDeposit => {
  var toolLeprechaun = npcFunctions.getClosestNpc(npcIdGroups.tool_leprechaun);
  if (!toolLeprechaun) {
    generalFunctions.handleFailure(state, "stateManager (".concat(state.mainState, ")"), 'Could not locate Tool Leprechaun', 'walk_to_herb_patch');
    return false;
  }
  if (!widgetFunctions.widgetExists(widgetData.farming.tool_leprechaun[withdrawDeposit].spade.packed_widget_id)) {
    bot.npcs.interactSupplied(toolLeprechaun, 'Exchange');
    if (!widgetFunctions.widgetTimeout(state, widgetData.farming.tool_leprechaun[withdrawDeposit].spade)) return false;
  }
  Object.values(widgetData.farming.tool_leprechaun[withdrawDeposit]).forEach(w => bot.widgets.interactSpecifiedWidget(w.packed_widget_id, w.identifier, w.opcode, w.p0));
  if (withdrawDeposit == 'withdraw' && !inventoryFunctions.itemInInventoryTimeout(state, itemIds.spade)) return false;
  return true;
};


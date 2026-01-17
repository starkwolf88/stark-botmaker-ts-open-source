function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
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
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var state = {
  interactionActive: {
    toolLeprechaun: false
  }
};
var timeout = 0;
var toolLeprechaunIds = new Set([0, 757, 7757, 12109, 12765]);
var singleWidgetIds = {
  toolLeprechaun: 8192001
};
var fullWidgetIds = {
  toolLeprechaunWithdraw: {
    spade: [8192010, 1, 57, -1],
    secateurs: [8192011, 1, 57, -1],
    bottomlessBucket: [8192015, 1, 57, -1]
  },
  toolLeprechaunDeposit: {
    spade: [8257539, 2, 57, -1],
    secateurs: [8257540, 2, 57, -1],
    bottomlessBucket: [8257544, 1, 57, -1]
  }
};
var bottomlessBucketUltraId = 22997;
var spade = 952;
var herbSeedIds = [5291, 5292, 5293, 5294, 5295, 5296, 5297, 5298, 5299, 5300, 5301, 5302, 5303, 5304, 30088];
var herbIds = [199, 201, 203, 205, 207, 3049, 3051, 209, 211, 213, 215, 217, 219, 30094, 249, 251, 253, 255, 257, 2998, 3000, 259, 261, 263, 265, 267, 269, 30097];
var herbPatches = [{
  id: 8150,
  name: 'Falador',
  active: bot.variables.getBooleanVariable('Falador'),
  worldPoint: new net.runelite.api.coords.WorldPoint(3056, 3310, 0),
  composted: false,
  in_progress: false,
  completed: false
}, {
  id: 8151,
  name: 'Catherby',
  active: bot.variables.getBooleanVariable('Catherby'),
  worldPoint: new net.runelite.api.coords.WorldPoint(2813, 3465, 0),
  composted: false,
  in_progress: false,
  completed: false
}, {
  id: 8152,
  name: 'Ardougne',
  active: bot.variables.getBooleanVariable('Ardougne'),
  worldPoint: new net.runelite.api.coords.WorldPoint(2672, 3375, 0),
  composted: false,
  in_progress: false,
  completed: false
}, {
  id: 8153,
  name: 'Morytania',
  active: bot.variables.getBooleanVariable('Morytania'),
  worldPoint: new net.runelite.api.coords.WorldPoint(3607, 3532, 0),
  composted: false,
  in_progress: false,
  completed: false
}, {
  id: 27115,
  name: 'Hosidious',
  active: bot.variables.getBooleanVariable('Hosidious'),
  worldPoint: new net.runelite.api.coords.WorldPoint(1740, 3550, 0),
  composted: false,
  in_progress: false,
  completed: false
}, {
  id: 33979,
  name: 'Farming Guild',
  active: bot.variables.getBooleanVariable('Farming Guild'),
  worldPoint: new net.runelite.api.coords.WorldPoint(1240, 3730, 0),
  composted: false,
  in_progress: false,
  completed: false
}, {
  id: 50697,
  name: 'Varlamore',
  active: bot.variables.getBooleanVariable('Varlamore'),
  worldPoint: new net.runelite.api.coords.WorldPoint(1583, 3092, 0),
  composted: false,
  in_progress: false,
  completed: false
}];
var onStart = () => bot.printGameMessage('Starting herb run.');
var onGameTick = () => {
  if (timeout > 0 || !bot.localPlayerIdle()) {
    timeout--;
    return;
  }
  getHerbPatchInProgress() ? harvestingLogic() : handleNextHerbPatch();
};
var onEnd = () => {
  bot.printGameMessage("Stopping herb run. Manually stopped.");
  bot.walking.webWalkCancel();
  bot.events.unregisterAll();
};
var terminateBot = function terminateBot() {
  var terminateMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  bot.printGameMessage("Stopping herb run. ".concat(terminateMessage));
  bot.terminate();
};
var getHerbPatchInProgress = () => {
  var _herbPatches$find;
  return (_herbPatches$find = herbPatches.find(herbPatch => herbPatch.in_progress)) !== null && _herbPatches$find !== void 0 ? _herbPatches$find : null;
};
var getHerbPatchState = herbPatch => {
  bot.printLogMessage('Execute getHerbPatchState()');
  if (!bot.objects.isNearIds([herbPatch.id], 15)) {
    completeHerbPatch(herbPatch);
    return null;
  }
  return objectFunctions.tiles.getFirstAction(herbPatch.id);
};
var getRandomHerbPatch = () => {
  bot.printLogMessage('Execute getRandomHerbPatch()');
  var unharvestedActiveHerbPatches = herbPatches.filter(patch => patch.active && !patch.completed);
  if (unharvestedActiveHerbPatches.length > 0) return unharvestedActiveHerbPatches[Math.floor(Math.random() * unharvestedActiveHerbPatches.length)];
};
var handleNextHerbPatch = () => {
  bot.printLogMessage('Execute handleNextHerbPatch()');
  var randomHerbPatchNotHarvested = getRandomHerbPatch();
  if (!randomHerbPatchNotHarvested) {
    if (!handleFarmingEquipment(false)) return;
    return terminateBot('All herb patches harvested.');
  }
  randomHerbPatchNotHarvested.in_progress = true;
  bot.printGameMessage("Web walking to ".concat(randomHerbPatchNotHarvested.name, " herb patch."));
  bot.printLogMessage("Web walking to ".concat(randomHerbPatchNotHarvested.name, " herb patch."));
  bot.walking.webWalkStart(randomHerbPatchNotHarvested.worldPoint);
};
var harvestingLogic = () => {
  bot.printLogMessage('Execute harvestingLogic()');
  var herbPatchInProgress = getHerbPatchInProgress();
  if (!herbPatchInProgress) return;
  if (bot.objects.isNearIds([herbPatchInProgress.id], 15)) {
    if (!handleFarmingEquipment(true)) return;
    return interactWithHerbPatch(herbPatchInProgress);
  }
};
var interactWithHerbPatch = herbPatch => {
  bot.printLogMessage('Execute interactWithHerbPatch()');
  var herbPatchState = getHerbPatchState(herbPatch);
  bot.printLogMessage("".concat(herbPatch.name, " state: ").concat(herbPatchState));
  var herbPatchTileObject = objectFunctions.tiles.getTileObjectById(herbPatch.id);
  if (!herbPatchTileObject) return completeHerbPatch(herbPatch);
  if (bot.inventory.containsAnyIds(herbIds)) {
    var toolLeprechaun = getNearestToolLeprechaun();
    if (toolLeprechaun) {
      var herbId = inventoryFunctions.getRandomExistingItemId(herbIds);
      if (herbId) bot.inventory.itemOnNpcWithIds(herbId, toolLeprechaun);
    }
    return;
  }
  if (herbPatchState == 'Rake') bot.objects.interactObject('Herb patch', 'Rake');
  if (herbPatchState == 'Clear') {
    bot.objects.interactObject('Dead herbs', 'Clear');
    return timeout = randomInt(8, 10);
  }
  if (herbPatchState == 'Pick') bot.objects.interactObject('Herbs', 'Pick');
  if (!herbPatchState && !herbPatch.composted) {
    bot.inventory.itemOnObjectWithIds(bottomlessBucketUltraId, herbPatchTileObject);
    herbPatch.composted = true;
    return timeout = randomInt(8, 10);
  }
  if (!herbPatchState && herbPatch.composted) {
    var herbSeedId = inventoryFunctions.getFirstExistingItemId(herbSeedIds);
    if (!herbSeedId) return terminateBot('Ran out of herb seeds.');
    bot.inventory.itemOnObjectWithIds(herbSeedId, herbPatchTileObject);
    completeHerbPatch(herbPatch);
    return timeout = randomInt(5, 8);
  }
};
var completeHerbPatch = herbPatch => {
  bot.printLogMessage("Completing ".concat(herbPatch.name, "."));
  herbPatch.completed = true;
  herbPatch.in_progress = false;
};
var getNearestToolLeprechaun = () => {
  bot.printLogMessage('Execute getNearestToolLeprechaun()');
  var toolLeprechaunFound;
  var toolLeprechauns = bot.npcs.getWithNames(['Tool Leprechaun']);
  if (toolLeprechauns.length > 0) {
    var _iterator = _createForOfIteratorHelper(toolLeprechauns),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var toolLeprechaun = _step.value;
        if (toolLeprechaunIds.has(toolLeprechaun.getId())) toolLeprechaunFound = toolLeprechaun;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  if (!toolLeprechaunFound) terminateBot('Tool leprechaun could not be found');
  return toolLeprechaunFound;
};
var handleFarmingEquipment = withdraw => {
  bot.printLogMessage("Execute handleFarmingEquipment() - withdraw: ".concat(withdraw));
  if (withdraw && !bot.inventory.containsId(spade) || !withdraw && bot.inventory.containsId(spade)) {
    if (!state.interactionActive.toolLeprechaun) {
      var toolLeprechaun = getNearestToolLeprechaun();
      if (toolLeprechaun) {
        bot.npcs.interactSupplied(toolLeprechaun, 'Exchange');
        state.interactionActive.toolLeprechaun = true;
        timeout = randomInt(1, 3);
      }
    }
    if (client.getWidget(singleWidgetIds.toolLeprechaun)) {
      if (withdraw) {
        var _bot$widgets, _bot$widgets2, _bot$widgets3;
        (_bot$widgets = bot.widgets).interactSpecifiedWidget.apply(_bot$widgets, _toConsumableArray(fullWidgetIds.toolLeprechaunWithdraw.spade));
        (_bot$widgets2 = bot.widgets).interactSpecifiedWidget.apply(_bot$widgets2, _toConsumableArray(fullWidgetIds.toolLeprechaunWithdraw.secateurs));
        (_bot$widgets3 = bot.widgets).interactSpecifiedWidget.apply(_bot$widgets3, _toConsumableArray(fullWidgetIds.toolLeprechaunWithdraw.bottomlessBucket));
      } else {
        var _bot$widgets4, _bot$widgets5, _bot$widgets6;
        (_bot$widgets4 = bot.widgets).interactSpecifiedWidget.apply(_bot$widgets4, _toConsumableArray(fullWidgetIds.toolLeprechaunDeposit.spade));
        (_bot$widgets5 = bot.widgets).interactSpecifiedWidget.apply(_bot$widgets5, _toConsumableArray(fullWidgetIds.toolLeprechaunDeposit.secateurs));
        (_bot$widgets6 = bot.widgets).interactSpecifiedWidget.apply(_bot$widgets6, _toConsumableArray(fullWidgetIds.toolLeprechaunDeposit.bottomlessBucket));
      }
      state.interactionActive.toolLeprechaun = false;
      timeout = randomInt(1, 3);
      return true;
    }
    if (state.interactionActive.toolLeprechaun) return false;
  }
  return true;
};
var inventoryFunctions = {
  getFirstExistingItemId: itemIds => {
    var _itemIds$find;
    if (!bot.inventory.containsAnyIds(itemIds)) return null;
    return (_itemIds$find = itemIds.find(itemId => bot.inventory.containsId(itemId))) !== null && _itemIds$find !== void 0 ? _itemIds$find : null;
  },
  getRandomExistingItemId: itemIds => {
    if (!bot.inventory.containsAnyIds(itemIds)) return null;
    var existingItemIds = itemIds.filter(itemId => bot.inventory.containsId(itemId));
    if (existingItemIds.length === 0) return null;
    return existingItemIds[Math.floor(Math.random() * existingItemIds.length)];
  }
};
var objectFunctions = {
  tiles: {
    getFirstAction: tileObjectId => bot.objects.getTileObjectComposition(tileObjectId).getActions()[0],
    getTileObjectById: tileObjectId => {
      var _tileObjects$find;
      var tileObjects = bot.objects.getTileObjectsWithIds([tileObjectId]);
      return (_tileObjects$find = tileObjects.find(tileObject => tileObject.getId() == tileObjectId)) !== null && _tileObjects$find !== void 0 ? _tileObjects$find : null;
    },
    validateTileName: (tileObjectId, tileName) => bot.objects.getTileObjectComposition(tileObjectId).getName() == tileName
  }
};
var randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


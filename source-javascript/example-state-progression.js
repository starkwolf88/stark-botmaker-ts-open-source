var allDelays = {
  stateManagerDelay: 0,
  globalDelay: 0
};
var delayManager = (delay, value) => {
  if (value) {
    allDelays[delay] = value;
  }
  for (var _i = 0, _Object$keys = Object.keys(allDelays); _i < _Object$keys.length; _i++) {
    var _delay = _Object$keys[_i];
    if (allDelays[_delay] > 0) {
      allDelays[_delay]--;
    }
  }
  return allDelays[delay];
};

var ScriptStates;
(function (ScriptStates) {
  ScriptStates["IDLE"] = "IDLE";
  ScriptStates["RUNNING"] = "RUNNING";
  ScriptStates["COMPLETED"] = "COMPLETED";
  ScriptStates["ERROR"] = "ERROR";
})(ScriptStates || (ScriptStates = {}));
var scriptStateManager = {
  currentState: ScriptStates.IDLE,
  getState: () => {
    return scriptStateManager.currentState;
  },
  setState: state => {
    scriptStateManager.currentState = state;
  }
};

var stateManager = () => {
  if (delayManager('stateManagerDelay') > 0) {
    return;
  }
  try {
    switch (scriptStateManager.currentState) {
      case ScriptStates.IDLE:
        {
          bot.printLogMessage("Current State: ".concat(ScriptStates.IDLE));
          bot.printLogMessage("Setting State to ".concat(ScriptStates.RUNNING));
          scriptStateManager.setState(ScriptStates.RUNNING);
          delayManager('stateManagerDelay', 5);
          break;
        }
      case ScriptStates.RUNNING:
        {
          bot.printLogMessage("Current State: ".concat(ScriptStates.RUNNING));
          bot.printLogMessage("Setting State to ".concat(ScriptStates.COMPLETED));
          scriptStateManager.setState(ScriptStates.COMPLETED);
          delayManager('globalDelay', 5);
          break;
        }
      case ScriptStates.COMPLETED:
        {
          bot.printLogMessage("Current State: ".concat(ScriptStates.COMPLETED));
          bot.printLogMessage("Setting State to ".concat(ScriptStates.IDLE));
          delayManager('stateManagerDelay', 5);
          delayManager('globalDelay', 5);
          scriptStateManager.setState(ScriptStates.ERROR);
          break;
        }
      default:
        {
          bot.printLogMessage("Unknown State: ".concat(scriptStateManager.currentState));
          bot.terminate();
          break;
        }
    }
  } catch (error) {
    bot.printLogMessage("Error: ".concat(error));
    scriptStateManager.setState(ScriptStates.ERROR);
    return;
  }
};

function onStart() {
  bot.printGameMessage('Executed JS onStart Method');
}
function onEnd() {
  bot.printGameMessage('Executed JS onEnd Method');
}
function onGameTick() {
  if (delayManager('globalDelay') > 0) {
    bot.printLogMessage('Global delay is greater than 0, returning early');
    return;
  }
  stateManager();
}


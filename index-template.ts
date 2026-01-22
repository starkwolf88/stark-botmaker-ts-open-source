// Data imports
//

// Function imports
import {logger} from 'src/imports/logger.js';
import {createUi} from './ui.js';
import {generalFunctions} from 'src/imports/general-functions.js';

// Type imports
//

// Variables
const state = {
    antibanEnabled: true,
    antibanTriggered: false,
    debugEnabled: false,
    debugFullState: false,
    failureCounts: {},
    failureOrigin: '',
    gameTick: 0,
    lastFailureKey: '',
    mainState: 'start_state',
    scriptInitialised: false,
    scriptName: 'Script Name',
    uiCompleted: false,
    timeout: 0
};

// Functions
export const onStart = () => {
    try {
        createUi(state);
        logger(state, 'all', 'Script', `Starting ${state.scriptName}.`);
    } catch (error) {
        logger(state, 'all', 'Script', (error as Error).toString());
        bot.terminate();
    }
};

export const onGameTick = () => {

    // Breaks disabled
    bot.breakHandler.setBreakHandlerStatus(false);

    try {
        if (state.uiCompleted) {
            if (!state.scriptInitialised) scriptInitialised();
            state.scriptInitialised = true;
        } else {
            return;
        }
        if (!generalFunctions.gameTick(state)) return;

        // Enable break if not banking, idle, not walking and the `mainState` is `start_state`.
        if (!bot.bank.isBanking() && bot.localPlayerIdle() && !bot.walking.isWebWalking() && state.mainState == 'start_state') bot.breakHandler.setBreakHandlerStatus(true);

        stateManager();
    } catch (error) {
        logger(state, 'all', 'Script', (error as Error).toString());
        bot.terminate();
    }
};

const scriptInitialised = () => bot.printGameMessage('Script initialised');

export const onEnd = () => generalFunctions.endScript(state);

const stateManager = () => {
    logger(state, 'debug', `stateManager`, `${state.mainState}`);

    // Determine main state.
    switch(state.mainState) {

        // Starting state of the script.
        case 'start_state': {
            //
            break;
        }

        case 'next state': {
            //
            break;
        }

        // Default to start state.
        default: {
            state.mainState = 'start_state';
            break;
        }
    }
};
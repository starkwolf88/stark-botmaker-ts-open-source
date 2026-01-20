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

    // Core
    antibanEnabled: true,
    antibanTriggered: false,
    debugEnabled: false,
    debugFullState: false,
    failure_origin: '',
    gameTick: 0,
    main_state: 'start_state',
    scriptName: 'Script Name',
    stuck_count: 0,
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

        // Enable break if not banking, idle, not walking and the `main_state` is `start_state`.
        if (!bot.bank.isBanking() && bot.localPlayerIdle() && !bot.walking.isWebWalking() && state.main_state == 'start_state') bot.breakHandler.setBreakHandlerStatus(true);

        stateManager();
    } catch (error) {
        logger(state, 'all', 'Script', (error as Error).toString());
        bot.terminate();
    }
};

const scriptInitialised() => bot.printGameMessage('Script initialised');

export const onEnd = () => generalFunctions.endScript(state);

const stateManager = () => {
    logger(state, 'debug', `stateManager (${state.main_state})`, `Function start.`);

    // Determine main state.
    switch(state.main_state) {

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
            state.main_state = 'start_state';
            break;
        }
    }
};
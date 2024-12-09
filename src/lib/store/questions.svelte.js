import { STATE } from "../constants";

export const globalState = $state({
  stateApp: STATE.Start,
  selectedCategory: null,
});

export const initApp = () => {
  globalState.stateApp = STATE.Progress;
};

export const endApp = () => {
  globalState.stateApp = STATE.End;
};

export const resetApp = () => {
  globalState.stateApp = STATE.Start;
};

/**
 * @param {string} category
 */

export const updateSelectedCategory = (category) => {
  globalState.selectedCategory = category;
};

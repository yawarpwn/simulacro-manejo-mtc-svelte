import { LIMIT_TIME, STATE } from '../constants'

export const globalState = $state({
  stateApp: STATE.Idle,
  selectedCategory: null,
  timer: LIMIT_TIME,
  progress: 0,
})

export let progress = $state(0)

export const initApp = () => {
  globalState.stateApp = STATE.Progress
}

export const endApp = () => {
  globalState.stateApp = STATE.End
}

export const resetApp = () => {
  globalState.stateApp = STATE.Idle
}

/**
 * @param {string} category
 */

export const updateSelectedCategory = (category) => {
  globalState.selectedCategory = category
}

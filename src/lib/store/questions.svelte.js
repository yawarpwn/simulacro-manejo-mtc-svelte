import { LIMIT_TIME, STATE, CATEGORIES } from '../constants'

export const globalState = $state({
  stateApp: STATE.Idle,
  selectedCategory: CATEGORIES.A1,
  timer: LIMIT_TIME,
  progress: 1,
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

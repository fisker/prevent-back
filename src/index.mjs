const {document, history} = window
const STATE_KEY = 'isPreventState'
const USER_INTERACTION_EVENTS = ['touchstart', 'click', 'keydown', 'keyup']

const isPreventState = () => history.state?.[STATE_KEY]

function setState() {
  if (isPreventState()) {
    return
  }

  history.pushState({[STATE_KEY]: true}, document.title)
}

function bindUserInteractionEvent() {
  const setStateByUserInteraction = () => {
    setState()

    if (isPreventState()) {
      for (const eventType of USER_INTERACTION_EVENTS) {
        window.removeEventListener(eventType, setStateByUserInteraction)
      }
    }
  }

  for (const eventType of USER_INTERACTION_EVENTS) {
    window.addEventListener(eventType, setStateByUserInteraction)
  }
}

const stay = setState
const leave = () => {
  history.back()
}
function bindStateChangeEvent(onAttemptToLeave) {
  window.addEventListener('popstate', () => {
    if (isPreventState()) {
      return
    }

    onAttemptToLeave(stay, leave)
  })
}

function preventBack(onAttemptToLeave) {
  bindUserInteractionEvent()
  bindStateChangeEvent(onAttemptToLeave)
}

export default preventBack
export {stay, leave}

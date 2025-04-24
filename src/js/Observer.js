const ADD_ACTION_CLASS = 'add-action'
const REMOVE_ACTION_CLASS = 'remove-action'

export class Observer {
  constructor(elements, options = {}) {
    this.observedElements = elements
    this.threshold = options.threshold || 0
    this.rootMargin = options.rootMargin || '0px 0px 0px 0px'
    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
      threshold: this.threshold,
      rootMargin: this.rootMargin,
    })
  }

  init() {
    this.observedElements.forEach(el => {
      el.classList.add(REMOVE_ACTION_CLASS)
      this.observer.observe(el)
    })
  }

  handleIntersect(observedElements) {
    observedElements.forEach(element => {
      const { target, isIntersecting } = element

      if (isIntersecting) {
        target.classList.add(ADD_ACTION_CLASS)
        target.classList.remove(REMOVE_ACTION_CLASS)
      } else {
        target.classList.remove(ADD_ACTION_CLASS)
        target.classList.add(REMOVE_ACTION_CLASS)
      }
    })
  }
}

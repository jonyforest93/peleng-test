import './assets/styles/main.scss'
import { Observer } from './js/Observer'
import { ProgressBar } from './js/ProgressBar'

class App {
  constructor() {
    this.timeline = document.querySelector('.timeline-container')
    this.timelineContentElements = Array.from(document.querySelectorAll('.timeline-item .content'))
    this.timelineElements = Array.from(this.timeline.querySelectorAll('.timeline-item'))
    this.firstTimelineElement = this.timelineElements[0]
    this.lastTimelineElement = this.timelineElements[this.timelineElements.length - 1]
    this.markerElements = Array.from(document.querySelectorAll('.timeline-item .marker'))
    this.dateElements = document.querySelectorAll('.timeline-item .date')
  }

  init() {
    this.initProgressBar()
    this.initObservers()
  }

  initProgressBar() {
    if (this.timeline && this.firstTimelineElement && this.lastTimelineElement) {
      const progressBar = new ProgressBar(this.timeline, this.firstTimelineElement, this.lastTimelineElement)
      progressBar.init()
    }
  }

  initObservers() {
    if (this.timelineContentElements.length > 0) {
      const observer = new Observer(this.timelineContentElements, { rootMargin: '0px 0px -20% 0px' })
      observer.init()
    }

    if (this.markerElements.length > 0) {
      const observer = new Observer(this.markerElements, { threshold: 0.5, rootMargin: '0px 0px -50% 0px' })
      observer.init()
    }

    if (this.dateElements.length > 0) {
      const observer = new Observer(this.dateElements, { threshold: 0.5, rootMargin: '0px 0px -50% 0px' })
      observer.init()
    }
  }
}

const app = new App()
app.init()

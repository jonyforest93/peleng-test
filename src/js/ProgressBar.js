import { ComponentCreator } from './utils/ComponentCreator'

export class ProgressBar {
  constructor(parent, startElement, endElement) {
    this.instance = new ComponentCreator('div', { class: ['progress-bar'] })
    this.lineFill = new ComponentCreator('div', { class: ['line-fill'] })
    this.startElement = startElement
    this.endElement = endElement
    this.lineFill.appendTo(this.instance)
    this.instance.appendTo(parent)
    this.onScroll = this.updateFill.bind(this)
  }

  init() {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onScroll)
    this.updateFill()
  }

  calculateCenterOfScreen() {
    const windowHeight = window.innerHeight
    return windowHeight / 2
  }

  setTimelinePosition() {
    const startElementHeight = this.startElement.getBoundingClientRect().height
    const endElementHeight = this.endElement.getBoundingClientRect().height

    const rootTopPosition = startElementHeight / 2
    const rootBottomPosition = endElementHeight / 2

    this.instance.getNode().style.top = `${rootTopPosition}px`
    this.instance.getNode().style.bottom = `${rootBottomPosition}px`
  }

  updateFill() {
    this.setTimelinePosition()

    const rect = this.instance.getNode().getBoundingClientRect()
    const centerY = this.calculateCenterOfScreen()

    const distanceFromTop = centerY - rect.top
    const totalHeight = rect.height

    if (distanceFromTop > 0 && distanceFromTop < totalHeight) {
      const percentage = (distanceFromTop / totalHeight) * 100
      this.lineFill.getNode().style.height = `${percentage}%`
    } else if (distanceFromTop >= totalHeight) {
      this.lineFill.getNode().style.height = '100%'
    } else {
      this.lineFill.getNode().style.height = '0%'
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onScroll)
  }
}

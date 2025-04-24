export class ComponentCreator {
  constructor(tag = 'div', options = {}) {
    this.node = document.createElement(tag)

    if (options.class) {
      options.class.forEach(className => {
        this.node.classList.add(className)
      })
    }
  }

  on(event, handler) {
    this.node.addEventListener(event, handler)
  }

  remove() {
    this.node.remove()
  }

  getNode() {
    return this.node
  }

  appendTo(parent) {
    const target = parent instanceof ComponentCreator ? parent.getNode() : parent
    target.appendChild(this.node)
  }
}

import React from 'react'
import Hammer from 'hammerjs'

import { exitNode, updateNodes } from './updateNodes'
import AlphaContrastRenderer from './AlphaContrastRenderer'
import { createBubble } from './bubble'
import createCanvas, { sizeCanvas, clearCanvas } from './create-canvas'
import { animationLoop, stepper } from './animation'
import styles from './style.css'

const BLUR_RADIUS = 0.06

export default class GooeyBubbles extends React.Component {
  static defaultProps = {
    resized: false,
    expanded: false,
    children: null,
    setBubblesPanEvent: false,
    onExpandBubbles: () => {},
  }

  componentDidMount() {
    this.containerSize = this.getContainerDimensions()

    this.mainCanvas = sizeCanvas(this.dom.canvas, ...this.containerSize)
    this.bubblesCanvas = createCanvas(...this.containerSize)
    this.bubblesCanvas.context = this.bubblesCanvas.getContext('2d')

    this.gooeyRenderer = new AlphaContrastRenderer(this.mainCanvas, this.bubblesCanvas, {
      alphaMultiply: 60,
      alphaSubtract: 30,
    })

    this.nodes = []

    this.loop = animationLoop(tickedTime => {
      this.tick(tickedTime)
    })

    if (this.props.setBubblesPanEvent) this.bindEvents()

    this.componentDidUpdate()
  }

  componentWillReceiveProps(newProps) {
    const oldProps = this.props
    const hasChanged = (propName) => newProps[propName] !== oldProps[propName]

    if (hasChanged('expanded')) {
      this.reset()
    }

    if (hasChanged('windowWidth') || hasChanged('windowHeight')) {
      this.containerSize = this.getContainerDimensions()
      sizeCanvas(this.mainCanvas, ...this.containerSize)
      sizeCanvas(this.bubblesCanvas, ...this.containerSize)
      this.gooeyRenderer.updateSize()
    }
  }

  componentDidUpdate() {
    const { geographicData, visualizationType, expanded, usDataEnabled } = this.props
    const viewSize = this.containerSize
    const viewCenter = this.containerSize.map(s => s / 2)
    if (this.isReset()) {
      this.nodes.forEach(exitNode)
      this.play()

      window.setTimeout(() => {
        updateNodes(this.nodes, geographicData, visualizationType, {viewSize, viewCenter, expanded}, usDataEnabled)
        this.play()
      }, 300)
    } else {
      updateNodes(this.nodes, geographicData, visualizationType, {viewSize, viewCenter, expanded}, usDataEnabled)
      this.play()
    }
  }

  componentWillUnmount() {
    if (this.loop) {
      this.loop.cancel()
    }
  }

  getContainerDimensions() {
    const containerRect = this.dom.container.getBoundingClientRect()
    const containerMinDimension = Math.min(containerRect.width, containerRect.height)
    const containerSize = [
      containerMinDimension,
      containerMinDimension,
    ]

    return containerSize
  }

  dom = {
    container: null,
    canvas: null,
  }

  _play = false
  _reset = false

  play() {
    this._play = true
    this._reset = false
  }

  stop() {
    this._play = false
  }

  isPlaying() {
    return this._play
  }

  isStopped() {
    return !this._play
  }

  reset() {
    this._reset = true
  }

  isReset() {
    return this._reset
  }

  bindEvents() {
    const {
      setBubblesPanEvent,
      onPrevTopic,
      onNextTopic,
      isMobi,
      onPrevVisualization,
      onNextVisualization,
    } = this.props
    let panningOffset = {x: 0, y: 0}
    let nextTopicTransition = false
    let prevTopicTransition = false
    let nextViewTransition = false
    let prevViewTransition = false

    const hammer = new Hammer(this.dom.container)
    hammer.get('pan').set({ enable: isMobi, direction: Hammer.DIRECTION_ALL })

    const PAN_TRIGGER_THRESHOLD = 90

    hammer.on('panup', ev => {
      if (nextTopicTransition) return
      if (!prevTopicTransition) {
        panningOffset.y = ev.deltaY
        setBubblesPanEvent(panningOffset)
      }
      if (ev.deltaY < -PAN_TRIGGER_THRESHOLD && !prevTopicTransition) {
        onNextTopic()
        prevTopicTransition = true
        panningOffset.y = 0
        setBubblesPanEvent(panningOffset)
      }
    })

    hammer.on('pandown', ev => {
      if (prevTopicTransition) return
      if (!nextTopicTransition) {
        panningOffset.y = ev.deltaY
        setBubblesPanEvent(panningOffset)
      }
      if (ev.deltaY > PAN_TRIGGER_THRESHOLD && !nextTopicTransition) {
        onPrevTopic()
        nextTopicTransition = true
        panningOffset.y = 0
        setBubblesPanEvent(panningOffset)
      }
    })

    hammer.on('panright', ev => {
      if (!nextViewTransition) {
        panningOffset.x = ev.deltaX
        setBubblesPanEvent(panningOffset)
      }
      if (ev.deltaX > PAN_TRIGGER_THRESHOLD && !nextViewTransition) {
        onPrevVisualization()
        nextViewTransition = true
      }
    })

    hammer.on('panleft', ev => {
      if (!prevViewTransition) {
        panningOffset.x = ev.deltaX
        setBubblesPanEvent(panningOffset)
      }
      if (ev.deltaX < -PAN_TRIGGER_THRESHOLD && !prevViewTransition) {
        onNextVisualization()
        prevViewTransition = true
      }
    })

    hammer.on('panend', ev => {
      panningOffset.x = 0
      panningOffset.y = 0
      setBubblesPanEvent(panningOffset)
      nextTopicTransition = false
      prevTopicTransition = false
      nextViewTransition = false
      prevViewTransition = false
    })
  }

  tick(timePerFrame) {
    if (this.isStopped()) return
    const { visualizationType, expanded, resized } = this.props
    const nodes = this.nodes
    const showLinks = visualizationType === 'BLOB' && !expanded
    const showText = !resized

    nodes.forEach((node) => {
      const toStop = []
      const stopFunc = isStopped => { toStop.push(isStopped) }
      const damping = 100
      const dampingRadius = node.targetRadius === 0 ? 50 : 200

      // Animation step
      node.radius = stepper(node.radius, node.targetRadius, timePerFrame, dampingRadius, stopFunc)
      node.position[0] = stepper(node.position[0], node.targetPosition[0], timePerFrame, damping, stopFunc)
      node.position[1] = stepper(node.position[1], node.targetPosition[1], timePerFrame, damping, stopFunc)
      node.stop = toStop.every(x => x)

      // Bubble creation (no drawing yet)
      node.bubble = createBubble(this.bubblesCanvas, {
        radius: node.radius,
        position: node.position,
        blur: BLUR_RADIUS,
        color: node.color,
      })
    })

    const mainNode = nodes.find(node => node.isMain)

    clearCanvas(this.bubblesCanvas)
    // Draw stacked on this order:
    // - Secondary bubbles
    if (mainNode) {
      nodes.forEach(node => {
        // Draw links to main bubble
        if (showLinks) {
          node.bubble.drawLink(mainNode.position, mainNode.radius, mainNode.color)
        }
        // Don't draw Main bubble here, do it over everything else
        if (!node.isMain) {
          node.bubble.draw()
        }
      })
      // - Main bubble
      mainNode.bubble.draw()
    } else {
      nodes.forEach(node => {
        node.bubble.draw()
      })
    }

    // - Bubbles texts
    if (showText) {
      nodes.forEach(({ targetRadius, label, bubble }) => {
        if (label === 'OCE') {
          label = 'OCEANIA'
        } else if (label === 'EUR') {
          label = 'EUROPE'
        } else if (label === 'AME') {
          label = 'AMERICAS'
        } else if (label === 'AFR') {
          label = 'AFRICA'
        }

        if (targetRadius > 0) {
          bubble.drawText(label)
        }
      })
    }

    // Update gooey effect
    this.gooeyRenderer.draw()

    if (nodes.every(n => n.stop)) {
      this.stop()
    }
  }

  onMountCanvas = (domEl) => {
    this.dom.canvas = domEl
  }

  onExpandBubbles = () => {
    this.props.onExpandBubbles()
  }

  render() {
    const { resized, children } = this.props

    return (
      <div
        className={resized ? styles.gooeyBubblesRelative : styles.gooeyBubbles}
        onClick={this.expandBubbles}
        ref={domEl => { this.dom.container = domEl }}
      >
        {children}
        <canvas
          ref={this.onMountCanvas}
          className={styles.gooeyBubblesCanvas}
          onClick={this.onExpandBubbles}
        />
      </div>
    )
  }
}

GooeyBubbles.propTypes = {
  geographicData: React.PropTypes.array.isRequired,
  resized: React.PropTypes.bool.isRequired,
  visualizationType: React.PropTypes.string.isRequired,
  expanded: React.PropTypes.bool,
  onExpandBubbles: React.PropTypes.func,
  setBubblesPanEvent: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.bool]),
  children: React.PropTypes.node,
  onPrevTopic: React.PropTypes.func.isRequired,
  onNextTopic: React.PropTypes.func.isRequired,
  onPrevVisualization: React.PropTypes.func.isRequired,
  onNextVisualization: React.PropTypes.func.isRequired,
  isMobi: React.PropTypes.bool.isRequired,
  usDataEnabled: React.PropTypes.bool.isRequired,
}

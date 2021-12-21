import { useSetup } from '../../.test'
import type { SwipeDirection } from './index'
import { useSwipe } from './index'

describe('useSwipe', () => {
  const target = document.createElement('div')
  target.id = 'target'
  document.body.appendChild(target)

  const mockTouchEventInit = (x: number, y: number): TouchEventInit => ({
    touches: [{
      clientX: x,
      clientY: y,
      force: 0,
      identifier: 0,
      pageX: 0,
      pageY: 0,
      radiusX: 0,
      radiusY: 0,
      rotationAngle: 0,
      screenX: 0,
      screenY: 0,
      target,
    }],
  })

  const mockTouchStart = (x: number, y: number) => new TouchEvent('touchstart', mockTouchEventInit(x, y))
  const mockTouchMove = (x: number, y: number) => new TouchEvent('touchmove', mockTouchEventInit(x, y))
  const mockTouchEnd = (x: number, y: number) => new TouchEvent('touchend', mockTouchEventInit(x, y))

  const mockTouchEvents = (target: EventTarget, coords: Array<number[]>) => {
    coords.forEach(([x, y], i) => {
      if (i === 0)
        target.dispatchEvent(mockTouchStart(x, y))
      else if (i === coords.length - 1)
        target.dispatchEvent(mockTouchEnd(x, y))
      else
        target.dispatchEvent(mockTouchMove(x, y))
    })
  }

  const onSwipe = vitest.fn((e: TouchEvent) => {})
  const onSwipeEnd = vitest.fn((e: TouchEvent, direction: SwipeDirection) => {})
  const threshold = 30

  beforeEach(() => {
    vitest.resetAllMocks()
  })

  it.only('test 1', () => {
    useSetup(() => {
      useSwipe(target, { threshold, onSwipe, onSwipeEnd })

      mockTouchEvents(target, [[0, 0], [threshold / 2, 0], [threshold, 0], [threshold, 0]])

      expect(onSwipe).toHaveBeenCalledOnce()
      expect(onSwipeEnd).toHaveBeenCalledOnce()
    })
  })

  it.only('test 2', () => {
    useSetup(() => {
      useSwipe(target, { threshold, onSwipe, onSwipeEnd })

      mockTouchEvents(target, [[0, 0], [threshold / 2, 0], [threshold, 0], [threshold, 0]])

      expect(onSwipe).toHaveBeenCalledOnce()
      expect(onSwipeEnd).toHaveBeenCalledOnce()
    })
  })
})

import { nextTick } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import { Motion } from 'motion-v'
import Cursor from '~/components/cursor.vue'

interface MotionAnimate {
  opacity: number
  scale: number
}

type MotionWrapper = VueWrapper<
  ComponentPublicInstance & { $props: { animate: MotionAnimate } }
>

const getAnimate = (w: VueWrapper) =>
  (w.findComponent(Motion) as unknown as MotionWrapper).props('animate')

const mouseX = ref(0)
const mouseY = ref(0)
const isMobileRef = ref(false)
const isPressedRef = ref(false)
const motionValue = (initial: number) => {
  const v = ref(initial)
  return { value: v, set: (n: number) => (v.value = n) }
}

mockNuxtImport('useMediaQuery', () => () => isMobileRef)
mockNuxtImport('useMouse', () => () => ({ x: mouseX, y: mouseY }))
mockNuxtImport('useMousePressed', () => () => ({ pressed: isPressedRef }))
mockNuxtImport(
  'useMotionValue',
  () => (initial: number) => motionValue(initial),
)
mockNuxtImport('useSpring', () => (v: ReturnType<typeof motionValue>) => v)

describe('Cursor', () => {
  beforeEach(() => {
    mouseX.value = 0
    mouseY.value = 0
    isMobileRef.value = false
    isPressedRef.value = false
    document.documentElement.classList.remove('custom-cursor')
  })

  it('matches snapshot', async () => {
    const wrapper = await mountSuspended(Cursor)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the cursor element', async () => {
    const wrapper = await mountSuspended(Cursor)

    expect(wrapper.find('[data-test-cursor]').exists()).toBe(true)
  })

  it('renders the svg icon', async () => {
    const wrapper = await mountSuspended(Cursor)

    expect(wrapper.find('[data-test-cursor] svg').exists()).toBe(true)
  })

  it('is non-interactive', async () => {
    const wrapper = await mountSuspended(Cursor)

    expect(wrapper.find('[data-test-cursor]').classes()).toContain(
      'pointer-events-none',
    )
  })

  it('is hidden by default before any mouse movement', async () => {
    const wrapper = await mountSuspended(Cursor)

    expect(getAnimate(wrapper)).toMatchObject({ opacity: 0 })
  })

  it('becomes visible after mouse moves on desktop', async () => {
    const wrapper = await mountSuspended(Cursor)

    mouseX.value = 100
    mouseY.value = 200
    await nextTick()

    expect(getAnimate(wrapper)).toMatchObject({ opacity: 1 })
  })

  it('stays hidden after mouse moves on mobile', async () => {
    isMobileRef.value = true
    const wrapper = await mountSuspended(Cursor)

    mouseX.value = 100
    mouseY.value = 200
    await nextTick()

    expect(getAnimate(wrapper)).toMatchObject({ opacity: 0 })
  })

  it('applies pressed scale when mouse is pressed', async () => {
    const wrapper = await mountSuspended(Cursor)

    mouseX.value = 50
    mouseY.value = 50
    await nextTick()

    isPressedRef.value = true
    await nextTick()

    expect(getAnimate(wrapper)).toMatchObject({ scale: 0.8 })
  })

  it('restores full scale when mouse is released', async () => {
    const wrapper = await mountSuspended(Cursor)

    isPressedRef.value = false
    await nextTick()

    expect(getAnimate(wrapper)).toMatchObject({ scale: 1 })
  })

  it('hides when mouse leaves the window', async () => {
    const wrapper = await mountSuspended(Cursor)

    mouseX.value = 100
    mouseY.value = 100
    await nextTick()

    document.dispatchEvent(new Event('mouseleave'))
    await nextTick()

    expect(getAnimate(wrapper)).toMatchObject({ opacity: 0 })
  })

  it('adds the custom-cursor class while mounted', async () => {
    await mountSuspended(Cursor)

    expect(document.documentElement.classList.contains('custom-cursor')).toBe(
      true,
    )
  })

  it('removes the custom-cursor class when unmounted', async () => {
    const wrapper = await mountSuspended(Cursor)

    wrapper.unmount()

    expect(document.documentElement.classList.contains('custom-cursor')).toBe(
      false,
    )
  })
})

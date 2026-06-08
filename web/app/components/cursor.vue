<script setup lang="ts">
const { x, y } = useMouse({ type: 'client', touch: false })
const { pressed } = useMousePressed()
const cursorX = useMotionValue(-100)
const cursorY = useMotionValue(-100)
const spring = { stiffness: 400, damping: 35, mass: 0.4 }
const smoothX = useSpring(cursorX, spring)
const smoothY = useSpring(cursorY, spring)
const visible = ref(false)

watch([x, y], ([newX, newY]) => {
  cursorX.set(newX)
  cursorY.set(newY)
  visible.value = true
})

useEventListener(document, 'mouseleave', () => (visible.value = false))
</script>

<template>
  <Motion
    class="pointer-events-none fixed top-0 left-0 z-9999 -translate-y-1/2"
    :style="{ x: smoothX, y: smoothY }"
    :animate="{ opacity: visible ? 1 : 0, scale: pressed ? 0.8 : 1 }"
    :transition="{ duration: 0.15 }"
  >
    <svg
      class="w-5 text-primary"
      viewBox="0 0 96 105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M82.6664 92C82.6664 92 42.7458 43.5467 17.1664 12.5M72.1665 28.5C72.1665 28.5 52.6664 12.5 17.1664 12.5C6.66642 40.5 17.1665 69 17.1665 69"
        stroke="currentColor"
        stroke-width="25"
        stroke-linecap="round"
      />
    </svg>
  </Motion>
</template>

<style>
@media (pointer: fine) {
  *,
  *::before,
  *::after {
    cursor: none !important;
  }
}
</style>

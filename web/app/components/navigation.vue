<script setup lang="ts">
const { data: config } = await useGlobalConfig()
const { y: scrollY } = useWindowScroll()
const isSmall = useMediaQuery('(max-width: 767px)')
const variant = useState<NavigationVariant>('nav-variant', () => 'default')
const mobileNavOpen = ref(false)

const SCROLL_RANGE = 100

const scrollProgress = computed(() => {
  if (variant.value !== 'default') return '100%'
  return `${Math.min((scrollY.value ?? 0) / SCROLL_RANGE, 1) * 100}%`
})

watch(isSmall, (v: boolean) => {
  if (!v && mobileNavOpen.value) mobileNavOpen.value = false
})

onKeyStroke('Escape', () => (mobileNavOpen.value = false))
</script>

<template>
  <div>
    <header
      data-test-navigation
      class="fixed right-0 left-0 top-0 z-10 py-4"
      :class="
        variant === 'default' ? 'nav-scroll-bg' : 'border-b bg-background'
      "
    >
      <div
        class="content-container grid grid-cols-5 md:grid-cols-3 items-center"
        :class="variant === 'default' ? 'nav-scroll-color' : 'text-foreground'"
      >
        <NuxtLink to="/" class="w-fit" aria-label="home">
          <SvgIcon class="size-10" />
        </NuxtLink>

        <NuxtLink
          to="/"
          class="mx-auto w-fit col-span-3 md:col-span-1"
          aria-label="home"
        >
          <SvgWordmark animated class="h-10" />
          <h1 class="sr-only">{{ config?.name ?? '' }}</h1>
        </NuxtLink>

        <nav
          data-test-navigation-links
          class="hidden justify-end gap-9 md:flex"
        >
          <SanityLink
            v-for="item in config?.navigationLinks"
            :key="item._key"
            v-bind="item.link"
            class="cursor-pointer hover:opacity-60 font-medium transition-opacity"
          >
            {{ item.name }}
          </SanityLink>
        </nav>

        <button
          data-test-navigation-open
          type="button"
          aria-label="open menu"
          class="grid size-11 place-items-center justify-self-end md:hidden"
          @click="mobileNavOpen = true"
        >
          <Icon name="tabler:menu" size="40" />
        </button>
      </div>
    </header>

    <ClientOnly>
      <AnimatePresence>
        <Motion
          v-if="mobileNavOpen"
          data-test-navigation-overlay
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.3, ease: 'easeOut' }"
          class="fixed inset-0 z-50 flex flex-col bg-foreground text-background"
        >
          <div class="content-container grid grid-cols-5 items-center py-4">
            <SvgIcon class="size-10" />

            <div class="justify-self-center col-span-3">
              <SvgWordmark class="h-10" />
            </div>

            <button
              data-test-navigation-close
              type="button"
              aria-label="close menu"
              class="grid size-11 place-items-center justify-self-end"
              @click="mobileNavOpen = false"
            >
              <Icon name="tabler:x" size="40" />
            </button>
          </div>

          <Motion
            as="nav"
            :variants="{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.06, delayChildren: 0.08 },
              },
            }"
            initial="hidden"
            animate="show"
            class="content-container flex flex-1 flex-col justify-center"
          >
            <Motion
              v-for="(item, i) in config?.navigationLinks"
              :key="item._key"
              :variants="{
                hidden: { opacity: 0, y: 16 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] },
                },
              }"
              class="flex items-baseline gap-4 border-b border-background/20 py-3.5"
            >
              <span
                class="w-7 text-[13px] font-semibold tabular-nums text-primary"
              >
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <SanityLink
                v-bind="item.link"
                class="text-[40px] font-medium leading-none tracking-[-0.02em] text-background no-underline w-full"
                @click="mobileNavOpen = false"
              >
                {{ item.name }}
              </SanityLink>
            </Motion>
          </Motion>

          <Motion
            as="footer"
            :initial="{ opacity: 0, y: 16 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{
              duration: 0.5,
              delay: 0.46,
              ease: [0.2, 0.7, 0.2, 1],
            }"
            class="content-container flex items-end justify-between border-t border-background/20 pb-9 pt-6"
          >
            <NuxtLink
              v-if="config?.address.link.url && config?.address.name"
              data-test-navigation-address
              :to="config.address.link.url"
              target="_blank"
              class="text-sm leading-snug text-background"
            >
              {{ config?.address?.name }}
            </NuxtLink>

            <div
              v-if="config?.instagram || config?.facebook"
              class="flex gap-4 items-center"
            >
              <NuxtLink
                v-if="config?.instagram"
                data-test-navigation-instagram
                :to="config.instagram"
                target="_blank"
                aria-label="Instagram"
                class="text-primary"
              >
                <Icon name="tabler:brand-instagram" size="20" />
              </NuxtLink>
              <NuxtLink
                v-if="config?.facebook"
                data-test-navigation-facebook
                :to="config.facebook"
                target="_blank"
                aria-label="Facebook"
                class="text-primary"
              >
                <Icon name="tabler:brand-facebook" size="20" />
              </NuxtLink>
            </div>
          </Motion>
        </Motion>
      </AnimatePresence>
    </ClientOnly>
  </div>
</template>

<style scoped>
.nav-scroll-color {
  color: color-mix(in srgb, var(--foreground) v-bind(scrollProgress), white);
}

.nav-scroll-bg {
  background-color: color-mix(
    in srgb,
    var(--background) v-bind(scrollProgress),
    transparent
  );
  border-bottom: 1px solid
    color-mix(in srgb, var(--border) v-bind(scrollProgress), transparent);
}
</style>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import type { openingHoursVariant } from '~/types/components'

const props = withDefaults(
  defineProps<{
    variant?: openingHoursVariant
    class?: HTMLAttributes['class']
  }>(),
  {
    variant: 'dark',
    class: '',
  },
)

const { data: config } = await useGlobalConfig()

const days: Day[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

const dayLabelMap: Record<Day, string> = {
  monday: 'ma',
  tuesday: 'di',
  wednesday: 'wo',
  thursday: 'do',
  friday: 'vr',
  saturday: 'za',
  sunday: 'zo',
}
</script>

<template>
  <ul data-test-opening-hours :class="cn('w-full', props.class)">
    <li
      v-for="day in days"
      :key="day"
      data-test-opening-hours-day
      class="py-1.5 border-b flex justify-between"
      :class="
        variant === 'light'
          ? 'text-background/85 border-background/15'
          : 'text-muted-foreground border-muted'
      "
    >
      <span data-test-opening-hours-label>{{ dayLabelMap[day] }}</span>
      <span data-test-opening-hours-value>{{
        config?.openingHours?.[day]
      }}</span>
    </li>
  </ul>
</template>

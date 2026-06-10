<script setup lang="ts">
defineProps<{ item: MenuItem }>()
</script>

<template>
  <div data-test-menu-item class="flex flex-col gap-0.5">
    <div class="flex items-center justify-between">
      <h5 data-test-item-name class="relative">
        {{ item.name }}
        <span
          v-if="item.vegan"
          data-test-vegan
          class="absolute top-0 -right-4 text-xs font-bold"
        >
          vg
        </span>
      </h5>
      <small data-test-item-price>
        {{ item.price }}
      </small>
    </div>
    <small v-if="item.ingredients" data-test-item-description>
      {{ item.ingredients }}
    </small>
    <div
      v-if="item.extras?.length"
      data-test-extras
      class="flex flex-col gap-0.5"
    >
      <span
        v-for="(extra, extraIndex) in item.extras"
        :key="extraIndex"
        data-test-extra
        class="h5 flex items-center gap-2"
      >
        <Icon name="tabler:plus" />
        <span data-test-extra-name>{{ extra.name }}</span>
        <span v-if="extra.price" data-test-extra-price class="ml-2">{{
          extra.price
        }}</span>
      </span>
    </div>
  </div>
</template>

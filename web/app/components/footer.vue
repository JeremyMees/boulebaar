<script lang="ts" setup>
const { data: config } = await useGlobalConfig()
</script>

<template>
  <div data-test-footer class="bg-foreground">
    <footer class="content-container pt-16 pb-8 flex flex-col gap-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-16">
        <div class="sm:col-span-2 lg:col-span-3 text-background">
          <Icon
            data-test-footer-wordmark
            name="boulebaar:wordmark"
            mode="svg"
            class="w-full h-auto max-w-lg"
          />
        </div>

        <div class="lg:col-span-2 flex flex-col gap-4">
          <span class="eyebrow text-primary">openingsuren</span>
          <OpeningHours variant="light" />
        </div>

        <div id="contact" class="lg:col-span-2 flex flex-col gap-4">
          <span class="eyebrow text-primary">vind ons</span>
          <div class="text-background/85 small flex flex-col gap-1.5">
            <NuxtLink
              v-if="config?.address.link.url && config?.address.name"
              data-test-address
              :to="config.address.link.url"
              target="_blank"
              class="flex gap-2 items-start"
            >
              <Icon name="tabler:map-pin" class="min-w-4 mt-1.25" />
              {{ config?.address?.name }}
            </NuxtLink>
            <NuxtLink
              v-if="config?.number"
              data-test-number
              :to="`tel:${config.number}`"
              target="_blank"
              class="flex gap-2 items-start"
            >
              <Icon name="tabler:phone" class="min-w-4 mt-1.25" />
              {{ config?.number }}
            </NuxtLink>
            <NuxtLink
              v-if="config?.email"
              data-test-email
              :to="`mailto:${config.email}`"
              target="_blank"
              class="flex gap-2 items-start"
            >
              <Icon name="tabler:mail" class="min-w-4 mt-1.25" />
              {{ config?.email }}
            </NuxtLink>
          </div>
          <div class="text-background/85 flex gap-4">
            <NuxtLink
              v-if="config?.instagram"
              data-test-instagram
              :to="config.instagram"
              target="_blank"
              aria-label="Instagram"
              class="border rounded-full size-10 flex flex-col items-center justify-center"
            >
              <Icon name="tabler:brand-instagram" size="20" />
            </NuxtLink>
            <NuxtLink
              v-if="config?.facebook"
              data-test-facebook
              :to="config.facebook"
              target="_blank"
              aria-label="Facebook"
              class="border rounded-full size-10 flex flex-col items-center justify-center"
            >
              <Icon name="tabler:brand-facebook" size="20" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <div
        class="border-t pt-5 border-background/15 flex flex-wrap items-center gap-x-16 gap-y-4 justify-between"
      >
        <span data-test-footer-copyright class="text-sm text-background/60">
          ©{{ new Date().getFullYear() }} boulebaar · hasselt ·
          <NuxtLink
            to="https://www.meestersites.be"
            target="_blank"
            class="font-semibold"
          >
            ✦ Mees(ter) sites
          </NuxtLink>
        </span>

        <div class="flex gap-1 text-primary">
          <Icon name="boulebaar:icon" size="24" />
          <Icon name="boulebaar:icon" size="24" />
          <Icon name="boulebaar:icon" size="24" />
          <Icon name="boulebaar:icon" size="24" />
        </div>
      </div>
    </footer>
  </div>
</template>

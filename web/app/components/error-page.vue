<script setup lang="ts">
const { data } = await useGlobalConfig()
</script>

<template>
  <section
    data-test-error-page
    class="content-container pt-nav flex w-full max-w-prose flex-1 flex-col items-center justify-center text-center"
  >
    <p aria-hidden="true" class="eyebrow text-accent">foutmelding</p>

    <div
      class="mt-7 font-medium leading-[0.9] tracking-[-0.04em] text-foreground text-[120px] md:text-[200px]"
    >
      404
    </div>

    <div class="my-9 h-0.75 w-16 bg-primary" />

    <h2>Deze pagina staat niet op de kaart</h2>

    <p class="mt-6 max-w-120 text-muted-foreground">
      De link is verlopen of de pagina is verhuisd. keer terug naar de homepage
      of bekijk de kaart.
    </p>

    <div class="mt-10 flex flex-wrap justify-center gap-3.5">
      <Button as-child>
        <NuxtLink to="/">
          <Icon name="tabler:arrow-left" />
          terug naar home
        </NuxtLink>
      </Button>
      <Button variant="outline" as-child>
        <NuxtLink to="/#menu"> bekijk de kaart </NuxtLink>
      </Button>
    </div>

    <div
      v-if="data?.email"
      data-test-error-email
      class="mt-14 w-full border-t pt-7 text-muted-foreground"
    >
      iets kwijt of een vraag? mail ons op
      <NuxtLink
        :to="`mailto:${data.email}`"
        class="font-medium text-foreground underline decoration-accent underline-offset-4"
      >
        {{ data.email }}
      </NuxtLink>
    </div>
  </section>
</template>

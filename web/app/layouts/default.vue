<template>
  <div class="min-h-screen flex flex-col overflow-x-clip">
    <Navigation />

    <main class="relative grow flex flex-col">
      <slot />
    </main>

    <Footer />
  </div>
</template>

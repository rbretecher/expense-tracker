<template>
  <q-page>
    <div
      class="absolute full-width full-height column"
      :class="{
        'q-pa-md': $q.platform.is.desktop,
        'q-pa-sm': !$q.platform.is.desktop,
      }"
    >
      <q-scroll-area
        class="q-scroll-area"
        :class="{'q-pr-lg': $q.platform.is.desktop}"
      >
        <slot></slot>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<style scoped>
.q-scroll-area {
  display: flex;
  flex-grow: 1;
  height: 100%;
}
</style>

<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <q-scroll-area class="q-scroll-area">
        <slot></slot>
      </q-scroll-area>

      <slot name="after-scroll-area"></slot>
    </div>
  </q-page>
</template>


<style scoped>
.q-scroll-area {
  display: flex;
  flex-grow: 1;
  padding-right: 25px;
}
</style>

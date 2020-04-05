<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <q-scroll-area class="q-scroll-area">
        <slot></slot>
      </q-scroll-area>
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

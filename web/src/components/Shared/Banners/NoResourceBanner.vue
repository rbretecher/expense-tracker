<template>
  <q-banner
    rounded
    class="bg-grey-3"
  >
    <template v-slot:avatar>
      <q-icon
        name="help_outline"
        color="primary"
      />
    </template>
    <slot></slot>
  </q-banner>
</template>

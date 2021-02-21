<template>
  <q-banner
    inline-actions
    rounded
    class="bg-grey-3"
  >
    <template v-slot:avatar>
      <q-icon
        :name="icon"
        color="primary"
      />
    </template>
    <slot></slot>
  </q-banner>
</template>

<script>
export default {
  props: ['icon'],
};
</script>

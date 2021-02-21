<template>
  <q-btn
    unelevated
    outline
    :icon="icon"
    type="submit"
    color="primary"
    :label="label"
    class="absolute-top-right q-mt-sm"
    @click="$emit('click', $event)"
  />
</template>

<script>
export default {
  props: ['icon', 'label'],
};
</script>

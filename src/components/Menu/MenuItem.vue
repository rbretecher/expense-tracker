<template>
  <q-item
    clickable
    tag="a"
    :to="to"
    exact
    active-class="active"
  >
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label
        caption
        v-if="caption"
      >{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ['to', 'icon', 'label', 'caption'],
};
</script>

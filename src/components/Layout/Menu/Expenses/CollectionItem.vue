<template>
  <q-item
    clickable
    tag="a"
    :to="`/expenses/${collection.id}`"
    exact
    active-class="active"
  >
    <q-item-section avatar>
      <q-icon
        :name="collection.iconName"
        :color="collection.iconColor"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ collection.name }}</q-item-label>
      <q-item-label caption>{{ collection.count }} expenses</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'CollectionItem',
  props: ['collection'],
};
</script>

<style lang="scss">
.active {
  background: $blue-1;
}
</style>

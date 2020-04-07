<template>
  <div>
    <q-expansion-item
      v-if="hasChildren"
      :header-inset-level="0"
      :content-inset-level="0.5"
      :icon="collection.icon"
      :label="collection.name"
      default-opened
      :caption="`${collection.count} expenses`"
    >
      <q-list>
        <collection-item
          v-for="(child, key) in children(id)"
          :key="key"
          :id="key"
          :collection="child"
        />
      </q-list>
    </q-expansion-item>

    <q-item
      v-else
      clickable
      tag="a"
      :to="`/expenses/${id}`"
      exact
      active-class="active"
    >
      <q-item-section avatar>
        <q-icon :name="collection.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ collection.name }}</q-item-label>
        <q-item-label caption>{{ collection.count }} expenses</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CollectionItem',
  props: ['id', 'collection'],
  computed: {
    ...mapGetters('collections', ['children']),
    hasChildren() {
      return Object.keys(this.children(this.id)).length !== 0;
    },
  },
};
</script>

<style lang="scss">
.active {
  background: $blue-1;
}
</style>

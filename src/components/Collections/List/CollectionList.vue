<template>
  <q-list
    separator
    bordered
    class="collection-list"
  >
    <collection-list-item
      v-for="(collection, key) in collections"
      :key="key"
      :id="key"
      :collection="collection"
    />
  </q-list>
</template>

<script>
import CollectionListItem from 'src/components/Collections/List/CollectionListItem';

export default {
  props: ['collections'],
  components: {
    CollectionListItem,
  },
};
</script>

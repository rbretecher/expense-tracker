<template>
  <scroll-page
    title="Collections"
    actionName="Add new collection"
    :actionModel.sync="showAddCollection"
  >
    <collection-list
      v-if="collections.length"
      :collections="collections"
    />

    <no-resource-banner v-else>
      There is no collection yet. Add a new collection and it will show up here.
    </no-resource-banner>

    <app-dialog :showDialog.sync="showAddCollection">
      <add-collection
        @close="showAddCollection = false"
        :collectionId="collectionId"
      />
    </app-dialog>
  </scroll-page>
</template>

<script>
import { mapState } from 'vuex';
import mixinPage from 'src/mixins/mixin-page';
import CollectionList from 'src/components/Collections/List/CollectionList';
import AddCollection from 'src/components/Collections/Modals/AddCollection';

export default {
  mixins: [mixinPage],
  props: ['collectionId'],
  data() {
    return {
      showAddCollection: false,
    };
  },
  components: {
    CollectionList,
    AddCollection,
  },
  computed: {
    ...mapState('collections', ['collections']),
  },
};
</script>

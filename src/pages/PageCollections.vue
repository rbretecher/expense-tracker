<template>
  <scroll-page
    title="Collections"
    actionName="Add new collection"
    :actionModel.sync="showAddCollection"
  >
    <collection-breadcrumbs
      v-if="collectionId"
      :parents="parents(collectionId)"
    />

    <collection-list
      v-if="Object.keys(currentCollections).length"
      :collections="currentCollections"
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
import { mapGetters } from 'vuex';
import mixinPage from 'src/mixins/mixin-page';
import CollectionList from 'src/components/Collections/List/CollectionList';
import AddCollection from 'src/components/Collections/Modals/AddCollection';
import CollectionBreadcrumbs from 'src/components/Collections/CollectionBreadcrumbs';

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
    CollectionBreadcrumbs,
  },
  computed: {
    ...mapGetters('collections', ['rootCollections', 'children', 'parents']),
    currentCollections() {
      if (!this.collectionId) {
        return this.rootCollections;
      }
      return this.children(this.collectionId);
    },
  },
};
</script>

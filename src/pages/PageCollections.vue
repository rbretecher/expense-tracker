<template>
  <scroll-page>
    <q-btn
      unelevated
      outline
      icon="add_circle"
      type="submit"
      color="primary"
      label="Add new collection"
      class="absolute-top-right q-mt-sm"
      @click="showAddCollection = true"
    />
    <big-title>Collections</big-title>

    <collection-breadcrumbs
      v-if="collectionId"
      :parents="parents(collectionId)"
    />

    <collection-list
      v-if="Object.keys(currentCollections).length"
      :collections="currentCollections"
    />

    <no-collection-banner v-else />

    <q-dialog
      v-model="showAddCollection"
      position="top"
      no-refocus
    >
      <add-collection
        @close="showAddCollection = false"
        :collectionId="collectionId"
      />
    </q-dialog>
  </scroll-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ScrollPage from 'src/components/Shared/ScrollPage';
import BigTitle from 'src/components/Shared/BigTitle';
import CollectionList from 'src/components/Collections/List/CollectionList';
import AddCollection from 'src/components/Collections/Modals/AddCollection';
import NoCollectionBanner from 'src/components/Collections/NoCollectionBanner';
import CollectionBreadcrumbs from 'src/components/Collections/CollectionBreadcrumbs';

export default {
  props: ['collectionId'],
  data() {
    return {
      showAddCollection: false,
    };
  },
  components: {
    ScrollPage,
    BigTitle,
    CollectionList,
    AddCollection,
    NoCollectionBanner,
    CollectionBreadcrumbs,
  },
  computed: {
    ...mapState('collections', ['collections']),
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

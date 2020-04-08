<template>
  <scroll-page>
    <right-side-button
      label="Add new collection"
      icon="add_circle"
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

    <no-resource-banner v-else>
      There is no collection yet. Add a new collection and it will show up here.
    </no-resource-banner>

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
import NoResourceBanner from 'src/components/Shared/Banners/NoResourceBanner';
import CollectionBreadcrumbs from 'src/components/Collections/CollectionBreadcrumbs';
import RightSideButton from 'src/components/Shared/Buttons/RightSideButton';

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
    NoResourceBanner,
    CollectionBreadcrumbs,
    RightSideButton,
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

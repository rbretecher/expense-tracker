<template>
  <q-item
    clickable
    v-ripple
    @click="exploreCollection"
  >
    <q-item-section avatar>
      <q-icon
        :name="collection.icon.name"
        :color="collection.icon.color"
      />
    </q-item-section>
    <q-item-section>{{ collection.name }}</q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditCollection = true"
          flat
          round
          dense
          color="green-5"
          icon="edit"
        />
        <q-btn
          @click.stop="confirmDeleteCollection"
          flat
          round
          dense
          color="red-5"
          icon="delete"
          :disabled="collection.count !== 0"
        />
      </div>
    </q-item-section>

    <app-dialog :showDialog.sync="showEditCollection">
      <edit-collection
        :id="id"
        :collection="collection"
        @close="showEditCollection = false"
      />
    </app-dialog>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex';
import EditCollection from 'src/components/Collections/Modals/EditCollection';
import AppDialog from 'src/components/Shared/Dialog/Dialog';

export default {
  props: ['id', 'collection'],
  data() {
    return {
      showEditCollection: false,
    };
  },
  components: {
    EditCollection,
    AppDialog,
  },
  methods: {
    ...mapActions('collections', ['deleteCollection']),
    confirmDeleteCollection() {
      this.$q.dialog({
        icon: 'delete',
        title: 'Delete collection',
        message: 'Are you sure you want to delete this collection ?',
        ok: true,
        cancel: true,
      }).onOk(() => {
        this.deleteCollection(this.id);
      });
    },
    exploreCollection() {
      this.$router.push(`/collections/${this.id}`).catch(() => { });
    },
  },
};
</script>

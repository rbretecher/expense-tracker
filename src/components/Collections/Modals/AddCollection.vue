<template>
  <modal
    title="Add collection"
    @success="saveCollection"
  >
    <modal-name-input
      :name.sync="formData.name"
      :autofocus="$q.platform.is.desktop"
    />
    <modal-icon-input :name.sync="formData.icon.name" />
  </modal>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import mixinAddEditCollection from 'src/mixins/mixin-add-edit-collection';

export default {
  mixins: [mixinAddEditCollection],
  props: ['collectionId'],
  computed: {
    ...mapState('users', ['currentUser']),
  },
  methods: {
    ...mapActions('collections', ['addCollection']),
    saveCollection() {
      this.addCollection({ collection: this.formData, user: this.currentUser });
      this.$emit('close');
    },
  },
  mounted() {
    if (this.collectionId) {
      this.formData.collection = this.collectionId;
    }
  },
};
</script>

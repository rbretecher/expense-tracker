<template>
  <modal
    title="Add collection"
    @success="saveCollection"
  >
    <modal-collection-name
      :name.sync="formData.name"
      autofocus="true"
      class="q-mb-sm"
    />
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditCollection from 'src/mixins/mixin-add-edit-collection';

export default {
  mixins: [mixinAddEditCollection],
  props: ['collectionId'],
  methods: {
    ...mapActions('collections', ['addCollection']),
    saveCollection() {
      this.addCollection(this.formData);
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

<template>
  <modal
    title="Edit category"
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
  props: ['id', 'collection'],
  methods: {
    ...mapActions('collections', ['updateCollection']),
    saveCollection() {
      this.updateCollection({
        id: this.id,
        updates: this.formData,
      });
      this.$emit('close');
    },
  },
  mounted() {
    this.formData = { ...this.collection };
  },
};
</script>

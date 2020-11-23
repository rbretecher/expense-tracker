<template>
  <modal
    title="Edit category"
    @success="saveCollection"
  >
    <modal-name-input
      :name.sync="formData.name"
      :autofocus="$q.platform.is.desktop"
    />
    <modal-icon-input :name.sync="formData.iconName" />
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditCollection from 'src/mixins/mixin-add-edit-collection';

export default {
  mixins: [mixinAddEditCollection],
  props: ['collection'],
  methods: {
    ...mapActions('collections', ['updateCollection']),
    saveCollection() {
      this.updateCollection(this.formData);
      this.$emit('close');
    },
  },
  mounted() {
    this.formData = {
      ...this.collection,
    };
  },
};
</script>

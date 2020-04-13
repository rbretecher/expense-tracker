<template>
  <modal
    title="Add user"
    @success="saveUser"
  >
    <modal-name-input
      :name.sync="formData.name"
      :autofocus="$q.platform.is.desktop"
    />
    <modal-icon-color-input :icon.sync="formData.icon" />
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditUser from 'src/mixins/mixin-add-edit-user';

export default {
  mixins: [mixinAddEditUser],
  methods: {
    ...mapActions('users', ['addUser']),
    saveUser() {
      this.addUser(this.formData);
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

<template>
  <modal
    title="Add user"
    @success="saveUser"
  >
    <modal-name-input
      :name.sync="formData.name"
      autofocus="true"
      class="q-mb-sm"
    />

    <modal-icon-input :icon.sync="formData.icon.name" />
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

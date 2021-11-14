<template>
  <modal title="Edit user" @success="saveUser">
    <modal-name-input
      v-model:name="formData.name"
      :autofocus="$q.platform.is.desktop"
    />

    <modal-email-input v-model:email="formData.email" />

    <modal-icon-color-input
      v-model:iconName="formData.iconName"
      v-model:iconColor="formData.iconColor"
    />
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditUser from 'src/mixins/mixin-add-edit-user';

export default {
  mixins: [mixinAddEditUser],
  props: ['user'],
  methods: {
    ...mapActions('users', ['updateUser']),
    saveUser() {
      this.updateUser(this.formData);
      this.$emit('close');
    },
  },
  mounted() {
    this.formData = {
      ...this.user,
    };
  },
};
</script>

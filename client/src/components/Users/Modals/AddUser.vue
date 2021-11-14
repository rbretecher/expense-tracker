<template>
  <modal title="Add user" @success="saveUser">
    <modal-name-input
      v-model:name="formData.name"
      :autofocus="$q.platform.is.desktop"
    />

    <modal-email-input v-model:email="formData.email" />

    <modal-icon-color-input
      v-model:iconName="formData.iconName"
      v-model:iconColor="formData.iconColor"
    />

    <modal-password-input v-model:password="formData.password" />
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditUser from 'src/mixins/mixin-add-edit-user';
import ModalPasswordInput from 'src/components/Shared/Modals/ModalPasswordInput';

export default {
  mixins: [mixinAddEditUser],
  methods: {
    ...mapActions('users', ['addUser']),
    saveUser() {
      this.addUser(this.formData);
      this.$emit('close');
    },
  },
  components: {
    ModalPasswordInput,
  },
};
</script>

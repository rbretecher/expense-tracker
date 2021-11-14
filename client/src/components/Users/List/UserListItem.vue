<template>
  <q-item clickable v-ripple @click="showEditUser = true">
    <q-item-section avatar>
      <q-icon :name="user.iconName" :color="user.iconColor" />
    </q-item-section>
    <q-item-section>{{ user.name }}</q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="confirmDeleteUser"
          flat
          round
          dense
          color="red-5"
          icon="delete"
        />
      </div>
    </q-item-section>

    <app-dialog v-model:showDialog="showEditUser">
      <edit-user :user="user" @close="showEditUser = false" />
    </app-dialog>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex';
import EditUser from 'src/components/Users/Modals/EditUser';
import AppDialog from 'src/components/Shared/Dialog/Dialog';

export default {
  props: ['user'],
  data() {
    return {
      showEditUser: false,
    };
  },
  components: {
    EditUser,
    AppDialog,
  },
  methods: {
    ...mapActions('users', ['deleteUser']),
    confirmDeleteUser() {
      this.$q.dialog({
        icon: 'delete',
        title: 'Delete user',
        message: 'Are you sure you want to delete this user ?',
        ok: true,
        cancel: true,
      }).onOk(() => {
        this.deleteUser(this.user.id);
      });
    },
  },
};
</script>

<template>
  <div>
    <page-spinner v-if="!usersLoaded" />

    <scroll-page
      v-else
      title="Users"
      actionName="Add new user"
      :actionModel.sync="showAddUser"
    >
      <user-list
        v-if="Object.keys(users).length"
        :users="users"
      />

      <no-resource-banner v-else>
        There is no user. Add a user and it will have access to your collections.
      </no-resource-banner>

      <app-dialog :showDialog.sync="showAddUser">
        <add-user @close="showAddUser = false" />
      </app-dialog>
    </scroll-page>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import mixinPage from 'src/mixins/mixin-page';
import UserList from 'src/components/Users/List/UserList';
import AddUser from 'src/components/Users/Modals/AddUser';

export default {
  mixins: [mixinPage],
  data() {
    return {
      showAddUser: false,
    };
  },
  components: {
    UserList,
    AddUser,
  },
  computed: {
    ...mapState('app', ['usersLoaded']),
    ...mapGetters('users', ['users']),
  },
  methods: {
    ...mapActions('users', ['loadUsers']),
  },
  mounted() {
    if (!this.usersLoaded) {
      this.loadUsers();
    }
  },
};
</script>

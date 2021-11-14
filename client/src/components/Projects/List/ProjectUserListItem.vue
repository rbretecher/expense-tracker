<template>
  <q-item clickable v-ripple @click="showEditProjectUser = true">
    <q-item-section avatar>
      <q-icon :name="user.iconName" :color="user.iconColor" />
    </q-item-section>
    <q-item-section>{{ user.name }}</q-item-section>
    <q-item-section title="Weight">
      <q-linear-progress size="25px" :value="getWeight(user)" color="primary">
        <div class="absolute-full flex flex-center">
          <q-badge
            color="white"
            text-color="primary"
            :label="`${getPercentage(user)}%`"
          />
        </div>
      </q-linear-progress>
    </q-item-section>
    <q-item-section></q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="confirmRemoveProjectUser"
          flat
          round
          dense
          color="red-5"
          icon="delete"
          :disabled="user.id == currentUser.id"
        />
      </div>
    </q-item-section>

    <app-dialog v-model:showDialog="showEditProjectUser">
      <edit-project-user
        :user="user"
        :projectId="projectId"
        @close="showEditProjectUser = false"
      />
    </app-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppDialog from 'src/components/Shared/Dialog/Dialog';
import EditProjectUser from '../Modals/EditProjectUser.vue';

export default {
  props: ['user', 'projectId', 'totalWeight'],
  data() {
    return {
      showEditProjectUser: false,
    };
  },
  components: {
    AppDialog,
    EditProjectUser,
  },
  computed: {
    ...mapGetters('users', ['currentUser']),
  },
  methods: {
    ...mapActions('projects', ['removeProjectUser']),
    confirmRemoveProjectUser() {
      this.$q.dialog({
        icon: 'delete',
        title: 'Remove project user',
        message: 'Are you sure you want to remove this user from this project ?',
        ok: true,
        cancel: true,
      }).onOk(() => {
        this.removeProjectUser({ projectId: this.projectId, userId: this.user.id });
      });
    },
    getWeight(user) {
      return (user.weight / this.totalWeight);
    },
    getPercentage(user) {
      return Math.round(this.getWeight(user) * 10000) / 100;
    },
  },
};
</script>

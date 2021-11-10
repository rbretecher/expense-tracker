<template>
  <q-item clickable v-ripple @click="showEditUser = true">
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
            :label="`${getWeight(user) * 100}%`"
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
  </q-item>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['user', 'projectId', 'totalWeight'],
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
      return Math.round((user.weight / this.totalWeight) * 100) / 100;
    },
  },
};
</script>

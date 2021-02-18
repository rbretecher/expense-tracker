<template>
  <q-header
    elevated
    class="bg-white text-primary"
  >
    <q-toolbar v-if="$q.platform.is.desktop">
      <q-icon
        v-if="$q.platform.is.desktop"
        name="timeline"
        size="24px"
      />
      <q-toolbar-title class="text-bold">
        Expense Tracker
      </q-toolbar-title>

      <q-btn
        flat
        dense
        icon="exit_to_app"
        label="Logout"
        @click="logoutUser"
      />
    </q-toolbar>

    <q-toolbar
      v-else
      class="toolbar"
    >
      <q-btn
        flat
        dense
        round
        icon="menu"
        @click="$emit('update:leftDrawerOpen', !leftDrawerOpen)"
      />
      <q-toolbar-title class="text-bold absolute-center">
        {{ toolbar.title }}
      </q-toolbar-title>

      <q-btn
        v-if="toolbar.button"
        flat
        dense
        round
        icon="add"
        @click="toolbar.button.action"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: ['leftDrawerOpen'],
  computed: {
    ...mapState('app', ['toolbar']),
  },
  methods: {
    ...mapActions('app', ['logout']),
    logoutUser() {
      this.logout();
    },
  },
};
</script>

<style scoped>
.toolbar {
  justify-content: space-between;
}
</style>

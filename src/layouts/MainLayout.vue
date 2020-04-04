
<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      class="bg-white text-primary"
    >
      <q-toolbar>
        <q-icon
          name="timeline"
          size="24px"
        />
        <q-toolbar-title class="text-bold">
          Expense Tracker
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <app-menu class="q-mt-sm" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AppMenu from 'components/Menu/Menu';

export default {
  name: 'MainLayout',
  components: {
    AppMenu,
  },
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
};
</script>

<style lang="scss">
.q-toolbar {
  height: 64px;
}
</style>

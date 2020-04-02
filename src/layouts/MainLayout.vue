
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-icon
          name="credit_card"
          size="24px"
        />
        <q-toolbar-title>
          Expense Tracker
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <app-menu />
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

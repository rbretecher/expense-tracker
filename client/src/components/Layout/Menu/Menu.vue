<template>
  <q-list>
    <menu-item
      to="/"
      icon="dashboard"
      label="Dashboard"
    />

    <q-expansion-item
      v-if="projects.length"
      expand-separator
      icon="euro_symbol"
      label="Expenses"
      caption="Manage your expenses"
      default-opened
    >
      <project-item
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </q-expansion-item>

    <menu-item
      to="/projects"
      icon="account_tree"
      label="Projects"
      caption="Organize your expenses"
    />

    <menu-item
      v-if="currentUser.admin"
      to="/categories"
      icon="category"
      label="Categories"
      caption="Sort your expenses by category"
    />

    <menu-item
      v-if="currentUser.admin"
      to="/users"
      icon="account_circle"
      label="Users"
      caption="Manage users to split the bill"
    />

  </q-list>
</template>

<script>
import { mapState } from 'vuex';
import ProjectItem from 'components/Layout/Menu/Expenses/ProjectItem';
import MenuItem from 'components/Layout/Menu/MenuItem';

export default {
  components: {
    ProjectItem,
    MenuItem,
  },
  computed: {
    ...mapState('users', ['currentUser']),
    ...mapState('projects', ['projects']),
  },
};
</script>

<style lang="scss">
.q-item__section--avatar .q-icon {
  color: $primary;
}

.q-drawer__content
  > .q-list
  > .q-expansion-item
  > .q-expansion-item__container
  > .q-expansion-item__content {
  padding-left: 15px;
}
</style>

<template>
  <q-list
    separator
    bordered
    class="project-list"
  >
    <project-list-item
      v-for="project in projects"
      :key="project.id"
      :project="project"
    />
  </q-list>
</template>

<script>
import ProjectListItem from 'src/components/Projects/List/ProjectListItem';

export default {
  props: ['projects'],
  components: {
    ProjectListItem,
  },
};
</script>

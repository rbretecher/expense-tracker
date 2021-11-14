<template>
  <q-breadcrumbs class="q-mb-lg">
    <q-breadcrumbs-el label="Projects" to="/projects" />
    <q-breadcrumbs-el :label="project.name" :to="'/projects/' + project.id" />
    <q-breadcrumbs-el
      v-if="month"
      :label="formatDate(month)"
      :to="'/projects/' + project.id + '/' + month"
    />
  </q-breadcrumbs>
</template>

<script>
import { date } from 'quasar';

export default {
  props: ['project', 'month'],
  methods: {
    formatDate(value) {
      return date.formatDate(value, 'MMMM YYYY');
    },
  },
};
</script>

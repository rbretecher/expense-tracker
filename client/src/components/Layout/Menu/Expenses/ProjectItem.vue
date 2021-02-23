<template>
  <q-item
    clickable
    tag="a"
    :to="`/projects/${project.id}`"
    active-class="active"
  >
    <q-item-section avatar>
      <q-icon :name="project.iconName" :color="project.iconColor" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ project.name }}</q-item-label>
      <q-item-label caption>{{ project.count }} expenses</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'ProjectItem',
  props: ['project'],
};
</script>

<style lang="scss">
.active {
  background: $blue-1;
}
</style>

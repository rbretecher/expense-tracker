<template>
  <q-breadcrumbs class="q-mb-lg">
    <q-breadcrumbs-el
      label="Collections"
      to="/collections"
    />

    <q-breadcrumbs-el
      v-for="(parent, key) in breadcrumbs"
      :key="key"
      :label="parent.name"
      :to="`/collections/${key}`"
    />

  </q-breadcrumbs>
</template>

<script>
export default {
  props: ['parents'],
  computed: {
    breadcrumbs() {
      const bread = {};

      Object.keys(this.parents).reverse().forEach((key) => {
        bread[key] = this.parents[key];
      });

      return bread;
    },
  },
};
</script>

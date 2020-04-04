<template>
  <scroll-page>
    <big-title>Categories</big-title>

    <q-list
      bordered
      separator
    >
      <q-item
        clickable
        v-ripple
        v-for="(category, key) in categories"
        :key="key"
      >
        <q-item-section avatar>
          <q-icon
            :name="category.icon"
            color="green"
          />

        </q-item-section>
        <q-item-section>{{ category.name }}</q-item-section>
      </q-item>
    </q-list>

  </scroll-page>
</template>

<script>
import { mapGetters } from 'vuex';
import ScrollPage from 'src/components/Shared/ScrollPage';
import BigTitle from 'src/components/Shared/BigTitle';

export default {
  components: {
    ScrollPage,
    BigTitle,
  },
  computed: {
    ...mapGetters('categories', ['categories']),
  },
};
</script>

<template>
  <q-item
    clickable
    v-ripple
    @click="showEditCategory = true"
  >
    <q-item-section avatar>
      <q-icon
        :name="category.icon"
        color="green"
      />

    </q-item-section>
    <q-item-section>{{ category.name }}</q-item-section>

    <q-dialog
      v-model="showEditCategory"
      position="top"
      no-refocus
    >
      <edit-category
        :id="id"
        :category="category"
        @close="showEditCategory = false"
      />
    </q-dialog>
  </q-item>
</template>

<script>
import EditCategory from 'src/components/Categories/Modals/EditCategory';

export default {
  props: ['id', 'category'],
  data() {
    return {
      showEditCategory: false,
    };
  },
  components: {
    EditCategory,
  },
};
</script>

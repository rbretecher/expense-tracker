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
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="confirmDeleteCategory"
          flat
          round
          dense
          color="red-5"
          icon="delete"
        />
      </div>
    </q-item-section>

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
import { mapActions } from 'vuex';
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
  methods: {
    ...mapActions('categories', ['deleteCategory']),
    confirmDeleteCategory() {
      this.$q.dialog({
        icon: 'delete',
        title: 'Delete category',
        message: 'Are you sure you want to delete this category ?',
        ok: true,
        cancel: true,
      }).onOk(() => {
        this.deleteCategory(this.id);
      });
    },
  },
};
</script>

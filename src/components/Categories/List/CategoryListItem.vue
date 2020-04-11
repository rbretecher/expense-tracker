<template>
  <q-item
    clickable
    v-ripple
    @click="showEditCategory = true"
  >
    <q-item-section avatar>
      <q-icon
        :name="category.icon.name"
        :color="category.icon.color"
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

    <app-dialog :showDialog.sync="showEditCategory">
      <edit-category
        :id="id"
        :category="category"
        @close="showEditCategory = false"
      />
    </app-dialog>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex';
import EditCategory from 'src/components/Categories/Modals/EditCategory';
import AppDialog from 'src/components/Shared/Dialog/Dialog';

export default {
  props: ['id', 'category'],
  data() {
    return {
      showEditCategory: false,
    };
  },
  components: {
    EditCategory,
    AppDialog,
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

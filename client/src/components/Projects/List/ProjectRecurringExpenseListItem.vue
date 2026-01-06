<template>
  <q-item clickable v-ripple @click="showEditProjectRecurringExpense = true">
    <q-item-section avatar>
      <q-icon :name="category.iconName" :color="category.iconColor" />
    </q-item-section>
    <q-item-section>{{ recurringExpense.name }}</q-item-section>
    <q-item-section>{{ recurringExpense.price }}€</q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="confirmRemoveProjectRecurringExpense"
          flat
          round
          dense
          color="red-5"
          icon="delete"
        />
      </div>
    </q-item-section>
    <app-dialog v-model:showDialog="showEditProjectRecurringExpense">
      <edit-project-recurring-expense
        :recurringExpense="recurringExpense"
        :project="project"
        @close="showEditProjectRecurringExpense = false"
      />
    </app-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppDialog from 'src/components/Shared/Dialog/Dialog.vue';
import EditProjectRecurringExpense from '../Modals/EditProjectRecurringExpense.vue';

export default {
  props: ['recurringExpense', 'project'],
  data() {
    return {
      showEditProjectRecurringExpense: false,
    };
  },
  components: {
    AppDialog,
    EditProjectRecurringExpense,
  },
  computed: {
    ...mapState('categories', ['categories']),
    category() {
      const currentCategory = this
        .categories
        .filter((category) => (category.id === this.recurringExpense.categoryId))
        .shift();

      if (!currentCategory) {
        return {
          iconName: 'help_outline',
          iconColor: 'primary',
        };
      }
      return currentCategory;
    },
  },
  methods: {
    ...mapActions('projects', ['removeProjectRecurringExpense']),
    confirmRemoveProjectRecurringExpense() {
      this.$q.dialog({
        icon: 'delete',
        title: 'Remove project recurring expense',
        message: 'Are you sure you want to remove this recurring expense from this project ?',
        ok: true,
        cancel: true,
      }).onOk(() => {
        this.removeProjectRecurringExpense(this.recurringExpense);
      });
    },
  },
};
</script>

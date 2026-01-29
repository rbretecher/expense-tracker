<template>
  <q-item clickable v-ripple @click="showAddSuggestedExpense = true">
    <q-item-section avatar>
      <q-icon :name="category.iconName" :color="category.iconColor" />
    </q-item-section>

    <q-item-section>{{ suggestedExpense.name }}</q-item-section>
    <q-item-section>{{ suggestedExpense.price }}€</q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          flat
          round
          dense
          color="green-6"
          icon="add_circle"
        />
      </div>
    </q-item-section>

    <app-dialog v-model:showDialog="showAddSuggestedExpense">
      <add-suggested-expense
        :suggestedExpense="suggestedExpense"
        :projectId="project.id"
        :users="project.users"
        @save="handleAddSuggestedExpense"
      />
    </app-dialog>
  </q-item>
</template>

<script>
import { Loading, Notify } from 'quasar';
import { mapActions, mapState } from 'vuex';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';
import AppDialog from 'src/components/Shared/Dialog/Dialog.vue';
import AddSuggestedExpense from 'src/components/Expenses/Modals/AddSuggestedExpense.vue';

export default {
  name: 'SuggestedExpenseListItem',
  props: ['suggestedExpense', 'project', 'month'],
  data() {
    return {
      showAddSuggestedExpense: false,
    };
  },
  components: {
    AppDialog,
    AddSuggestedExpense,
  },
  computed: {
    ...mapState('categories', ['categories']),
    category() {
      const currentCategory = this.categories
        .filter((category) => category.id === this.suggestedExpense.categoryId)
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
      ...mapActions('expenses', ['addSuggestedExpense']),
    ...mapActions('projects', ['loadProjects', 'loadProjectMonth','removeProjectRecurringExpense']),
    async handleAddSuggestedExpense(suggestedExpense) {
      try {
        Loading.show();
        await this.addSuggestedExpense(suggestedExpense);
        await this.loadProjectMonth({ projectId: this.project.id, month: this.month });
        await this.loadProjects();
        Loading.hide();
        this.showAddSuggestedExpense = false;
        Notify.create('Suggested expense added!');
      } catch (e) {
        showErrorMessageWithTitle('Could not create suggested expense', e.message);
      }
    },
  },
};
</script>
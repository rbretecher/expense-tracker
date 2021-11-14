<template>
  <div>
    <page-spinner v-if="!currentProject" />

    <scroll-page
      v-else
      :title="currentProject.name"
      actionName="Add new expense"
      v-model:actionModel="showAddExpense"
    >
      <template v-slot:breadcrumbs>
        <project-breadcrumbs :project="currentProject" />
      </template>

      <div v-if="currentProject.count" class="q-mb-xl">
        <div v-for="year in years" :key="year">
          <medium-title>{{ year }}</medium-title>

          <project-by-month-list
            :projectId="currentProject.id"
            :expensesByMonth="months(year)"
          />
        </div>
      </div>

      <no-resource-banner
        v-model:showAddExpense="showAddExpense"
        v-else
        class="q-mb-xl"
      >
        There is no expense in this project. Add a new expense and it will show
        up here.
      </no-resource-banner>

      <project-users :project="currentProject"></project-users>

      <app-dialog v-model:showDialog="showAddExpense">
        <add-expense
          @save="handleAddExpense"
          :projectId="projectId"
          :users="currentProject.users"
        />
      </app-dialog>
    </scroll-page>
  </div>
</template>

<script>
import { Loading, Notify } from 'quasar';
import { mapActions, mapState } from 'vuex';
import mixinPage from 'src/mixins/mixin-page';
import ProjectByMonthList from 'src/components/Projects/List/ProjectByMonthList.vue';
import MediumTitle from 'src/components/Shared/Titles/MediumTitle.vue';
import AddExpense from 'src/components/Expenses/Modals/AddExpense';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';
import ProjectBreadcrumbs from 'src/components/Projects/ProjectBreadcrumbs';
import ProjectUsers from '../components/Projects/ProjectUsers/ProjectUsers.vue';

export default {
  components: {
    ProjectByMonthList,
    MediumTitle,
    AddExpense,
    ProjectBreadcrumbs,
    ProjectUsers,
  },
  mixins: [mixinPage],
  props: ['projectId'],
  data() {
    return {
      showAddExpense: false,
    };
  },
  computed: {
    ...mapState('projects', ['currentProject']),
    years() {
      return this.currentProject.expensesByMonth.reduce((years, expense) => {
        if (!years.includes(expense.year)) {
          years.push(expense.year);
        }
        return years;
      }, []);
    },
  },
  methods: {
    ...mapActions('projects', ['loadProject', 'loadProjects', 'resetCurrentProject']),
    ...mapActions('expenses', ['addExpense']),
    months(year) {
      return this.currentProject.expensesByMonth.filter((month) => (month.year === year));
    },
    async handleAddExpense(expense) {
      try {
        Loading.show();
        await this.addExpense(expense);
        await this.loadProject(this.projectId);
        await this.loadProjects();
        Loading.hide();
        this.showAddExpense = false;
        Notify.create('Expense added!');
      } catch (e) {
        showErrorMessageWithTitle('Could not create expense', e.message);
      }
    },
  },
  created() {
    this.resetCurrentProject();
    this.loadProject(this.projectId);
  },
  watch: {
    projectId() {
      this.resetCurrentProject();
      this.loadProject(this.projectId);
    },
  },
};
</script>

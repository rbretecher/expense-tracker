<template>
  <q-item clickable v-ripple @click="exploreProject">
    <q-item-section avatar>
      <q-icon :name="project.iconName" :color="project.iconColor" />
    </q-item-section>
    <q-item-section>{{ project.name }}</q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditProject = true"
          flat
          round
          dense
          color="green-5"
          icon="edit"
        />
        <q-btn
          @click.stop="confirmDeleteProject"
          flat
          round
          dense
          color="red-5"
          icon="delete"
        />
      </div>
    </q-item-section>

    <app-dialog v-model:showDialog="showEditProject">
      <edit-project :project="project" @close="showEditProject = false" />
    </app-dialog>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex';
import EditProject from 'src/components/Projects/Modals/EditProject';
import AppDialog from 'src/components/Shared/Dialog/Dialog';

export default {
  props: ['project'],
  data() {
    return {
      showEditProject: false,
    };
  },
  components: {
    EditProject,
    AppDialog,
  },
  methods: {
    ...mapActions('projects', ['deleteProject']),
    confirmDeleteProject() {
      this.$q.dialog({
        icon: 'delete',
        title: 'Delete project',
        message: 'Are you sure you want to delete this project ?',
        ok: true,
        cancel: true,
      }).onOk(() => {
        this.deleteProject(this.project.id);
      });
    },
    exploreProject() {
      this.$router.push(`/projects/${this.project.id}`).catch(() => { });
    },
  },
};
</script>

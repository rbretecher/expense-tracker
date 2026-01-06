import Modal from 'src/components/Shared/Modals/Modal.vue';
import ModalProjectUserWeight from 'src/components/Projects/Modals/Shared/ModalProjectUserWeight.vue';
import ModalProjectUserSelect from 'src/components/Projects/Modals/Shared/ModalProjectUserSelect.vue';

export default {
  data() {
    return {
      formData: {
        userId: null,
        weight: 1,
      },
    };
  },
  components: {
    Modal,
    ModalProjectUserWeight,
    ModalProjectUserSelect,
  },
};

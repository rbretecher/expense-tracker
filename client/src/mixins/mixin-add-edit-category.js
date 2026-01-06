import Modal from 'src/components/Shared/Modals/Modal.vue';
import ModalNameInput from 'src/components/Shared/Modals/ModalNameInput.vue';
import ModalIconColorInput from 'src/components/Shared/Modals/ModalIconColorInput.vue';

export default {
  data() {
    return {
      formData: {
        name: null,
        iconName: 'folder',
        iconColor: 'green',
      },
    };
  },
  components: {
    Modal,
    ModalNameInput,
    ModalIconColorInput,
  },
};

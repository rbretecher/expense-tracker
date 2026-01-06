import Modal from 'src/components/Shared/Modals/Modal.vue';
import ModalNameInput from 'src/components/Shared/Modals/ModalNameInput.vue';
import ModalIconColorInput from 'src/components/Shared/Modals/ModalIconColorInput.vue';
import ModalEmailInput from 'src/components/Shared/Modals/ModalEmailInput.vue';

export default {
  data() {
    return {
      formData: {
        name: null,
        email: null,
        iconName: 'face',
        iconColor: 'blue-4',
        password: null,
      },
    };
  },
  components: {
    Modal,
    ModalNameInput,
    ModalIconColorInput,
    ModalEmailInput,
  },
};

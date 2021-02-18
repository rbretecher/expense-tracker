import Modal from 'src/components/Shared/Modals/Modal';
import ModalNameInput from 'src/components/Shared/Modals/ModalNameInput';
import ModalIconColorInput from 'src/components/Shared/Modals/ModalIconColorInput';

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

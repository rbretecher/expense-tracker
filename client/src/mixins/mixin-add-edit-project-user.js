import Modal from 'src/components/Shared/Modals/Modal';
import ModalProjectUserWeight from 'src/components/Projects/Modals/Shared/ModalProjectUserWeight';
import ModalProjectUserSelect from 'src/components/Projects/Modals/Shared/ModalProjectUserSelect';

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

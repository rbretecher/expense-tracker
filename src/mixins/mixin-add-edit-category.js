import Modal from 'src/components/Shared/Modals/Modal';
import ModalCategoryName from 'src/components/Categories/Modals/Shared/ModalCategoryName';
import ModalCategoryIcon from 'src/components/Categories/Modals/Shared/ModalCategoryIcon';

export default {
  data() {
    return {
      formData: {
        name: null,
        icon: null,
      },
    };
  },
  components: {
    Modal,
    ModalCategoryName,
    ModalCategoryIcon,
  },
};

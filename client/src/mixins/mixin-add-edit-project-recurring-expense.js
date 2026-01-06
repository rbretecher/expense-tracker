import Modal from 'src/components/Shared/Modals/Modal.vue';
import ModalNameInput from 'src/components/Shared/Modals/ModalNameInput.vue';
import ModalExpensePrice from 'src/components/Expenses/Modals/Shared/ModalExpensePrice.vue';
import ModalExpenseDate from 'src/components/Expenses/Modals/Shared/ModalExpenseDate.vue';
import ModalExpenseCategory from 'src/components/Expenses/Modals/Shared/ModalExpenseCategory.vue';
import ModalExpensePaidBy from 'src/components/Expenses/Modals/Shared/ModalExpensePaidBy.vue';

export default {
  data() {
    return {
      formData: {
        categoryId: null,
        paidByUserId: null,
        name: '',
        price: null,
        startPeriod: null,
        endPeriod: null,
      },
    };
  },
  components: {
    Modal,
    ModalNameInput,
    ModalExpensePrice,
    ModalExpenseDate,
    ModalExpenseCategory,
    ModalExpensePaidBy
  },
};


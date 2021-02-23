import Modal from 'src/components/Shared/Modals/Modal';
import ModalNameInput from 'src/components/Shared/Modals/ModalNameInput';
import ModalExpensePrice from 'src/components/Expenses/Modals/Shared/ModalExpensePrice';
import ModalExpenseDate from 'src/components/Expenses/Modals/Shared/ModalExpenseDate';
import ModalExpensePaidBy from 'src/components/Expenses/Modals/Shared/ModalExpensePaidBy';
import ModalExpenseCategory from 'src/components/Expenses/Modals/Shared/ModalExpenseCategory';

export default {
  data() {
    return {
      formData: {
        name: null,
        price: null,
        date: null,
        paidByUserId: null,
        categoryId: null,
      },
    };
  },
  components: {
    Modal,
    ModalNameInput,
    ModalExpensePrice,
    ModalExpenseDate,
    ModalExpensePaidBy,
    ModalExpenseCategory,
  },
};

export default {
  methods: {
    abs(value) {
      return Math.abs(value);
    },
    formatPrice(value) {
      return `${(Math.round(value * 100) / 100).toString()}€`;
    },
  },
};

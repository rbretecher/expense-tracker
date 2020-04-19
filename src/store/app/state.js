export default function () {
  return {
    // User
    isSignedIn: false,
    // Toolbar
    currentPage: null,
    toolbarAction: null,
    // Resources loading
    categoriesLoaded: false,
    collectionsLoaded: false,
    usersLoaded: false,
    expensesLoaded: false,
  };
}

export default function () {
  return {
    // User
    isSignedIn: false,
    // Toolbar
    currentPage: null,
    toolbarAction: null,
    // Resources for the app.
    categoriesLoaded: false,
    // Resources for the expense page.
    collectionLoaded: false,
    expensesLoaded: false,
    // Resources for the users page.
    usersLoaded: false,
  };
}

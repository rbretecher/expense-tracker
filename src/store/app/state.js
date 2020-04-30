export default function () {
  return {
    // User
    isSignedIn: false,
    // Toolbar
    currentPage: null,
    toolbarAction: null,
    // Resources for the app.
    categoriesLoaded: false,
    collectionsLoaded: false,
    // Resources for the collection page (expenses).
    expensesLoaded: false,
    collectionUsersLoaded: false,
    // Resources for the users page.
    usersLoaded: false,
  };
}

export default {
  changeTitle (state, title) {
    state.title = title
    try {
      localStorage.title = title
    } catch (e) {}
  },
  changeUser (state, username) {
    state.currentUser = username
    state.isLogin = true
  }
}

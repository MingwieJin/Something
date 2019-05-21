let defauTitle = '这里是默认的首页title'
try {
  if (localStorage.title) {
    defauTitle = localStorage.title
  }
} catch (e) {
  // TODO handle the exception
}

export default {
  title: defauTitle,
  currentUser: null,
  isLogin: false,
  token: ''
}

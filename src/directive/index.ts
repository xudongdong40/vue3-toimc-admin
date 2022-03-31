import TuiEditor from '@toast-ui/editor'
export default {
  install(app) {
    app.directive('precode', {
      mounted(el) {
        const content = el.outerHTML
          .match(/<pre>([\s\S]*?)<\/pre>/)[1]
          .split('\n')
          .map((item) => item.trim())
          .join('\n')
        TuiEditor.factory({
          el: el,
          viewer: true,
          initialValue: content
        })
        el.outerHTML = el.innerHTML
      }
    })
  }
}

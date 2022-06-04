import { App } from 'vue'

const modules = import.meta.globEager('./modules/**/*.ts')

const directives = {
  install: function (app: App<Element>) {
    Object.keys(modules).forEach((key) => {
      const mod = key.replace('./modules/', '').replace('.ts', '')
      app.directive(mod, modules[key].default)
    })
  }
}

export function setupDirectives(app: App) {
  app.use(directives)
}

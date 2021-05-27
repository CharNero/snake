export const getConfig = async (url: string) => (await fetch(url)).json()

export const change = async (themeName: string, config: { [prop: string]: string } = {}) => {
  if (!config) {
    config = await getConfig('http://localhost/themes/config.json')
  }
  if (!config[themeName]) {
    return Promise.reject('切换失败，请检查主题是否存在！')
  } else {
    let linkEl = document.getElementById('theme')
    if (!linkEl) {
      linkEl = document.createElement('link')
      linkEl.setAttribute('id', 'theme')
      linkEl.setAttribute('rel', 'stylesheet')
    }
    linkEl.setAttribute('href', config[themeName])
    document.head.appendChild(linkEl)
  }
}

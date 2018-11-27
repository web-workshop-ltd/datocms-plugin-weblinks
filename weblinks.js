(function(document, init) {

  const getButton = () => document.getElementById("button")
  const setButtonUrl = (button, url) => button.setAttribute("href", url)
  const setButtonText = (button, text) => button.textContent = text
  const setButtonVisible = (button) => button.style.visibility = "visible"

  const getTokens = (template) => template.match(/:\w+/g)
  const getReplacements = (plugin, tokens) => tokens.map(getReplacement.bind(null, plugin))
  const filterReplacements = (replacements) => replacements.filter(r => !! r.value)

  const getReplacement = (plugin, token) => ({ token, value: getValue(plugin, token) })

  const getValue = (plugin, token) => {
    const field = token.slice(1)
    return (field === "id") ? plugin.itemId : plugin.getFieldValue(field)
  }

  const getUrl = (plugin, template, tokens) => {
    const replacements = filterReplacements(getReplacements(plugin, tokens))
    return replacements.reduce((url, rep) => url.replace(rep.token, rep.value), template)
  }

  const initPlugin = (plugin) => {
    var label = plugin.parameters.instance.label
    var template = plugin.parameters.instance.template

    var button = getButton()
    var tokens = getTokens(template)
    var url = getUrl(plugin, template, tokens)

    setButtonUrl(button, url)
    setButtonText(button, label)
    setButtonVisible(button)

    plugin.startAutoResizer()
  }

  init(initPlugin)

})(window.document, window.DatoCmsPlugin.init)

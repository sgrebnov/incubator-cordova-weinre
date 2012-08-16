# a place for browser specific hacks

module.exports = class BrowsersHacks

    constructor: ->

    @apply: ->
        isIE = window.navigator.userAgent.indexOf("MSIE") isnt -1

        internetExplorerHacks()  if isIE

    internetExplorerHacks = ->
  
        # check for quirks mode
        if typeof document.addEventListener is "undefined"
            alert "Oops. It seems the page runs in compatibility mode. Please fix it and try again."
        return

        if typeof (window.Element) is "undefined"
            window.Element = ->

        if typeof (window.Node) is "undefined"
            window.Node = ->

require("../common/MethodNamer").setNamesForClass(module.exports)
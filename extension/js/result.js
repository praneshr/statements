chrome.runtime.onMessage.addListener(
  (data, sender, sendResponse) => {
    window.__DATA = data
  }
)

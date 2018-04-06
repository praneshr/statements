const swiggyRegex = /https:\/\/www\.swiggy\.com*/ig
const getType = url => {
  if (swiggyRegex.test(url)) return 'SWIGGY'
  return 'NOT_FOUND'
}

const config = {
  SWIGGY: {
    fetcher: __SWIGGY.fetcher,
    parser: __SWIGGY.parser,
  },
}

const query = async type => {
  let data
  switch (type) {
    case 'SWIGGY':
      data = await config.SWIGGY.fetcher()
      break
  }
  chrome.tabs.create({ url: chrome.extension.getURL('result.html') }, tab => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
      if (tabId === tab.id && changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, { data })
      }
    })
  })
}

chrome.runtime.onMessage.addListener(
  async ({ actionType, payload }, sender, sendResponse) => {
    switch (actionType) {
      case 'query':
        query(getType(payload.url))
        break
      default:
        break
    }
  }
)

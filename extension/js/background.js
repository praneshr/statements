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

const createTab = async () => new Promise(resolve =>
  chrome.tabs.create({ url: chrome.extension.getURL('app/statement.html') }, tab => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
      if (tabId === tab.id && changeInfo.status == 'complete') {
        resolve({
          status: 'ok',
          tabId,
          changeInfo,
        })
      }
    })
  }
))

const query = async type => {
  let data
  switch (type) {
    case 'SWIGGY':
      const { status, tabId } = await createTab()
      data = await config.SWIGGY.fetcher()
      break
  }
  chrome.runtime.sendMessage({
    actionType: 'DATA',
    data,
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

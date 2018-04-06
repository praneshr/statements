
$('#go').click(() => {
  chrome.tabs.query({
    'active': true,
    'currentWindow': true,
    'status': 'complete',
    'windowType': 'normal'
  }, async tabs => {
    const { url } = tabs[0]
    chrome.runtime.sendMessage({
      actionType: 'query',
      payload: {
        url,
      }
    })
    const type = getType(url)
    switch (type) {
      case 'SWIGGY':
        // const data = await recursiveSwiggyFetcher()
        chrome.tabs.create({ url: chrome.extension.getURL('result.html') }, tab => {
          console.log(tab);
          chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
            console.log(tabId);
              if (tabId === tab.id && changeInfo.status == 'complete') {
                chrome.tabs.onUpdated.removeListener(listener)
                chrome.tabs.sendMessage(tabId, { data: '34' })
              }
          })
        })
        break
    }
  })
})


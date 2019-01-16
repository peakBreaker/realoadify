console.log('BACKGROUND: Loading realoadify');

const CHECK_INTERVAL = 1500 // 1.5 secs

function reportError(error) {
  console.error(`BACKGROUND:ERR: Could not realoadify: ${error}`);
}

// For getting our session asynchronously
function realoadify_cb (rl_enabled) {
    console.log('BACKGROUND:INSPECT: Realoadify enabled for tab :: ' + rl_enabled + ' ::')
    if (rl_enabled) {
        location.reload();
    }
}

async function monitor_realoadify(){

    // First get current tab id to get the session
    console.log('BACKGROUND:LOOP: Checking session')
    let tabArray = await browser.tabs.query({currentWindow: true, active: true});
    let tabId = tabArray[0].id;
    console.log('BACKGROUND:LOOP: TabID :: ' + tabId + ' ::');

    // getting tab session valie returns a promise
    let rl_enabled = await browser.sessions.getTabValue(tabId, "realoadify_enabled");
    if (rl_enabled) {
        console.log('BACKGROUND:LOOP: Reloading active tab');
        let reloading = browser.tabs.reload(tabId);
    }


    // reset the timer
    setTimeout(monitor_realoadify, CHECK_INTERVAL);
}

console.log('CONTENT: Checking tab');
browser.tabs.getCurrent().then(monitor_realoadify, reportError);


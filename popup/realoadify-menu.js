

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
async function realoadify(value) {
  let tabArray = await browser.tabs.query({currentWindow: true, active: true});
  let tabId = tabArray[0].id;
  await browser.sessions.setTabValue(tabId, "realoadify_enabled", value);
}

(function listenForClicks() {
  document.addEventListener("click", (e) => {
    /**
     * The reloadify event loop
     */
    function enable_realoadify(tabs) {
      console.log('MENU: Enabling realoadify');
      realoadify(true);
    }

    /**
     * Remove the page-hiding CSS from the active tab,
     * send a "reset" message to the content script in the active tab.
     */
    function reset(tabs) {
      console.log('MENU: Resetting');
      realoadify(false);
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not realoadify: ${error}`);
    }

    /**
     * Get the active tab,
     */
    if (e.target.classList.contains("state")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(enable_realoadify)
        .catch(reportError);
    }
    else if (e.target.classList.contains("reset")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }
  });
})();

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
// function reportExecuteScriptError(error) {
  // document.querySelector("#popup-content").classList.add("hidden");
  // document.querySelector("#error-content").classList.remove("hidden");
  // console.error(`Failed to execute realoadify content script: ${error.message}`);
// }

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
// browser.tabs.executeScript({file: "/content_scripts/realoadify.js"})
    // .then(listenForClicks)
    // .catch(reportExecuteScriptError);


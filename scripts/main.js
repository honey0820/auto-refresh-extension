const keyword = "Please Wait Here";


function activateListeners() {
    document.getElementById("startRefresh").addEventListener("click", async function () {
        const interval = parseFloat(document.getElementById('interval').value) * 1000;
        if (!(interval > 0)) return;
        (async () => {
            // const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
            // const response = await chrome.tabs.sendMessage(tab.id, {refreshFlag: true});
            // do something with response here, not outside the function
            // console.log(response);
            const tabs = await chrome.tabs.query({});

            for (var i=0; i<tabs.length; ++i) {
                console.log(tabs[i]);
                chrome.tabs.sendMessage(tabs[i].id, {refreshFlag: true, interval:interval});
            }
                

        })();

    });

    document.getElementById("stopRefresh").addEventListener("click", async function () {
        (async () => {
            // const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
            // const response = await chrome.tabs.sendMessage(tab.id, {refreshFlag: false});
            // // do something with response here, not outside the function
            // console.log(response);

            const tabs = await chrome.tabs.query({});

            for (var i=0; i<tabs.length; ++i) {
                console.log(tabs[i]);
                chrome.tabs.sendMessage(tabs[i].id, {refreshFlag: false});
            }

        })();

    });
}



document.addEventListener('DOMContentLoaded', function () {
    activateListeners();
    document.getElementById('interval').value = "0.1";
    document.getElementById("interval").focus();
}, false);
const keyword = "Please Wait Here";
let interval = 0.1 * 1000;
var intervalID; 
let content = document.body.innerHTML;



if(localStorage.interval){
    interval = localStorage.interval*1;
}


refreshStart();

function refreshStart(){
    if(localStorage.refreshFlag == "true"){
        intervalID = setInterval(refreshFunc, interval);
    }else{
        clearInterval(intervalID);
    }
}

function checkContentKeyword(content,keyword){
    if (content.indexOf(keyword) != -1 ) {
        return true;
    }else{
        return false;
    }
}

function refreshFunc(a, b)
{
    if(checkContentKeyword(content,keyword)){
        window.location.reload();
    }else{
        clearInterval(intervalID);
    }
 
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.refreshFlag == true ){
        localStorage.refreshFlag = true;
        localStorage.interval = request.interval;
        
      }else{
        localStorage.refreshFlag = false;
      }
      sendResponse({farewell: "goodbye"});
      //window.location.reload();
      refreshStart();
    }
  );

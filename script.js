
const popup = document.querySelector('.popup');
wifiIcon = document.querySelector('.icon i');
popupTitle = document.querySelector('.popup .title');
popupDesc = document.querySelector('.desc');
reconnectBtn = document.querySelector('.reconnect');

let isOnline = true, intervalId, timer = 10;

const checkConnection = async () => {
    try { 
        // using API to check network status
        // 200 and 300, the network connection is considered online
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;
    } catch (error) {
        isOnline = false; //If there is an error, the connection is considered offline
    }
    timer = 10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}

const handlePopup = (status) => {
    //If status is true. remove show class from the popup; otherwise, add
    // update icon, title and description 
    if(status) {
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerText = "Restored Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the Internet.";
        popup.classList.add("online");
        return setTimeout(() => popup.classList.remove("show"), 2000);
        
    }
     //If status is offline, update icon, title and description 
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "Lost Connection";
    popupDesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.";
    popup.className = ("popup show");



    //Set an interval to decrease the timer by 1 every second
    intervalId = setInterval(() => { 
        timer--;
        if(timer === 0) checkConnection(); // if timer reaches 0 check connection
        popup.querySelector(".desc b").innerText = timer;
    }, 1000);
}

// Only if isOnline is true, check the connection status every 5 seconds
 setInterval(() => isOnline && checkConnection(), 5000);
 reconnectBtn.addEventListener("click", checkConnection);

//If the connection is online, the API call will succeed and status response will be 200.
//If the connection is offline, the API call will fail and status response will be less than 200

//An alternative method for checking network connectivity is to use the navigator .onLine property. However, this method may not always be reliable, and a better approach is to call an API and check the response status.
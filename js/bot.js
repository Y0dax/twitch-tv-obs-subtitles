function botUsername() {
    return ""; // <-- Fill in the username for your bot (Can also be your own account). Also ensure the username in Username.js is the channel you want to bot to write to.
    // example: return "ninja";
}

function botOauth() {
    return ""; //Oauth key for the above account from https://twitchapps.com/tmi/
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Settings
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const requireStreaming = true; // Chatbot will only connect if stream is live
const connectOnLoad = false; // By default, the chatbot automatically connects and disconnects when the OBS source is active/inactive. 
                            // This setting allows the chatbot to connect on pageload even if the source is not visible. 
                            // The best use case for this would be that you want to use the "Shutdown source when not visible" checkbox instead.

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Bot Logic
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var botChannel = new BroadcastChannel('bot_bus');

const client = new tmi.Client({
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: botUsername(),
        password: botOauth()
    },
    channels: [username()]
});

if(connectOnLoad){
    connect();
}

window.addEventListener('obsSourceActiveChanged', function (event) {
    if (event.detail.active && client.readyState() === "CLOSED") {
        connect();
    }
    else {
        disconnect();
    }
});

window.addEventListener('obsStreamingStopped', function (event) {
    if (requireStreaming && client.readyState() !== "CLOSED") {
        client.disconnect().then((state) => {
            setStatus(undefined);
        });
    }
});

client.on("connected", (address, port) => {
    client.say(username(), "STT Chatbot Connected - transcriptions ON. !sttoff to disconnect manually.");
});

client.on("chat", (channel, userstate, message, self) => {
    if (message === "!sttoff" && (userstate.mod || self || userstate.username.toLowerCase() === username().toLowerCase())) {
        disconnect();
    }
});

botChannel.onmessage = function (e) {
    client.say(username(), e.data);
};

function connect() {
    if (requireStreaming) {
        window.obsstudio.getStatus(function (status) {
            if (status.streaming) {
                client.connect().then((state) => {
                    setStatus(true);
                });
            }
            else {
                setStatus(undefined);
                return;
            }
        });
    }
    else {
        client.connect().then((state) => {
            setStatus(true);
        });
    }
}

function disconnect() {
    client.say(username(), "STT Chatbot Disconnected");
    client.disconnect().then((state) => {
        setStatus(false);
    });
}

function setStatus(connected) {
    switch (connected) {
        case undefined:
            document.getElementById("status").className = "badge badge--danger";
            document.getElementById('status').innerHTML = "STT Chatbot OFF (Stream not live)"
            break;
        case true:
            document.getElementById("status").className = "badge badge--success";
            document.getElementById('status').innerHTML = "STT Chatbot ON"
            break;
        case false:
            document.getElementById("status").className = "badge badge--danger";
            document.getElementById('status').innerHTML = "STT Chatbot OFF"
            break;
        default:
            document.getElementById("status").className = "badge badge--danger";
            document.getElementById('status').innerHTML = "STT Chatbot OFF"
    }
}

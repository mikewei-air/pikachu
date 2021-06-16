let str = `
    .skin {
        position: relative;
        background-color: #ffe600;
        min-height: 50vh;
    }
    .nose {
        width: 0;
        height: 0;
        border: black 10px solid;
        border-color: black transparent transparent transparent;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 200px;
        margin-left: -10px;
    }
    @-webkit-keyframes noseWave {
        0% {
            transform: rotate(0deg);
        }
        33% {
            transform: rotate(10deg);
        }
        66% {
            transform: rotate(-10deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
    .nose:hover {
        transform-origin: center bottom;
        animation: noseWave 500ms infinite linear;
    }

    .eye {
        position: absolute;
        left: 50%;
        top: 150px;
        width: 50px;
        height: 50px;
        margin-left: -24px;
        background-color: #2e2e2e;
        border-radius: 50%;
        border: 2px solid black;    
    }
    .eye::before {
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        background-color: #ffffff;
        border-radius: 50%;
        border: 1px solid #ffffff;
        position: absolute;
        margin: 4px 0 0 8px;
        animation: eyeMove 3000ms infinite;

    }
    .eye.left {
        transform: translateX(-100px)
    }
    .eye.right {
        transform: translateX(100px)
    }
    @-webkit-keyframes eyeMove{
        0%,100%{
        top:2px;
        left:2px;
        }
        30%,60%,70%{
        top: 0;
        left: 15px;
        }
        40%{
        top: 0;
        left: 15px;
        }
        50%{
        top: 0;
        left: 10px;
        }
        80%,90%{
        top: 17px;
        left: 15px;
        }
    }

    .mouse {
        width: 230px;
        height: 230px;
        position: absolute;
        left: 50%;
        top: 215px;
        margin-left: -113px;
        overflow: hidden;
        cursor: pointer;
    }

    .mouse::before {
        content: '';
        width: 80px;
        height: 40px;
        position: absolute;
        top: -15px;
        left: 32px;
        border-bottom: 3px solid #000000;
        border-left: 2px solid #000000;
        border-bottom-left-radius: 60px;
        background-color: #ffe600;
        transform: rotate(-30deg);
        z-index: 2;
    }
    .mouse::after {
        content: '';
        width: 80px;
        height: 40px;
        position: absolute;
        top: -15px;
        right: 32px;
        border-bottom: 3px solid #000000;
        border-right: 2px solid #000000;
        border-bottom-right-radius: 60px;
        background-color: #ffe600;
        transform: rotate(30deg);
        z-index: 2;
    }
    .mouse-main {
        content: '';
        display: block;
        position: absolute;
        left:50%;
        top: -11px ;
        width: 130px;
        height: 140px;
        background-color: #990513;
        border: 3px solid black;
        border-bottom-left-radius: 300px 600px;
        border-bottom-right-radius: 300px 600px;
        overflow: hidden;
        margin-left: -65px;
        animation: mouthMove 3s infinite;
    }
    @-webkit-keyframes mouthMove {
        0%,46%,54%,100%{
        height: 140px;
        }
        50%{
        height: 10px;
        }
    }

    .tongue {
        width: 140px;
        height: 140px;
        background-color: #fc4a62;
        margin-top: 36px;
        margin-left: -6px;
        border-top-left-radius: 380px;
        border-top-right-radius: 420px 380px;
        overflow: hidden;
    }
    
    .face {
        position: absolute;
        left: 50%;
        top: 250px;
        width: 80px;
        height: 80px;
        background-color: #ff0000;
        z-index: 3;
        margin-left: -50px;
        border-radius: 50%;
        border: 2px solid black;
        animation: cheekShake 3s infinite;
    }
    .face.left {
        transform: translateX(-150px)
    }
    .face.right {
        transform: translateX(183px)
    }
    @-webkit-keyframes cheekShake{
        0%,46%,54%,100%{
        width: 64px;
        height: 64px;
        top: 250px;
        }
        50%{
        width: 50px;
        height: 50px;
        top: 250px;
        }
    }
`
const demo1 = document.querySelector('#demo1')
const demo2 = document.querySelector('#demo2')

const player = {
    n: 0,
    time: 100,
    id: null,
    init: () => {
        demo1.innerText = str.substr(0, player.n)
        demo2.innerHTML = str.substr(0, player.n)
        player.bindEvents()
        player.play()
    },
    events: {
        "#btnPause": "pause",
        "#btnPlay": "play",
        "#btnSlow": "slow",
        "#btnMedium": "normal",
        "#btnFast": "fast"
    },
    bindEvents: () => {
        console.log('dianjile')
        for (let key in player.events) {
            if (player.events.hasOwnProperty(key)) {
                const value = player.events[key]
                document.querySelector(key).onclick = player[value]
            }
        }
    },
    run: () => {
        if (player.n > str.length) {
            window.clearInterval(player.id)
            return
        }
        player.n++
            demo1.innerText = str.substr(0, player.n)
        demo2.innerHTML = str.substr(0, player.n)
        demo1.scrollTop = demo1.scrollHeight
    },
    play: () => {
        player.id = setInterval(player.run, player.time)
    },
    pause: () => {
        window.clearInterval(player.id)
    },
    slow: () => {
        player.pause()
        player.time = 200
        player.play()
    },
    normal: () => {
        player.pause()
        player.time = 50
        player.play()
    },
    fast: () => {
        player.pause()
        player.time = 0
        player.play()
    }
}
player.init()
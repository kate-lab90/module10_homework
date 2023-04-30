// 1. Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
//
// При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
//
// Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:
// 2. Добавить в чат механизм отправки гео-локации:
// При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на
// https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.

//https://www.openstreetmap.org/#map=10/${data.coords.longitude}/${data.coords.latitude}
//https://www.openstreetmap.org/?mlat=59.81934&mlon=32.35923
//https://www.openstreetmap.org/#map=9/40.2334/53.3029
const wsUri = "wss://echo-ws-service.herokuapp.com";

const pageLoaded = () => {
  const infoOutput = document.querySelector(".j-info-output");
  const chatOutput = document.querySelector(".j-chat-output");
  const chatInput = document.querySelector(".j-chat-input");
  const input = document.querySelector(".j-inp");
  const btnSend = document.querySelector(".j-btn-send");
  const btnGeo = document.querySelector(".j-btnGeo");



  let websocket = new WebSocket(wsUri);

  websocket.onopen = () => {
    infoOutput.innerText = 'Соединение установлено';
  }

  websocket.onerror = () => {
    infoOutput.innerText = 'При передаче данных произошла ошибка';
  }

  const sendMessage = () => {
    if (!input.value) return;
    websocket.send (input.value);
    writeToChat(input.value, false);
    websocket.onmessage = (event) => {
      writeToChat(event.data, true)
    }
    input.value === '';

  }

  btnSend.addEventListener('click', sendMessage);

  console.log(input.value);

  const writeToChat = (message, isRecieved) => {
    let messageHTML = `<div class = '${isRecieved? 'recieved' : 'sent'}'> ${message}</div>`
    chatOutput.innerHTML += messageHTML;

  }

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(locationSucces, locationError)

    } else {
      infoOutput.innerText = 'Ваш браузер не поддерживает функцию определения местоположения';
    }
  }

  const locationSucces = (data) => {
    console.log(data);
    let link = `https://www.openstreetmap.org/#map=10/${data.coords.longitude}/${data.coords.latitude}
`;
    chatOutput.innerHTML = `<a href="${link}" target="_blank">Вы находитесь здесь</a>`;

  }

  const locationError = () => {
    infoOutput.innerText = 'При определении местоположения произошла ошибка';
  }

  btnGeo.addEventListener('click', getLocation);

}

document.addEventListener('DOMContentLoaded', pageLoaded);




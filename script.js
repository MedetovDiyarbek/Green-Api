
function getSettings() {
    const idInstance = document.getElementById("idInstance").value;
    const apiToken = document.getElementById("apiTokenInstance").value;

    if (!idInstance || !apiToken) {
        alert("Заполните поля IDInstance и APIToken!");
        return;
    }

    const apiUrl = `https://7105.api.greenapi.com/waInstance${idInstance}/getSettings/${apiToken}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(result => {
            console.log("Ответ API:", result);
            document.getElementById("responseBox").textContent = JSON.stringify(result, null, 2);
        })
        .catch(error => {
            console.error("Ошибка:", error);
            document.getElementById("responseBox").textContent = "Ошибка при получении настроек";
        });
}


function getStateInstance() {
    const idInstance = document.getElementById("idInstance").value;
    const apiToken = document.getElementById("apiTokenInstance").value;

    if (!idInstance || !apiToken) {
        alert("Заполните поля IDInstance и APIToken!");
        return;
    }

    const apiUrl = `https://7105.api.greenapi.com/waInstance${idInstance}/getStateInstance/${apiToken}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(result => {
            console.log("Ответ API:", result);
            document.getElementById("responseBox").textContent = JSON.stringify(result, null, 2);
        })
        .catch(error => {
            console.error("Ошибка:", error);
            document.getElementById("responseBox").textContent = "Ошибка при получении состояния экземпляра";
        });
}



function sendMessage() {
    const idInstance = document.getElementById("idInstance").value;
    const apiToken = document.getElementById("apiTokenInstance").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const message = document.getElementById("messageText").value;

    // Проверяем правильность введенного номера телефона
    const formattedPhoneNumber = phoneNumber.trim().replace(/\D/g, '') + "@c.us"; 

    if (!idInstance || !apiToken || !phoneNumber || !message) {
        alert("Заполните все поля!");
        return;
    }

    const chatId = formattedPhoneNumber;
    const apiUrl = `https://7105.api.greenapi.com/waInstance${idInstance}/sendMessage/${apiToken}`;

    const data = {
        chatId,
        message
    };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Ответ API:", result);

        
        if (result && result.idMessage) {
            const formattedResponse = {
                idMessage: result.idMessage
            };
            document.getElementById("responseBox").textContent = JSON.stringify(formattedResponse, null, 2);
        } else {
            
            console.error("Ответ API не содержит idMessage");
            document.getElementById("responseBox").textContent = JSON.stringify(result, null, 2);
        }
    })
    .catch(error => {
        console.error("Ошибка:", error);
        document.getElementById("responseBox").textContent = "Ошибка при отправке сообщения";
    });
}




function sendFileByUrl() {
    const idInstance = document.getElementById("idInstance").value;
    const apiToken = document.getElementById("apiTokenInstance").value;
    const phoneNumber = document.getElementById("phoneNumberFile").value.trim(); 
    const fileUrl = document.getElementById("fileUrl").value.trim();

    
    if (!idInstance || !apiToken) {
        alert("ID Instance и API Token обязательны!");
        return;
    }

    
    let chatId = null;
    if (phoneNumber) {
        
        if (!/^\d+$/.test(phoneNumber)) {
            alert("Номер телефона должен содержать только цифры!");
            return;
        }
        chatId = `${phoneNumber}@c.us`;
        
    } else {
        alert("Введите номер телефона!");
        return;
    }

   
    if (!fileUrl) {
        alert("URL файла обязателен!");
        return;
    }

    if (!fileUrl.startsWith('http://') && !fileUrl.startsWith('https://')) {
        alert("Неверный формат URL файла!");
        return;
    }

    const apiUrl = `https://7105.api.greenapi.com/waInstance${idInstance}/sendFileByUrl/${apiToken}`;

    const data = {
        chatId: chatId,   
        urlFile: fileUrl, 
        fileName: "file.jpg" 
    };

    
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Ответ API:", result);
        if (result && result.message) {
            document.getElementById("responseBox").textContent = `Ошибка: ${result.message}`;
        } else {
            document.getElementById("responseBox").textContent = JSON.stringify(result, null, 2);
        }
    })
    .catch(error => {
        console.error("Ошибка при отправке файла:", error);
        document.getElementById("responseBox").textContent = "Ошибка при отправке файла";
    });
}

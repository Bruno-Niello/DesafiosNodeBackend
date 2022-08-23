const socket = io.connect();

const render = (data) => {
    const html = data.map((el, index)=>{
        return(`<div><strong>${el.author}</strong>:${el.text}</div>`)
    }).join(" ");
    document.querySelector('#messages').innerHTML = html;
}

function addMessage(e) {
    const autor = document.querySelector("#author").value;
    const texto = document.querySelector("#text").value;
    const mensaje = {
        author: autor,
        text: texto
    };

    socket.emit('new-message', mensaje);

    return false;
}

socket.on('messages', data => {
    render(data);
});
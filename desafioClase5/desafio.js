const http = require('http');

const getMensaje = () => {
    
    const horario = new Date().getHours();
    let mensaje; 
    
    if(horario >= 6 && horario <= 12){
        mensaje = "buenos dias!"
    } else if (horario >= 13 && horario <= 19) {
        mensaje = "buenas tardes!"
    } else {
        mensaje = "buenas noches!"
    }

    return mensaje;
}

const server = http.createServer((peticion, respuesta)=>{
    respuesta.end(getMensaje());
})

const connectedServer = server.listen(8080, ()=>{
    console.log(`Server http escuchando en el puerto ${connectedServer.address().port}`)
})


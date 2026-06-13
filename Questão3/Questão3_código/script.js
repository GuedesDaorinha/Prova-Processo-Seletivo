const URL_USUARIOS = 'https://jsonplaceholder.typicode.com/users';
const URL_TAREFAS = 'https://jsonplaceholder.typicode.com/todos';

async function atividade(){
    const response_usu = await fetch(URL_USUARIOS);
    const response_tar = await fetch(URL_TAREFAS)
    let maiorcontador = 0;
    let usuariomaiorcontador = "";
    let contador = 0;
    let contadorgeral = 0;    
    if(response_tar.status == 200 && response_usu.status == 200){
        const obj_usu = await response_usu.json()
        const obj_tar = await response_tar.json()
        for(let i=0;i<obj_usu.length; i++){
            let contador = 0;
            let contadorgeral = 0;
            for(let j=0;j<obj_tar.length;j++){
                if(obj_usu[i].id == obj_tar[j].userId && obj_tar[j].completed == false){
                    contador++;
                    contadorgeral++;
                }
            }
            if(contador > maiorcontador){
                maiorcontador = contador;
                usuariomaiorcontador = obj_usu[i].name;
            }
            console.log("O usuario  " + obj_usu[i].name + " com " + contadorgeral + " tarefas pendentes ")
        }
    }
    console.log("=========================================RESULTADO============================================================================")
    console.log("O usuario  " + usuariomaiorcontador + " com " + maiorcontador + " tarefas pendentes sendo o usuario com mais tarefas pendentes");
    console.log("=========================================RESULTADO============================================================================")
}
atividade();
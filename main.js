//esto hace que en cuanto cargue la pagina, se cargue la cámara
Webcam.attach( '#camara');

//activara la camara
camara=document.getElementById("camara");


//configuracion de la camara
Webcam.set({
        width: 350,
        height: 300,
        image_format: 'png',
        png_quality:90
    });


//tomar de la foto
function tomar_selfie(){
    //websnap es una funcion predefinida por la API
    //data_uri sirve para visualizar la foto tomada como un dato
    Webcam.snap(function(data){
        document.getElementById("resultado").innerHTML='<img id="selfie" src=" '+data+' "/>';
    });
}

//muestra en la consola la version de la libreria mostando que esta en la version mas reciente
console.log('ml5 version:', ml5.version);

//importamos nuestro modelo de teachable y lo guardamos en una variable
modelocreado = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/s1cJTRIqn/model.json',cargar_modelo);

//muestra un msj en la consola para que el usuario sepa que se cargo el modelo
function cargar_modelo() {
    console.log('¡Su modelo ha sido cargado!');
  }


// --------------------------CODIGO DE LA CLASE 105 ------------------------

  //crearemos la funcion de identificar objeto
  function identificar(){
      //almacenamos la foto tomada en una variable
      foto_tomada=document.getElementById('selfie');

      //classify es una funcion que se usa para comparar la imagen del modelo con la nuestra
      modelocreado.classify(foto_tomada, gotResult);

  }

  //ESTA FUNCION IDENTIFICA ERRORES CON EL MODELO 

  function gotResult(error, results){

      //verifica errores y resultados
      if(error){
          console.error(error);
      }
      
      else{
          console.log(results);

          //label es el nombre de la carpeta que contiene los datos en consola
          document.getElementById('objeto').innerHTML=results[0].label;

          //el num 3 dentro de fixed indica la cantidad de decimales de la cifra
          //confidence es el nivel de confianza que genera la identificacion de objetos
          document.getElementById('precision').innerHTML= (results[0].confidence.toFixed(3))*100;

      }

  }
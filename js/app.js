var Calculadora = {
  // Función de inicialización
  init: function(){
    // Inicializar las teclas superiores
    var teclas = document.querySelectorAll(".teclado > img");
    for (i=0; i<teclas.length; i++){
      teclas[i].onmousedown = this.reducirTamannoTeclaSuperior;
      teclas[i].onclick = this.manejarClickTecla;
    }
    // Inicializar teclas inferiores
    teclas = document.querySelectorAll(".teclado .row .col1 img");
    for (i=0; i<teclas.length; i++){
      teclas[i].onmousedown = this.reducirTamannoTeclaInferior;
      teclas[i].onclick = this.manejarClickTecla;
    }
    // Inicializar la tecla MAS
    var teclaMas = document.getElementById("mas");
    teclaMas.onmousedown = this.reducirTamannoTeclaMas;
    teclaMas.onclick = this.manejarClickTecla;
  },

  // Métodos para reducción del tamaño
  reducirTamannoTeclaSuperior: function(){
    var tecla = this;
    tecla.style.width = "20%";
    setTimeout(function(){
      tecla.style.width = "22%";
    }, 200);
  },
  reducirTamannoTeclaInferior: function(){
    var tecla = this;
    tecla.style.width = "27%";
    setTimeout(function(){
      tecla.style.width = "29%";
    }, 200);
  },
  reducirTamannoTeclaMas: function(){
    var tecla = this;
    tecla.style.width = "87%";
    setTimeout(function(){
      tecla.style.width = "90%";
    }, 200);
  },

  // Método general para manejar el evento click del las teclas
  manejarClickTecla: function(){
    var tecla = this.alt;

    // Validar que no se puedan ingresar más de 8 dígitos
    if (!Operaciones.cantidadDigitosValidos(tecla)) return;

    // Si la tecla presionada es un número
    if (!isNaN(tecla)){
      Operaciones.operarNumero(tecla);
    // Si la tecla presionada no es un número
    }else {
      switch (tecla) {
        // Si la tecla es ON/C
        case "On":
          Operaciones.operarOn();
          break;
        // Si la tecla es (.)
        case "punto":
          Operaciones.operarPunto();
          break;
        // Si la tecla es +/-
        case "signo":
          Operaciones.operarSigno();
          break;
        case "mas":
          Operaciones.guardarOperacion("+");
          break;
        case "menos":
          Operaciones.guardarOperacion("-");
          break;
        case "por":
          Operaciones.guardarOperacion("*");
          break;
        case "dividido":
          Operaciones.guardarOperacion("/");
          break;
        case "igual":
          Operaciones.mostrarResultado();
          break;
      }
    }
  }

};

var Operaciones = {
  operando1: 0,
  tipoOperacion: "",
  cantidadDigitosValidos: function(tecla){
    var operaciones = ["On", "signo", "mas", "menos", "por", "dividido", "igual"];
    var valorDisplay = document.getElementById("display").innerHTML;

    // Validar que no se puedan ingresar más de 8 dígitos, sólo si no se está aplicando una operación
    if (operaciones.indexOf(tecla) === -1){
      if (valorDisplay.includes("-")){
        if (valorDisplay.includes(".") && valorDisplay.length == 10){
          return false;
        }
        else if (!valorDisplay.includes(".") && valorDisplay.length == 9){
          return false;
        }
      }
      else if (valorDisplay.includes(".")) {
        if (valorDisplay.length == 9)
          return false;
      }
      else if (valorDisplay.length == 8){
        return false;
      }
    }
    return true;
  },
  operarNumero: function(tecla){
    var display = document.getElementById("display");
    var valorDisplay = display.innerHTML;

    // Si la tecla presionada es 0
    if (tecla === 0) {
      if (valorDisplay != "0"){
        display.innerHTML = valorDisplay + tecla;
      }
    }
    // Si la tecla presionada es un número mayor a 0
    else{
      if (valorDisplay == "0"){
        display.innerHTML = tecla;
      }else{
        display.innerHTML = valorDisplay + tecla;
      }
    }
  },
  operarOn: function(){
    document.getElementById("display").innerHTML = "0";
  },
  operarPunto: function(){
    var display = document.getElementById("display");
    var valorDisplay = display.innerHTML;

    if (!valorDisplay.includes("."))
      display.innerHTML = valorDisplay + ".";
  },
  operarSigno: function(){
    var display = document.getElementById("display");
    var valorDisplay = display.innerHTML;

    if (valorDisplay != "0"){
      if (!valorDisplay.includes("-"))
        display.innerHTML = "-" + valorDisplay;
      else
        display.innerHTML = valorDisplay.replace("-", "");
    }
  },
  guardarOperacion: function(tipoOperacion){
    var display = document.getElementById("display");
    this.operando1 = Number(display.innerHTML);
    this.tipoOperacion = tipoOperacion;
    display.innerHTML = "";
  },
  mostrarResultado: function(){
    var display = document.getElementById("display");
    var operando2 = Number(display.innerHTML);
    var resultado = 0;

    // Dependiendo del tipo de operación
    switch (this.tipoOperacion) {
      case "+":
        resultado = this.operando1 + operando2;
        break;
      case "-":
        resultado = this.operando1 - operando2;
        break;
      case "*":
        resultado = this.operando1 * operando2;
        break;
      case "/":
        resultado = this.operando1 / operando2;
        break;
    }

    // Mostrar el resultado
    display.innerHTML = this.recortarValor(resultado.toString());

    // Resetear los valores originales
    this.operando1 = 0;
    this.tipoOperacion = "";
  },
  recortarValor: function(valor){
    var resultado = valor;
    // Asegurar que el resultado no tenga más de 8 dígitos
    if (valor.includes("-"))
    {
      if (resultado.indexOf(".") > 8 || resultado.indexOf(".") == -1)
        resultado = valor.substr(0, 9);
      else
        resultado = valor.substr(0, 10);
    }
    else{
      if (resultado.indexOf(".") > 7 || resultado.indexOf(".") == -1)
        resultado = valor.substr(0, 8);
      else
        resultado = valor.substr(0, 9);
    }

    if (resultado.endsWith("."))
      resultado = resultado.substr(0, resultado.length - 1);

    return resultado;
  }
}

// var Operacion = {
//   operando1: 0,
//   tipoOperacion: ""
// }

Calculadora.init();

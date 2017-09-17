(function(){
	var primeraUbicacion = $('#primera-ubicacion');
	var segundaUbicacion = $('#segunda-ubicacion');
	var numeros = $('.numeros');

	var cargarPagina = function() {
		$('.modal').modal();
		primeraUbicacion.keydown(validarNumeros);
		segundaUbicacion.keydown(validarNumeros)
	}

	/*var validarDatos = function(event) {
		var expresionRegular = /^[0-9]$/;

		numeros.each(function( indice, elemento) {
			// console.log(indice , elemento);
			var input = $(elemento);
			if(expresionRegular.test(input.val())){
				console.log('no es numero');
			}else{
				console.log('es numero');
			}
		});
	}*/
	var validarNumeros = function(e){
		if (e.keyCode !== 8 && (e.keyCode < 48 || e.keyCode > 57)){
			e.preventDefault();
		}	
	};
	
	$(document).ready(cargarPagina);
})();
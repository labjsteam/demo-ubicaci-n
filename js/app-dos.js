(function(){
	var latitud = $('#latitud');
	var longitud = $('#longitud');
	var btnMostrarLugarFavorito = $('#mostrarLugarFavorito');
	var btnUbicacionActual = $('#btn-ubicacion-actual');

	var cargarPagina = function() {
		$('.modal').modal();
		latitud.keydown(validarNumeros);
		longitud.keydown(validarNumeros);
		// la descomentamos al principio para que vean que si entra la funcion
		// comprobarNavegador();
		btnMostrarLugarFavorito.click(initMap);
		btnUbicacionActual.click(comprobarNavegador);
	}
	var validarNumeros = function(e){
		if (e.keyCode !== 8 && (e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 189 || e.keyCode > 190)){
			e.preventDefault();
		}	
	};
	var comprobarNavegador = function() {
		if ("geolocation" in navigator) {
			// obtenerUbicacion es nuestra primera funcion como parametro
			console.log('si acepta tu navegador el GPS');
			navigator.geolocation.getCurrentPosition(ubicacionActual,function(error) {
				console.log(error);
			});
		}else{
			alert('Actualiza tu navegador');
		}
	}
	var initMap = function() {
		// lat y lng solo recibe numeros, por eso la conversion
		var valorLatitud = Number(latitud.val());
		var valorLongitud = Number(longitud.val());
		console.log(typeof valorLatitud);
		console.log( typeof valorLongitud);

        var misCoordenadas = {
	        	// lat: -25.363,
	        	// lng: 131.044
	        	lat: valorLatitud,
	        	lng: valorLongitud
        	};
        var map = new google.maps.Map($('#mapa')[0], {
          zoom: 4,
          center: misCoordenadas
        });
        var marker = new google.maps.Marker({
          position: misCoordenadas,
          map: map
        });
	};

	var ubicacionActual = function(posicion){
		console.log(posicion);
		var coordenadasActuales = {
			lat: posicion.coords.latitude, 
			lng: posicion.coords.longitude
		};

		mostrarMapaActual(coordenadasActuales);
	}

	var mostrarMapaActual = function( coordenadasActuales) {
		var mapa = new google.maps.Map($('#mapa-ubicacion-actual')[0], {
			zoom: 18,
			center: coordenadasActuales
		});
		var marcador = new google.maps.Marker({
			position: coordenadasActuales,
			map: mapa,
			title: 'Tu ubicación'
		});
	}
	$(document).ready(cargarPagina);
})();
(function(){
	
	// Defines variables globales
	var latitud = $('#latitud');
	var longitud = $('#longitud');
	var btnMostrarLugarFavorito = $('#mostrarLugarFavorito');
	var btnUbicacionActual = $('#btn-ubicacion-actual');
	var coordenadasActuales;
	var misCoordenadas;



	/**
	 * Como referencia las funciones nombralas de la forma function name(){} para evitar confusión
	 */	

	function cargarPagina() {
		$('.modal').modal();
		latitud.keydown(validarNumeros);
		longitud.keydown(validarNumeros);
		// la descomentamos al principio para que vean que si entra la funcion
		// comprobarNavegador();
		btnMostrarLugarFavorito.click(initMap);
		btnUbicacionActual.click(comprobarNavegador);
	}


	function validarNumeros(e){
		if (e.keyCode !== 8 && (e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 189 || e.keyCode > 190)){
			e.preventDefault();
		}	
	};
	function comprobarNavegador() {
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

	function initMap() {
		// lat y lng solo recibe numeros, por eso la conversion
		valorLatitud = Number(latitud.val());
		valorLongitud = Number(longitud.val());

        misCoordenadas = {
			lat: valorLatitud,
			lng: valorLongitud
        };
        var map = new google.maps.Map($('#mapa')[0], {=
          zoom: 18,
          center: misCoordenadas
        });
        var marker = new google.maps.Marker({
        	position: misCoordenadas,
        	map: map
        });
	};

	function ubicacionActual(posicion){
		coordenadasActuales = {
			lat: posicion.coords.latitude, 
			lng: posicion.coords.longitude
		};
		mostrarMapaActual(coordenadasActuales);
	}

	function mostrarMapaActual(coordenadasActuales) {
		var btnRuta = $('#btnRuta');
		var mapa = new google.maps.Map($('#mapa-ubicacion-actual')[0], {
			zoom: 18,
			center: coordenadasActuales
		});
		var marcador = new google.maps.Marker({
			position: coordenadasActuales,
			map: mapa,
			title: 'Tu ubicación'
		});
		//crear un boton 
		var botonRuta = $('<button />', {"class":"waves-effect waves-light btn"});
		botonRuta.text("mostrar ruta");
		// botonRuta.click(trazarRuta);
		botonRuta.on('click', function() {

			// Anteriormente solo tenías un parametro, recuerda que recibe dos.
            trazarRuta(misCoordenadas,coordenadasActuales);
        })
		btnRuta.append(botonRuta);
	}


	function trazarRuta(misCoordenadas, coordenadasActuales) {
		
		// Almacenas en variables independientes lo que recibes por parámetros
		// Como parámetro recibes dos objetos, anteriormente recibias uno
		var puntoUno = misCoordenadas;	
		var puntoDos = coordenadasActuales;


		// Para pintar la ruta solo necesitarias pasar el origen y el destino (la variable puntoUno y Dos)


		/*  mapa.drawRoute({
		 	origin: [coordenadasRuta.lat, coordenadasRuta.lng],
		 	destination: [valorLatitud, valorLongitud],
		 	travelMode: 'driving',
		 	strokeColor: '#131540',
		 	strokeOpacity: 0.6,
		 	strokeWeight: 6
		 });

	       mapita.drawRoute({
	         origin: [-12.044012922866312, -77.02470665341184],
	         destination: [-12.090814532191756, -77.02271108990476],
	         travelMode: 'driving',
	         strokeColor: '#131540',
	         strokeOpacity: 0.6,
	         strokeWeight: 6
	       }); */
		}


	$(document).ready(cargarPagina);
})();
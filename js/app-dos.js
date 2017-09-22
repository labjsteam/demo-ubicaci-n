(function(){
	var latitud = $('#latitud');
	var longitud = $('#longitud');
	var btnMostrarLugarFavorito = $('#mostrarLugarFavorito');
	var btnUbicacionActual = $('#btn-ubicacion-actual');
	var valorLatitud = 0;
	var valorLongitud = 0;
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
		valorLatitud = Number(latitud.val());
		valorLongitud = Number(longitud.val());

        misCoordenadas = {
	        	// lat: -25.363,
	        	// lng: 131.044
	        	lat: valorLatitud,
	        	lng: valorLongitud
        	};   
        var map = new google.maps.Map($('#mapa')[0], {
          zoom: 18,
          center: misCoordenadas
        });
        var marker = new google.maps.Marker({
          position: misCoordenadas,
          map: map
        });
	};

	var ubicacionActual = function(posicion){
		// console.log(posicion);
		coordenadasActuales = {
			lat: posicion.coords.latitude, 
			lng: posicion.coords.longitude
		};
		mostrarMapaActual(coordenadasActuales);
	}

	var mostrarMapaActual = function( coordenadasActuales) {
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
            trazarRuta(coordenadasActuales);
        })
		btnRuta.append(botonRuta);
	}

	var trazarRuta = function(coordenadasActuales) {
		console.log(coordenadasActuales);
		console.log(valorLongitud);
		console.log(valorLatitud);
		
		var mapita = new GMaps({
			el: '#mapa-ubicacion-actual',
			lat: coordenadasActuales.lat,
			lng: coordenadasActuales.lng
		});
		mapita.drawRoute({
			origin: [coordenadasActuales.lat, coordenadasActuales.lng],
			destination: [valorLatitud, valorLongitud],
			travelMode: 'driving',
			strokeColor: '#131540',
			strokeOpacity: 0.6,
			strokeWeight: 6
		});

	}

	$(document).ready(cargarPagina);
})();
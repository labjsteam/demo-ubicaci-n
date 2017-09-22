(function(){
	var latitud = $('#latitud');
	var longitud = $('#longitud');
	var btnMostrarLugarFavorito = $('#mostrarLugarFavorito');
	var btnUbicacionActual = $('#btn-ubicacion-actual');
	var coordenadasActuales;
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
        misCoordenadas = {
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
        return misCoordenadas;
     	// console.log(misCoordenadas);
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
		return coordenadasActuales;
	}

	var trazarRuta = function(misCoordenadas, coordenadasActuales) {
		var puntoUno = initMap(misCoordenadas);	
		var puntoDos = coordenadasActuales;
		console.log(puntoUno, puntoDos);
		// console.log(misCoordenadas, coordenadasActuales);
		// console.log(puntoUno);


		// var coordenadasPuntoUno = {
		// 	lat: puntoUno.lat,
		// 	lng: puntoUno.lng
		// };		
		// console.log('las rutas' + coordenadasPuntoUno.lat + coordenadasPuntoUno.lng);
		// mapa.drawRoute({
		// 	origin: [coordenadasRuta.lat, coordenadasRuta.lng],
		// 	destination: [valorLatitud, valorLongitud],
		// 	travelMode: 'driving',
		// 	strokeColor: '#131540',
		// 	strokeOpacity: 0.6,
		// 	strokeWeight: 6
		// });
		// var misCoordenadas = {
	 //        	lat: -25.363,
	 //        	lng: 131.044
  //       	};
		// var mapita = new google.maps.Map($('#mapa-ubicacion-actual')[0], {
		// 	zoom: 8,
		// 	center: misCoordenadas
		// });
	      // var mapita = new GMaps({
	      //   el: '#mapa-ubicacion-actual',
	      //   lat: -12.044012922866312,
	      //   lng: -77.02470665341184
	      // });
	      // mapita.drawRoute({
	      //   origin: [-12.044012922866312, -77.02470665341184],
	      //   destination: [-12.090814532191756, -77.02271108990476],
	      //   travelMode: 'driving',
	      //   strokeColor: '#131540',
	      //   strokeOpacity: 0.6,
	      //   strokeWeight: 6
	      // });
		}

	$(document).ready(cargarPagina);
})();

$(function () {
	var Maps;
	var Routes;
	var App;
	var Utils;
	Utils = {
		settings: {
				debug: false
		},
		clickEvent: 'click',
		log: function(what) {
				if ( Utils.settings.debug && window.console ) {
						console.log(what);
				}
		}
	};
	//  Для быстрого использования
	var clickEvent = Utils.clickEvent,
						_log = Utils.log;
	Maps = {
		load: function() {
				_log( "Map: load script" );
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
						'callback=initMap&key=AIzaSyDv5SXOEM0fA4saFt7tFSsOjdMjVtvcvPE';
				document.body.appendChild(script);
		},
		initSettings: function() {
				_log( "Map: init settings" );
				this.map = null;
				this.marker = null;
				this.settings = {
						zoom: 16,
						center: new google.maps.LatLng(59.936746, 30.287086),
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						scrollwheel: false,
						mapTypeControl: false,
						panControl: true,
						panControlOptions: {
								position: google.maps.ControlPosition.LEFT_CENTER
						},
						zoomControl: true,
						zoomControlOptions: {
								position: google.maps.ControlPosition.LEFT_CENTER
						},
						scaleControl: false,
						streetViewControl: true
				};
		},
		init: function() {
				_log( "Map: init Map" );
				Maps.initSettings();
				Maps.map = new google.maps.Map(document.getElementById('map'),
						Maps.settings );
				Maps.marker = new google.maps.Marker({
						map: Maps.map,
						draggable: false,
						position: new google.maps.LatLng(59.936746, 30.287086)
				});
		}
	};
	//  Функция для обратного вызова карт при асинхронной загрузке
	window.initMap = function() {
		Maps.init();
	};
	Routes = {
		init: function() {
			_log( "Routes: init" );
			//  Подключаем Google Maps на странице «Контакты»
				Maps.load();
		}
	};
	App = {
			init: function() {
					Routes.init();
			}
	};
	if ($('#map').length) {
    App.init();
  }
});

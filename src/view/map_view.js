define([

	'jquery',
	'underscore',
	'backbone',
	'collection/locate_collection',
	'view/company_view',
	'topojson',
	'geosearch',
	'geosearch_provider',
	'leaflet',
	'leaflet_cluster'

	], function($, _, Backbone, LocateCollection, CompanyView) {

		var mapView = Backbone.View.extend({

			initialize: function  () {
                                // company view now depends on window.map
                                // allow it for a while
                                this.map = L.map('map', {
                                    zoomControl: false,
                                    attributionControl: false
                                });

				this.location = new LocateCollection();
				this._company_view = new CompanyView({ map: this.map });

				this.listenTo(this.location, 'add', this.userLocation)
				this.location.startLocate();

				this.markers = L.markerClusterGroup();

                                new L.Control.GeoSearch({
                                    provider: new L.GeoSearch.Provider.OpenStreetMap()
                                }).addTo(this.map);

                                L.tileLayer(
                                    'http://{s}.tile.cloudmade.com/f59941c17eda4947ae395e907fe531a3/997/256/{z}/{x}/{y}.png',
                                    { maxZoom: 18, }
                                ).addTo(this.map);

				this.map.addControl(new L.Control.Zoom({ position: 'bottomleft' }));
			},

			userLocation: function () {
				var option = this.location.pop().attributes.latlng;
				var setplace = [option.coords.latitude, option.coords.longitude];
				this.map.setView(setplace, 13);
				L.marker(setplace).addTo(this.map).bindPopup("<b>你現在在這！</b>").openPopup();
				this._company_view.addlocateCenter({center: {lat: option.coords.latitude, lng: option.coords.longitude}})
			},
		});

		return mapView;	
	})

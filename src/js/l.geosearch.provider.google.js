/**
 * L.Control.GeoSearch - search for an address and zoom to it's location
 * L.GeoSearch.Provider.Google uses google geocoding service
 * https://github.com/smeijer/leaflet.control.geosearch
 */

L.GeoSearch.Provider.Google = L.Class.extend({
    options: {

    },

    initialize: function(options) {
        options = L.Util.setOptions(this, options);
    },

    GetServiceUrl: function (qry) {
        var parameters = L.Util.extend({
            address: qry,
            sensor: false
        }, this.options);

        return 'http://maps.googleapis.com/maps/api/geocode/json'
            + L.Util.getParamString(parameters);
    },

    ParseJSON: function (data) {
        if (data.results.length == 0)
            return [];

        var results = [];
        for (var i = 0; i < data.results.length; i++)
            results.push(new L.GeoSearch.Result(
                data.results[i].geometry.location.lng, 
                data.results[i].geometry.location.lat, 
                data.results[i].formatted_address
            ));

        return results;
    }
});
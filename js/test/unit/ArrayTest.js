describe('array', function () {

    beforeEach(module('Api'));

    beforeEach(module(function ($provide) {
        var $api = jasmine.createSpyObj('$api', ['array']);
        var $http = jasmine.createSpyObj('$api', ['get', 'delete', 'put', 'head', 'post', 'jsonp']);

        $api.array.andCallFake(function (request) {
            return request;
        });

        $provide.constant('$api', $api);
        $provide.constant('$http', $http);
    }));

    it('should call create an array with a get', inject(function ($array, $api, $http) {
        var path = 'api';
        var config = {data: {}};
        var request = [];

        $http.get.andReturn(request);

        var array = $array.get(path, config);

        expect($http.get).toHaveBeenCalledWith(path, config);
        expect($api.array).toHaveBeenCalledWith(request);
        expect(array).toBe(request);
    }));

    it('should call create an array with a post', inject(function ($array, $api, $http) {
        var path = 'api';
        var data = {};
        var config = {data: {}};
        var request = [];

        $http.post.andReturn(request);

        var array = $array.post(path, data, config);

        expect($http.post).toHaveBeenCalledWith(path, data, config);
        expect($api.array).toHaveBeenCalledWith(request);
        expect(array).toBe(request);
    }));

    it('should call create an array with a put', inject(function ($array, $api, $http) {
        var path = 'api';
        var data = {};
        var config = {data: {}};
        var request = [];

        $http.put.andReturn(request);

        var array = $array.put(path, data, config);

        expect($http.put).toHaveBeenCalledWith(path, data, config);
        expect($api.array).toHaveBeenCalledWith(request);
        expect(array).toBe(request);
    }));

    it('should call create an array with a delete', inject(function ($array, $api, $http) {
        var path = 'api';
        var config = {data: {}};
        var request = [];

        $http.delete.andReturn(request);

        var array = $array.delete(path, config);

        expect($http.delete).toHaveBeenCalledWith(path, config);
        expect($api.array).toHaveBeenCalledWith(request);
        expect(array).toBe(request);
    }));

    it('should call create an array with a head', inject(function ($array, $api, $http) {
        var path = 'api';
        var config = {data: {}};
        var request = [];

        $http.head.andReturn(request);

        var array = $array.head(path, config);

        expect($http.head).toHaveBeenCalledWith(path, config);
        expect($api.array).toHaveBeenCalledWith(request);
        expect(array).toBe(request);
    }));

    it('should call create an array with a jsonp', inject(function ($array, $api, $http) {
        var path = 'api';
        var config = {data: {}};
        var request = [];

        $http.jsonp.andReturn(request);

        var array = $array.jsonp(path, config);

        expect($http.jsonp).toHaveBeenCalledWith(path, config);
        expect($api.array).toHaveBeenCalledWith(request);
        expect(array).toBe(request);
    }));
});

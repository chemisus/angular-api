describe('object', function () {

    beforeEach(module('Api'));

    beforeEach(module(function ($provide) {
        var $api = jasmine.createSpyObj('$api', ['object']);
        var $http = jasmine.createSpyObj('$api', ['get', 'delete', 'put', 'head', 'post', 'jsonp']);

        $api.object.andCallFake(function (request) {
            return request;
        });

        $provide.constant('$api', $api);
        $provide.constant('$http', $http);
    }));

    it('should call create an object with a get', inject(function ($object, $api, $http) {
        var path = 'api';
        var config = {data: {}};
        var request = {};

        $http.get.andReturn(request);

        var object = $object.get(path, config);

        expect($http.get).toHaveBeenCalledWith(path, config);
        expect($api.object).toHaveBeenCalledWith(request);
        expect(object).toBe(request);
    }));

    it('should call create an object with a post', inject(function ($object, $api, $http) {
        var path = 'api';
        var data = {};
        var config = {data: {}};
        var request = {};

        $http.post.andReturn(request);

        var object = $object.post(path, data, config);

        expect($http.post).toHaveBeenCalledWith(path, data, config);
        expect($api.object).toHaveBeenCalledWith(request);
        expect(object).toBe(request);
    }));

    it('should call create an object with a put', inject(function ($object, $api, $http) {
        var path = 'api';
        var data = {};
        var config = {data: {}};
        var request = {};

        $http.put.andReturn(request);

        var object = $object.put(path, data, config);

        expect($http.put).toHaveBeenCalledWith(path, data, config);
        expect($api.object).toHaveBeenCalledWith(request);
        expect(object).toBe(request);
    }));

    it('should call create an object with a delete', inject(function ($object, $api, $http) {
        var path = 'api';
        var config = {data: {}};
        var request = {};

        $http.delete.andReturn(request);

        var object = $object.delete(path, config);

        expect($http.delete).toHaveBeenCalledWith(path, config);
        expect($api.object).toHaveBeenCalledWith(request);
        expect(object).toBe(request);
    }));

    it('should call create an object with a head', inject(function ($object, $api, $http) {
        var path = 'api';
        var config = {data: {}};
        var request = {};

        $http.head.andReturn(request);

        var object = $object.head(path, config);

        expect($http.head).toHaveBeenCalledWith(path, config);
        expect($api.object).toHaveBeenCalledWith(request);
        expect(object).toBe(request);
    }));

    it('should call create an object with a jsonp', inject(function ($object, $api, $http) {
        var path = 'api';
        var config = {data: {}};
        var request = {};

        $http.jsonp.andReturn(request);

        var object = $object.jsonp(path, config);

        expect($http.jsonp).toHaveBeenCalledWith(path, config);
        expect($api.object).toHaveBeenCalledWith(request);
        expect(object).toBe(request);
    }));
});

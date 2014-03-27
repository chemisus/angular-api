describe('api make', function () {
    beforeEach(module('Api'));

    var value;
    var request;
    var success;
    var error;

    beforeEach(module(function ($provide) {
        var $rootScope = jasmine.createSpyObj('$rootScope', ['$apply']);

        $provide.constant('$rootScope', $rootScope);
    }));

    beforeEach(inject(function () {
        value = {};

        request = jasmine.createSpyObj('request', ['success', 'error']);

        request.success.andCallFake(function (callback) {
            success = callback;
        });

        request.error.andCallFake(function (callback) {
            error = callback;
        });
    }));

    it('should set correct default values', inject(function ($api) {
        $api.make(value, request);

        expect(value.$resolved).toBeFalsy();
        expect(value.$status).toBeNull();
        expect(value.$failed).toBeFalsy();
        expect(value.$errors).toEqual([]);
        expect(value.$headers).toBeNull();
        expect(value.$request).toBe(request);
    }));

    it('should return correct results when the request is successful', inject(function ($api) {
        $api.make(value, request);

        var response = {id: 1, name: 'a'};
        var status = 200;
        var headers = ['a', 'b', 'c'];

        success(response, status, headers);

        expect(value.$resolved).toBeTruthy();
        expect(value.$status).toBe(status);
        expect(value.$failed).toBeFalsy();
        expect(value.$errors).toEqual([]);
        expect(value.$headers).toBe(headers);
        expect(value.$request).toBe(request);
    }));

    it('should return correct results when the request failed', inject(function ($api) {
        $api.make(value, request);

        var response = {error: 'something went wrong'};
        var status = 404;
        var headers = ['a', 'b', 'c'];

        error(response, status, headers);

        expect(value.$resolved).toBeTruthy();
        expect(value.$status).toBe(status);
        expect(value.$failed).toBeTruthy();
        expect(value.$errors).toBe(response);
        expect(value.$headers).toBe(headers);
        expect(value.$request).toBe(request);
    }));

    it('should not call $rootScope.$apply if $apply was not called on the object', inject(function ($api, $rootScope) {
        $api.make(value, request);

        success();

        expect($rootScope.$apply).not.toHaveBeenCalled();
    }));

    it('should not call $rootScope.$apply if $apply was not called on the object', inject(function ($api, $rootScope) {
        $api.make(value, request);

        error();

        expect($rootScope.$apply).not.toHaveBeenCalled();
    }));

    it('should call $rootScope.$apply if $apply was called on the object', inject(function ($api, $rootScope) {
        $api.make(value, request);

        value.$apply();

        success();

        expect($rootScope.$apply).toHaveBeenCalled();
    }));

    it('should call $rootScope.$apply if $apply was called on the object', inject(function ($api, $rootScope) {
        $api.make(value, request);

        value.$apply();

        error();

        expect($rootScope.$apply).toHaveBeenCalled();
    }));
});

describe('api make', function () {
    beforeEach(module('Api'));

    var value;
    var request;
    var success;
    var error;

    beforeEach(inject(function ($api) {
        value = {};

        request = jasmine.createSpyObj('request', ['success', 'error']);

        request.success.andCallFake(function (callback) {
            success = callback;
        });

        request.error.andCallFake(function (callback) {
            error = callback;
        });

        $api.make(value, request);
    }));

    it('should set correct default values', function () {
        expect(value.$resolved).toBeFalsy();
        expect(value.$status).toBeNull();
        expect(value.$failed).toBeFalsy();
        expect(value.$errors).toEqual([]);
        expect(value.$headers).toBeNull();
        expect(value.$request).toBe(request);
    });

    it('should return correct results when the request is successful', function () {
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
    });

    it('should return correct results when the request failed', function () {
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
    });
});

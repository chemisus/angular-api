describe('api object', function () {
    var value;
    var request;
    var success;
    var error;

    beforeEach(module('Api'));

    beforeEach(inject(function ($api) {
        request = jasmine.createSpyObj('request', ['success', 'error']);

        request.success.andCallFake(function (callback) {
            success = callback;
        });

        request.error.andCallFake(function (callback) {
            error = callback;
        });

        value = $api.array(request);
    }));

    it('should extend the object with the response when successful', function () {
        var response = ['A', 'B', 'C'];
        var status = 200;
        var headers = ['a', 'b', 'c'];

        success(response, status, headers);

        expect(value).toEqual(response);
    });

    it('should not extend the object with the response when failed', function () {
        var response = {error: 'something went wrong'};
        var status = 404;
        var headers = ['a', 'b', 'c'];

        error(response, status, headers);

        expect(value).toEqual({});
    });
});

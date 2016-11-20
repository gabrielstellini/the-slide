/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require('@angular/core/testing');
var CustomAuthService_1 = require('./CustomAuthService');
describe('AuthService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [CustomAuthService_1.AuthService]
        });
    });
    it('should ...', testing_1.inject([CustomAuthService_1.AuthService], function (service) {
        expect(service).toBeTruthy();
    }));
});

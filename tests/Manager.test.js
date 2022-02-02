const Manager = require('../lib/manager');

describe('Manager', () => {
    it('should return Manager when getRole() is called', () => {
        const obj = new Manager;
        expect(obj.getRole()).toEqual('Manager');
    });
})
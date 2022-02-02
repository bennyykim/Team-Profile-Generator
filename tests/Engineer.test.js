const Engineer = require('../lib/engineer');

describe('Engineer', () => {
    it('should return Engineer when getRole() is called', () => {
        const obj = new Engineer;
        expect(obj.getRole()).toEqual('Employee');
    });
})
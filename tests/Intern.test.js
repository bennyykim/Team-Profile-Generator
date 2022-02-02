const Intern = require('../lib/intern');

describe('Intern', () => {
    it('should return Intern when getRole() is called', () => {
        const obj = new Intern;
        expect(obj.getRole()).toEqual('Intern');
    });
})
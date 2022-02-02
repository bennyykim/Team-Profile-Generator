const Employee = require('../lib/employee');

describe('Employee', () => {
    it('should return the input same as the output', () => {
        const obj = new Employee('name');
        expect(obj.name).toEqual('name');
    });

    it('should return Employee when getRole() is called', () => {
        const obj = new Employee;
        expect(obj.getRole()).toEqual('Employee');
    });
})
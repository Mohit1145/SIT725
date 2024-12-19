import { expect } from 'chai';
import { add, divide } from '../src/math.js';

describe('Math Functions', () => {
    it('should add two numbers correctly', () => {
        expect(add(2, 3)).to.equal(5);
    });

    it('should divide two numbers correctly', () => {
        expect(divide(6, 2)).to.equal(3);
    });

    it('should throw an error when dividing by zero', () => {
        expect(() => divide(6, 0)).to.throw('Division by zero');
    });
});

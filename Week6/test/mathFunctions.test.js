// test/mathFunctions.test.js
import { expect } from 'chai';
import { add, multiply } from '../src/mathFunctions.js';

describe('Math Functions', () => {
    describe('add', () => {
        it('should return 5 for add(2, 3)', () => {
            expect(add(2, 3)).to.equal(5);
        });

        it('should return -1 for add(-2, 1)', () => {
            expect(add(-2, 1)).to.equal(-1);
        });

        it('should return 0 for add(0, 0)', () => {
            expect(add(0, 0)).to.equal(0);
        });

        it('should return 100 for add(50, 50)', () => {
            expect(add(50, 50)).to.equal(100);
        });

        it('should handle adding decimal numbers', () => {
            expect(add(1.5, 2.3)).to.equal(3.8);
        });
    });

    describe('multiply', () => {
        it('should return 6 for multiply(2, 3)', () => {
            expect(multiply(2, 3)).to.equal(6);
        });

        it('should return 0 for multiply(0, 10)', () => {
            expect(multiply(0, 10)).to.equal(0);
        });

        it('should return -15 for multiply(-3, 5)', () => {
            expect(multiply(-3, 5)).to.equal(-15);
        });

        it('should return 1 for multiply(1, 1)', () => {
            expect(multiply(1, 1)).to.equal(1);
        });

        it('should handle multiplying decimal numbers', () => {
            expect(multiply(1.5, 2)).to.equal(3);
        });
    });
});

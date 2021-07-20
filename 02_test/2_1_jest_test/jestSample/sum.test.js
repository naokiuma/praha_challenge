const sum = require('./sum');
test('add_des',() => {
    expect(sum(2,3)).toBe(5);
})
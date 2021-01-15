import { setWeight } from "./setWeight";

it('grams to ounces', () => {
    expect(setWeight('g','oz',28.349523125)).toBe(1)
});

it('grams to pounds', () => {
    expect(setWeight('g','lb',453.59237)).toBe(1)
});

it('grams to kg', () => {
    expect(setWeight('g','kg',1000)).toBe(1)
});

it('ounces to grams', () => {
    expect(setWeight('oz','g',1)).toBe(28.349523125)
});

it('pounds to kg', () => {
    expect(setWeight('lb','kg',5)).toBe(2.2679618500000003)
});
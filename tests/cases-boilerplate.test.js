
const inputCases = [
    undefined,
    true,
    false,
    null,
    "",
    '{"invalid: "JSON"}',
    '{"valid":"JSON"}',
    new Error('This is an error Object'),
    new Date(),
    0,
    1,
    -1,
    100,
    -100,
    1.123,
    1.0099,
    -1.123,
    -1.0099,
    {},
    {nestedEmptyObject: {}},
    {nestedEmptyArray: []},
    [],
    [1,2,3],
    ["array", "of", "string"],
    ["array", "of", `{"invalid: "JSON"}`],
    [undefined, undefined, undefined],
    [{}, {}, {}],
    [() => {return false;}, () => {return false;}, () => {return false;}],
    ["mixed array", [], {}, undefined, 123, -100],
    () => {},
    () => {return false;},
    new Map(['valid', 'map'])
];

describe('cases', ()=> {
    it(`should return true`, () => {
        expect(true).toBe(true);
    });
});
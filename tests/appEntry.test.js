const appEntry = require('../lib/appEntry');

test('appEntry isDev true', () => {
    const entryPoint = 'foo';
    const app = appEntry(true, entryPoint);
    expect(app.length).toBe(2);
    expect(entryPoint.includes(entryPoint)).toBe(true);
});

test('appEntry isDev false', () => {
    const entryPoint = 'foo';
    const app = appEntry(false, entryPoint);
    expect(app.length).toBe(1);
    expect(entryPoint.includes(entryPoint)).toBe(true);
});

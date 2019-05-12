import SunSign from '../src/sunsign';

test('date 9th Feb shoud be an aquarius', () => {
    const sunSign = new SunSign();
    expect(sunSign.getSunSign('09/02/1982').toLocaleLowerCase()).toBe('aquarius');
});
import { DateRangeFilterPipe } from './date-range-filter.pipe';

describe('DateRangeFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new DateRangeFilterPipe(true, true, true);
    expect(pipe).toBeTruthy();
  });
});

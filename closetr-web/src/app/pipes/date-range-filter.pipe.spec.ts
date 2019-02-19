import { DateRangeFilterPipe } from './date-range-filter.pipe';
import { DateFormatService } from '../services/utils/date-format.service';

describe('DateRangeFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new DateRangeFilterPipe(new DateFormatService());
    expect(pipe).toBeTruthy();
  });
});

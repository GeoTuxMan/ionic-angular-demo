import { FormControl } from '@angular/forms';

import { notInPastValidator, todayIso } from './date.validators';

describe('notInPastValidator', () => {
  const fixedNow = () => new Date(2026, 10, 9); // 9 noiembrie 2026
  const validate = (value: string | null) => notInPastValidator(fixedNow)(new FormControl(value));

  it('accepta un camp gol (required se ocupa de el)', () => {
    expect(validate(null)).toBeNull();
    expect(validate('')).toBeNull();
  });

  it('accepta ziua de azi si datele viitoare', () => {
    expect(validate('2026-11-09')).toBeNull();
    expect(validate('2027-01-15T10:00:00')).toBeNull();
  });

  it('respinge o data din trecut', () => {
    expect(validate('2026-11-08')).toEqual({ pastDate: true });
  });

  it('respinge un format invalid', () => {
    expect(validate('09.11.2026')).toEqual({ invalidDate: true });
  });

  it('todayIso foloseste data locala', () => {
    expect(todayIso(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});

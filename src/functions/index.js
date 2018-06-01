import dateFns from 'date-fns';

export const handleRandomDateFormats = (date, preferredFormat) => //eslint-disable-line
  dateFns.format(
    preferredFormat === 'HH:mm' || preferredFormat === 'H:mm:ss'
      ? `1992-05-11 ${date}`
      : date,
    preferredFormat === 'undefined'
      ? 'YYYY-MM-DD'
      : preferredFormat
  );

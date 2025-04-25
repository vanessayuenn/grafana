import { Decorator } from '@storybook/react-webpack5';
import { useEffect } from 'react';

import { setTimeZoneResolver } from '@grafana/data';

export const withTimeZone = (): Decorator => (Story, context) => {
  useEffect(() => {
    setTimeZoneResolver(() => context.globals.timeZone ?? 'browser');
  }, [context.globals.timeZone]);

  return Story();
};

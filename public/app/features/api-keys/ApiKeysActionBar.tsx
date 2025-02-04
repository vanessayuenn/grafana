import React, { FC } from 'react';

import { FilterInput } from '@grafana/ui';

interface Props {
  searchQuery: string;
  disabled: boolean;
  onSearchChange: (value: string) => void;
}

export const ApiKeysActionBar: FC<Props> = ({ searchQuery, disabled, onSearchChange }) => {
  return (
    <div className="page-action-bar">
      <div className="gf-form gf-form--grow">
        <FilterInput placeholder="Search keys" value={searchQuery} onChange={onSearchChange} />
      </div>
    </div>
  );
};

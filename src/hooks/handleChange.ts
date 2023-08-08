import { ChangeEvent } from 'react';

export const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  return { name, value };
};
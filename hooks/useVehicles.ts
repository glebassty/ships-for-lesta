"use client"

import { useQuery } from '@apollo/client';
import { GET_VEHICLES } from '../lib/queries';
import { client } from '../lib/client';

export const useVehicles = () => {
  return useQuery(GET_VEHICLES, { client });
};
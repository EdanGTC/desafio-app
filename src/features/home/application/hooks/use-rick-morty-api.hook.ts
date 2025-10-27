import { useCallback } from 'react';
import { getApiRickMorty } from '../../infrastructure/api.rick-morty.client';
import { API_CONFIG } from '@/shared/constants';
import { CharacterApiResponse } from '../../domain/character.domain';

export const useRickMortyApi = () => {
  const getCharacters = useCallback(async (page: number = 1): Promise<CharacterApiResponse> => {
    const api = getApiRickMorty();
    const response = await api.get(`${API_CONFIG.CHARACTERS_ENDPOINT}?page=${page}`);
    return response.data;
  }, []);

  return {
    getCharacters,
  };
};


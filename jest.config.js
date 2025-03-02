// eslint-disable-next-line no-undef
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];
export const testMatch = ['**/?(*.)+(spec|test).ts?(x)'];
export const moduleNameMapper = {
  '^@/(.*)$': '<rootDir>/src/$1',
};

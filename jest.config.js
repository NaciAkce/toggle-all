module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src'],
  transform: { '\\.ts$': ['ts-jest'] },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/__test__/config/importJestDOM.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__test__/mock/fileMock.ts',
    '\\.(css|less|scss)$': '<rootDir>/src/__test__/mock/styleMock.ts',
  },
};

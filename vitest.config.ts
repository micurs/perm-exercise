import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      statements: 90,
      functions: 90,
      branches: 90,
    },
  },
});


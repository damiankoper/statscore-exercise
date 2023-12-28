export default {
  '*.{js,jsx,ts,tsx}': [
    (files) => `npx nx format:write --files=${files.join(',')}`,
    (files) =>
      `npx nx affected:lint --configuration=fix --files=${files.join(',')}`,
  ],
};

const isProdBuild = process.env.NODE_ENV === 'production';

module.exports = api => {
  api.cache(true);
  return {
    plugins: [!isProdBuild && 'react-refresh/babel'].filter(Boolean),
  };
};

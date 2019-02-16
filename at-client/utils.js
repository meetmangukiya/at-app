const getUrl = (endpoint) => {
  const baseUrl = 'http://localhost:3000';
  return `${baseUrl}${endpoint}`;
};

module.exports = {
  getUrl
};

export default {
  font: {
    family: "'Crimson Text', serif",
  },
  color: {
    black: '#363636',
    brand: '#0000ff',
  },
  transition: (
    prop = 'all',
    dur = '0.3',
    ease = 'cubic-bezier(.455, .03, .515, .955)',
  ) => `${prop} ${dur}s ${ease}`,
};

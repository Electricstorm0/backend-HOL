/**
 * @type {import('dependency-cruiser').IConfiguration}
 */
module.exports = {
  forbidden: [
    {
      name: 'no-dependencies-from-domains-to-infrastructures',
      from: { path: '^src/Domains' },
      to: { path: '^src/Infrastructures' },
    },
    {
      name: 'no-dependencies-from-applications-to-infrastructures',
      from: { path: '^src/Applications' },
      to: { path: '^src/Infrastructures' },
    },
    {
      name: 'no-dependencies-from-interfaces-to-infrastructures',
      from: { path: '^src/Interfaces' },
      to: { path: '^src/Infrastructures' },
    },
    {
      name: 'no-circular-dependencies',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
    {
      name: 'no-dependencies-from-commons-to-other-layers',
      from: { path: '^src/Commons' },
      to: { path: '^(src/(Applications|Domains|Interfaces|Infrastructures))' },
    },
  ],
  //   options: {
  //     includeOnly: '^src',
  //     doNotFollow: 'node_modules',
  //     outputType: 'json',
  //   },
};

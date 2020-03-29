const fetch = require('node-fetch');
const getFileContributors = require('file-contributors').default;

global.fetch = fetch; // workaround since file-contributors uses windows.fetch() internally

module.exports = {


  friendlyName: 'Get file contributors',


  description: 'Get all contributors for a particular file on github',


  extendedDescription: 'Gets all contributors on a particular file on github using the file-contributors npm package.',


  cacheable: true,


  inputs: {
    owner: {
      friendlyName: 'Owner',
      description: 'The owner of the repository',
      required: true,
      example: 'DominusKelvin'
    },
    repo: {
      friendlyName: 'Repository',
      description: 'The Github repository',
      required: true,
      example: 'machinepack-filecontributors'
    },
    path: {
      friendlyName: 'Path',
      description: 'The relative path to the file',
      required: true,
      example: 'README.md'
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'File Contributors',
      outputDescription: 'An array of the contributors on a particular file',
      variableName: 'fileContributors',
      description: 'Done.',
    },

    error: {
      description: 'An error occurred trying to get file contributors'
    }

  },


  fn: function(inputs, exits) {
    const contributors = getFileContributors(inputs.owner, inputs.repo, inputs.path)
    .then(contributors => {
      console.log(contributors) // Logs array of contributors to file.
      return exits.success(contributors)
    }).catch((error) => {
      return exits.error(error)
    })
  },



};
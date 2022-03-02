/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

const axios = require('axios');

const errorCodesUrl =
  'https://raw.githubusercontent.com/facebook/react/main/scripts/error-codes/codes.json';

exports.sourceNodes = async ({actions}) => {
  const {createNode} = actions;

  try {
    const jsonString = await axios.get(errorCodesUrl);

    createNode({
      id: 'error-codes',
      children: [],
      parent: 'ERRORS',
      internal: {
        type: 'ErrorCodesJson',
        contentDigest: JSON.stringify(jsonString.data),
      },
    });
  } catch (error) {
    console.error(
      `The gatsby-source-react-error-codes plugin has failed:\n${error.message}`,
    );

    process.exit(1);
  }
};

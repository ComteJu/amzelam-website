const path = require("path");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
const { getTrelloCards } = require(`./fetchTrello`);
const { processFile } = require(`./processFile`);
exports.sourceNodes = async (
  {
    actions: { createNode, touchNode, createParentChildLink },
    store,
    cache,
    createContentDigest,
    createNodeId
  },
  configOptions
) => {
  const data = await getTrelloCards(configOptions);
  try {
    await Promise.all(
      data.map(async card => {
        /* Create Card node */

        const cardNode = Object.assign(
          {
            parent: `__SOURCE__`,
            children: [],
            internal: {
              type: `TrelloCard`,
              content: card.content,
              mediaType: `text/markdown`
            }
          },
          card
        );
        cardNode.internal.contentDigest = createContentDigest(cardNode);
        createNode(cardNode);

        /* Create remote files */

        if (cardNode.medias) {
          await Promise.all(
            cardNode.medias.map(async m => {
              const mediaNode = await processFile({
                createNode,
                createNodeId,
                touchNode,
                store,
                cache,                
                media: {
                  pos: m.pos,
                  url: m.url,
                  id: m.id,
                  name: m.name,
                  parent: `__SOURCE__`,
                  children: [],
                  internal: {
                    type: `CardMedia`,
                    contentDigest: createContentDigest(m)
                  }
                }
              });
              createParentChildLink({
                parent: cardNode,
                child: mediaNode
              });
              createNode(mediaNode);
            })
          );
        }
        return;
      })
    );
  } catch (error) {
    console.log(`ERROR while creating nodes : ${error}`);
  }
};


exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      plugins: [new DirectoryNamedWebpackPlugin()]
    }
  });
};

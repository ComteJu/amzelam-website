const axios = require("axios");
const slugify = require("slugify");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

const options = {
  key: `${process.env.KEY}`,
  token: `${process.env.TOKEN}`,
  board_id: `${process.env.BOARD_ID}`
};
exports.getTrelloCards = async () => {
  const getData = params =>
    axios.get(
      `https://api.trello.com/1/${params}&key=${options.key}&token=${
        options.token
      }`
    );

  const results = [];
  try {
    const { data: lists } = await getData(
      `boards/${options.board_id}/lists?lists=all&fields=id,name`
    );
    await Promise.all(
      lists.map(async (list, i) => {
        const { data: cards } = await getData(
          `list/${list.id}/cards?fields=id,name`
        );

        await Promise.all(
          cards.map(async (card, e) => {
            const { data } = await getData(
              `cards/${
                card.id
              }?fields=id,name,desc&attachments=true&attachment_fields=id,url,name,pos`
            );
            const medias = [];
            if (data.attachments.length) {
              data.attachments.forEach(a => {
                medias.push({
                  id: a.id,
                  name: a.name,
                  url: a.url,
                  pos: a.pos
                });
              });
            }
            results.push({
              list_index: i,
              list_id: list.id,
              list_slug: slugify(list.name, {replacement: '_',  lower: true} ),
              list_name: list.name,
              index: e,
              id: data.id,
              slug: slugify(data.name, {replacement: '_',  lower: true}),
              name: data.name,
              content: data.desc,
              medias: medias || null
            });
          })
        );
      })
    );

    return results;
  } catch (error) {
    console.log(`ERROR while fetching cards : ${error}`);
  }
};

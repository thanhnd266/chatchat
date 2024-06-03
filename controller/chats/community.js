const { default: axios } = require("axios");
const { dataLineChart } = require("../../constants/data_chart");
const { getTextMessageChatbot } = require("../../helpers/getTextMessage");

//Create new conversation
const createCommunity = async (ctx) => {
  try {
    const {owner_name, user_secret, title, is_direct_chat, members} = ctx.request.body;

    const payload = {
        usernames: members,
        title: title,
        is_direct_chat: is_direct_chat
    }

    const res = await axios.put("https://api.chatengine.io/chats/", payload, {
        headers: {
            'Project-ID': '5f5b4220-901f-4bde-826b-b245dcb0f9bf',
            'User-Name': owner_name,
            'User-Secret': user_secret
        }
    });

    if(res.statusText === "Created") {
        ctx.response.status = 200;
        ctx.response.body = {
          status_code: 200,
          message: "Tạo nhóm cộng đồng thành công!",
        };
    } else {
        ctx.response.status = 400
        ctx.response.body = {
          status_code: 400,
          message: "Tạo nhóm cộng đồng thất bại!",
        };
    }
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = err;
  }
};

const createBotChat = async (ctx) => {
    try {
      const {owner_name, user_secret, title, is_direct_chat, members} = ctx.request.body;
  
      const payload = {
          usernames: members,
          title: title,
          is_direct_chat: is_direct_chat
      }

      const res = await axios.put("https://api.chatengine.io/chats/", payload, {
          headers: {
              'Project-ID': '5f5b4220-901f-4bde-826b-b245dcb0f9bf',
              'User-Name': owner_name,
              'User-Secret': user_secret
          }
      });

      if(res.statusText === "Created") {
        const data = {
            "text": JSON.stringify({
                greeting: "Tôi là chatbot, tôi có thể giúp gì được bạn!",
                guide: "<ul><span>Hướng dẫn, Nhập: </span><li>&lt;piechart&gt;: để xem PieChart</li><li>&lt;linechart&gt;: để xem LineChart</li><li>&lt;treechart&gt;: để xem TreeChart</li><li>&lt;barchart&gt;: để xem BarChart</li></ul>",
                dataChart: dataLineChart
            })
        };

        const idNewChat = res?.data?.id;

        //send chart to client
        await axios.post(`https://api.chatengine.io/chats/${idNewChat}/messages/`, data, {
            headers: {
                'Project-ID': '5f5b4220-901f-4bde-826b-b245dcb0f9bf',
                'User-Name': 'Chatbot',
                'User-Secret': '123456'
            }
        });

        ctx.response.status = 200;
        ctx.response.body = {
          status_code: 200,
          message: "Tạo nhóm tư vấn thành công!",
        };
        
      } else {
          ctx.response.status = 400
          ctx.response.body = {
            status_code: 400,
            message: "Tạo nhóm tư vấn thất bại!",
          };
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.body = err;
    }
  };

  const createMessage = async (ctx) => {
    try {
      const {owner_name, user_secret, chatId, text, attachment_urls} = ctx.request.body;
      const {textMessage, isChart} = getTextMessageChatbot(text);

      const payload = {
          text: text,
          attachment_urls
        };
        
        const res = await axios.post(`https://api.chatengine.io/chats/${chatId}/messages/`, payload, {
            headers: {
                'Project-ID': '5f5b4220-901f-4bde-826b-b245dcb0f9bf',
                'User-Name': owner_name,
                'User-Secret': user_secret
            }
        });

        if(res.statusText === "Created") {
            if(isChart) {
                const resChatBotMess = await axios.post(`https://api.chatengine.io/chats/${chatId}/messages/`, {
                    text: textMessage,
                }, {
                    headers: {
                        'Project-ID': '5f5b4220-901f-4bde-826b-b245dcb0f9bf',
                        'User-Name': 'Chatbot',
                        'User-Secret': user_secret
                    }
                });

                if(!resChatBotMess.statusText === "Created") {
                    ctx.response.status = 400;
                    ctx.response.body = {
                    status_code: 400,
                        message: "Lấy dữ liệu chart thất bại!",
                    };
                }
            }

            ctx.response.status = 200;
            ctx.response.body = {
            status_code: 200,
                message: "Gửi tin nhắn thành công!",
            };
        
      } else {
          ctx.response.status = 400
          ctx.response.body = {
            status_code: 400,
            message: "Gửi tin nhắn thành công!",
          };
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.body = err;
    }
  };

module.exports = {
    createCommunity,
    createBotChat,
    createMessage
};

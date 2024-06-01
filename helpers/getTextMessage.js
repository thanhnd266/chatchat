const { dataPieChart, dataBarChart, dataTreeChart, dataLineChart } = require("../constants/data_chart")

const getTextMessageChatbot = (text) => {
    switch(text) {
        case "&lt;piechart&gt;":
            return {
                isChart: true,
                textMessage: JSON.stringify({
                    dataChart: dataLineChart
                }),
            };
        case "&lt;barchart&gt;":
            return {
                isChart: true,
                textMessage: JSON.stringify({
                    dataChart: dataBarChart,
                })
            };
        case "&lt;treechart&gt;":
            return {
                isChart: true,
                textMessage: JSON.stringify({
                    dataChart: dataTreeChart,
                })
            };
        case "&lt;linechart&gt;":
            return {
                isChart: true,
                textMessage: JSON.stringify({
                    dataChart: dataLineChart,
                })
            };
        default: 
            return {
                textMessage: text,
            };
    }
}

module.exports = {
    getTextMessageChatbot,
}
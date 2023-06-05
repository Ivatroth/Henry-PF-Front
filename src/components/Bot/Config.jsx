import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotAvatar/BotAvatar";
import DogPicture from "././Widgets/DogPicture";
import Options from "././Options/Options";

const config = {
    initialMessages: [createChatBotMessage(`Tuki Tuki, Bienvenido!!`)],
    botName: "TukiMarket",
    widget: "options",
    widgets: [
        {
        widgetName: 'dogPicture',
        widgetFunc: (props) => <DogPicture {...props} />,
        },
        {
        widgetName: "options",
        widgetFunc: (props) => <Options {...props} />,
        },
    ],

    customComponents: {
        botAvatar: (props) => <BotAvatar {...props} />,
    },
    customStyles: {
        botMessageBox: {
            backgroundColor: "#ff9f1c",
        },
        chatButton: {
            backgroundColor: "#ff9f1c",
        },

    },
    //? Para agregar cosas al estado
    state: {
        movieTitles: ["Gladiador", "Terminator"]
    }

};

export default config;

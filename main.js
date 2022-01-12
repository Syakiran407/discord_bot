const {Client, Intents} = require('discord.js');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.once('ready', () => {
    console.log('Paimon is online!');

    client.user.setActivity('YOUR ಠ_ಠ   !Companion', { type: 'LOYAL' });
});

gif = "https://tenor.com/view/genshin-impact-paimon-gif-18640817"
snorlaxGif = "https://tenor.com/view/game-of-thrones-winter-is-coming-the-hound-dont-point-your-finger-gif-11638484"

bannedWords = ["nitro", "Nitro"]
bannedWords2 = ["free", "Free", "code", "Code"]

client.on('message', msg => {

    //check for permission to post
    permision = msg.channel.permissionsFor(client.user);
    permision = permision.toArray();

    // //dont respond to own messages
    if(msg.author.username === client.user.username) {return;}

    //replies with the most recent deleted message
    if(msg.content.includes("!paimonerror"))
    {
        let channel = client.channels.cache.get("930882978639396914");

        channel.messages.fetch({ limit: 1 }).then(messages => 
        {
            let lastMessage = messages.first();
            msg.channel.send(lastMessage.content)
        })
    }

    //shares link to FAQ list of animations
    // if(msg.content.includes("!animations"))
    // {
    //     if(permision.includes("SEND_MESSAGES"))
    //     {
    //         msg.channel.send("For a list of animations used, please see the FAQ created by Snorlax:\nhttps://extoryer.wixsite.com/sebfaq/post/sebastian-s-animations-dark-souls");
    //     }
    // }
    
    //sends a gif of the hound
    if (msg.mentions.has(client.user)&&!msg.mentions.everyone)
    {
        if(permision.includes("SEND_MESSAGES"))
        {
            msg.channel.send(gif);
        }
    }
    
    //avoids me
    // if(msg.author.id === "930861340606754827") {return;}

    // //avoid snorlax
    // if(msg.author.id === "930861340606754827") 
    // {
    //     //sends a gif of the hound
    //     if (msg.mentions.has(client.user)&&!msg.mentions.everyone)
    //     {
    //         if(permision.includes("SEND_MESSAGES"))
    //         {
    //             msg.channel.send(snorlaxGif);
    //             msg.channel.send("I dont like you Snorlax");
    //         }
    //     }
    //     return;
    // }

    if (bannedWords.some(word => msg.content.includes(word))&&bannedWords2.some(word => msg.content.includes(word))) 
    {
        //gives reason for deletion
        if(permision.includes("SEND_MESSAGES"))
        {
            msg.channel.send("Deleted " + msg.author.username + "'s message because it contained terms often used by scammers. If this was in error type !paimonerror");
        }
        
        //logs the message in my private channel
        newString = msg.content.replace('@', '*');
        client.channels.cache.get("930882978639396914").send(msg.author.username + " wrote in "+ msg.channel.name +": \n" + newString);
    
        msg.delete(1000);
    }

});


client.login('OTMwODYxMzQwNjA2NzU0ODI3.Yd8CLg.lnqET21w-zz9QMuDipq4sCVQHKk');
const {Client, Intents} = require('discord.js');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});


// const config = require('./config.json')

client.once('ready', () => {
    console.log('Paimon is online!');

    //client.user.setActivity('your ಠ_ಠ   !companion', { type: 'LOYAL' });
    client.user.setActivity('you ಠ_ಠ   !animations', { type: 'WATCHING' });
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
        let channel = client.channels.cache.get("930875215309864991");

        channel.messages.fetch({ limit: 1 }).then(messages => 
        {
            let lastMessage = messages.first();
            msg.channel.send(lastMessage.content)
        })
    }

    // if(msg.content.includes("!paimonhelp"))
    // {
    //     if(permision.includes("SEND_MESSAGES"))
    //     {
    //         msg.channel.send("Brunei Game Devs LinkTree:\nhttps://linktr.ee/brugamedev");
    //     }
    // }

    if(msg.content.includes("!linktree"))
    {
        if(permision.includes("SEND_MESSAGES"))
        {
            msg.channel.send("Brunei Game Devs LinkTree:\nhttps://linktr.ee/brugamedev");
        }
    }

    //shares link to FAQ list of itch io games
    if(msg.content.includes("!itchiobgd"))
    {
        if(permision.includes("SEND_MESSAGES"))
        {
            msg.channel.send("list of games made by Bruneians\nhttps://brugamedev.itch.io/");
        }
    }
    
    //sends a gif of paimon
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
        client.channels.cache.get("930875215309864991").send(msg.author.username + " wrote in "+ msg.channel.name +": \n" + newString);
    
        msg.delete(1000);
    }

});

client.login(process.env.DJS_TOKEN);

const {Client, Intents} = require('discord.js')

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})

const ytdl = require("ytdl-core");

const prefix = "!";

const queue = new Map();



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


// ==================================
// Play Music
// ==================================

client.once("ready", () => {
    console.log("Ready!");
  });
  
  client.once("reconnecting", () => {
    console.log("Reconnecting!");
  });
  
  client.once("disconnect", () => {
    console.log("Disconnect!");
  });
  
  client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
  
    const serverQueue = queue.get(message.guild.id);
  
    if (message.content.startsWith(`${prefix}play`)) {
      execute(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}skip`)) {
      skip(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}stop`)) {
      stop(message, serverQueue);
      return;
    } else {
      message.channel.send("You need to enter a valid command!");
    }
  });
  
  async function execute(message, serverQueue) {
    const args = message.content.split(" ");
  
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }
  
    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
     };
  
    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
  
      queue.set(message.guild.id, queueContruct);
  
      queueContruct.songs.push(song);
  
      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  }
  
  function skip(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue)
      return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
  }
  
  function stop(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
      
    if (!serverQueue)
      return message.channel.send("There is no song that I could stop!");
      
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
  
  function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
  
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  }


client.login(process.env.DJS_TOKEN)

#!/usr/bin/env python3
import os
import config
import time
import asyncio
import sqlite3
from xml.etree import ElementTree
from discord.ext import commands, tasks

bot = commands.Bot(command_prefix='!')

#===========MUSIC BOT SECTION====================================================
@bot.command()
async def play(ctx):
    if ctx.message.content.strip() == '!play':
        await summon()
        return
    query = ctx.message.content[5:]
    request = jukebox.Request(query,ctx)
    if request != None and request.error == 0:
        await ctx.channel.send('Added ' + request.title)
        await ctx.channel.send(request.link)
    else:
        await ctx.channel.send('An unkown error occured while adding a song.')
@bot.command()
async def summon(ctx):
    channel = ctx.author.voice.channel
    if channel == None:
        await ctx.author.channel.send('You must be in a voice channel to summon me.')
    else:
        await bot.user.move_to(ctx.author.channel)
@bot.command()
async def playnow(ctx):
    query = ctx.message.content[5:]
    request = jukebox.Request(query,ctx,add_to_start=True)
    if request != None and request.error == 0:
        await ctx.channel.send('Added ' + request.title)
        await ctx.channel.send(request.link)
    else:
        await ctx.channel.send('An unkown error occured while adding a song.')

@bot.command()
async def skipto(ctx,position):
    await ctx.channel.send('Skipped to track ' + position)
    
#END MUSIC BOT SECTION


#==================BOT EVENTS===================================================
@bot.event
async def on_ready():
    print('Bot Online')

@bot.event
async def on_voice_state_update(member, before, after):
    guild = bot.get_guild(config.guild)
    role = guild.get_role(config.text_voice_role)
    if after.channel != None:
        await member.add_roles(role)
    else:
        await member.remove_roles(role)
#END BOT EVENTS
#===================COMMANDS=====================================================
#adds to suggestion list
@bot.command()
async def suggest(ctx):
    game = ctx.message.content[8:]
    game.strip()
    await ctx.message.add_reaction('👌')
    channel = bot.get_channel(config.game_suggestions)
    listmsg = await channel.send(game + "\n`Suggested by " + ctx.message.author.name + '`')
    await listmsg.add_reaction('👍')
    await listmsg.add_reaction('👎')
#toggles nsfw channels
@bot.command()
async def nsfw(ctx):
    guild = bot.get_guild(config.burrow)
    role = guild.get_role(config.nsfw_role)
    if role in ctx.author.roles:
        await ctx.author.remove_roles(role)
    else:
        await ctx.author.add_roles(role)
    await ctx.message.add_reaction('👌')
#Query rule34 for images.
@bot.command()
async def rule34(ctx,taga,tagb = "",tagc = "",tagd = ""):
    #If were not in the NSFW channel, return
    if(ctx.channel != bot.get_channel(config.nsfw_channel)):
        ctx.channel.send('You are not in a NSFW channel!')
        return
    #Submit a request to the url defined in config, then show in NSFW channel
    tags = "{} {} {} {}".format(taga,tagb,tagc,tagd)
    request_url = config.ruletf_api_url + tags
    response = requests.get(request_url)
    tree = ElementTree.fromstring(response.content)
    image_urls = []
    for post in tree.iter('post'):
        image_urls.append(post.attrib.get('file_url'))
    if len(image_urls) == 0:
        await ctx.channel.send("Couldn't find anything. 😳")
    for url in image_urls:
        await ctx.channel.send(url)
#==============================DEBUG==========================================
@bot.command()
async def whoami(ctx):
    await ctx.channel.send('Your account id is: ' + str(ctx.author.id))
if __name__ == __name__:
    bot.run(config.discord)

# Twitch TV Subtitles with NEW Chatbot

Welcome! The purpose of this modified version of the subtitle repository is to add a twitch chatbot that will send your subtitles to your twitch chat automatically.

**The only modification to the original program is the chatbot.**

The inspiration for this feature was for those who cannot watch the screen at all times, or are chat only and may miss what the streamer is saying. Users will be not only be able to read what you say, but also be able to scroll up in the chat history to stay informed!

Below are modified instructions to set up the subtitles program with the chatbot. It requires setting up the program to run locally due to the modifications. I hope you enjoy and reach out to me for any help with the chatbot!

### Chatbot Features:
- Uses an easy to setup OBS browser source similar to the subtitles
- Connects automatically when the OBS source is visible
- Configurable to only connect when stream is live and disconnects when stream goes offline
- Can but shut off by chat command by any mod, but only turned on by the streamer
- Can be set up to use your own account or an alternate account to send the subtitles

<br/>
<br/>

![Add Subtitles to Twitch TV using OBS](https://www.pubnub.com/wp-content/uploads/2018/07/add-subtitles-to-twitch-tv-obs.png)

![tcc](https://user-images.githubusercontent.com/45214/81859404-0abbf580-951a-11ea-9334-9fbee17416fd.gif)

# Twitch TV Subtitles

##  Installation Guide: OBS Subtitles for Twitch TV
<br>

> **Start here:** https://www.pubnub.com/developers/twitch-tv-obs-subtitles/

<br>

## Running Twitch.TV Subtitles from Local Files on your Hard Drive
<br>

If you've downloaded this repository, made changes and want 
them to be available in your OBS, you need to follow these instructions.
Due to security, you need to run an HTTP Server for OBS to access your local files.
You'll do this by opening a terminal window and running a Simple HTTP server.
Attempting to run Twitch Subtitles without an HTTP server will result in a 
non-working page with *"Start talking."* permanently stuck on the viewport.

#### 1.) Download and Install Python 3+: https://www.python.org/downloads/ (Also download this repository)

#### 2.) After you've installed Python, open your terminal and start the 
Python Simple HTTP Server in the same director as the Twitch.TV Subtitles:

> Windows: Press `WinKey+R` type `cmd` and press "Enter" to open a Command Prompt

> Mac: Press `Command+Space` type `terminal` and press "Enter".

Navigate to the Twitch TV Subtitles directory using `cd` command.

```shell
cd twitch-tv-obs-subtitles
python -m http.server 8080 --bind 127.0.0.1
```

> If the `cd` command fails, you need to know where the folder is located.
> You must `cd` to the folder `twitch-tv-obs-subtitles`.
> It may be in your `Downloads` folder: `cd Downloads/twitch-tv-obs-subtitles`.

#### 3.) Copy the URL from Step 2 on the [Subtitles Twitch.TV Page](https://www.pubnub.com/developers/twitch-tv-obs-subtitles/)

The URL will look similar to this:

```shell
https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?subkey=sub-c-79b0a26a-80a9-11e8-8f4a-96bbd71e7d14&pubkey=pub-c-fd9b97a4-7b78-4ae1-a21e-3614f2b6debe&channel=1552687539739502028833&style=background%3Ablack%3Bfont-weight%3A600%3Btext-transform%3Auppercase%3Btext-shadow%3Anone%3Bpadding%3A10px%3B
```

> **Keep [Subtitles Twitch.TV Page](https://www.pubnub.com/developers/twitch-tv-obs-subtitles/) open.**
> This page will capture your voice and transmit it to your local computer.

#### 4.) Modify the copied URL from Step 3 by replacing

**`https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html`** with

**`http://127.0.0.1:8080/subtitles.html`**.

Your final URL will look like:
```shell
http://127.0.0.1:8080/subtitles.html?subkey=sub-c-79b0a26a-80a9-11e8-8f4a-96bbd71e7d14&pubkey=pub-c-fd9b97a4-7b78-4ae1-a21e-3614f2b6debe&channel=1552687539739502028833&style=background%3Ablack%3Bfont-weight%3A600%3Btext-transform%3Auppercase%3Btext-shadow%3Anone%3Bpadding%3A10px%3B
```

#### 5.) Past the Final URL into the OBS browser source. *Note that your final URL will differ from the one shown above.*


<br>

# Configuring the STT Chatbot to send your subtitles to twitch chat

In order to use the chatbot, you will need to use the above configuration of running 
Twitch.TV Subtitles from Local Files on your Hard Drive (Secure method)


### 1.) Edit bot.js with the bots (or your accounts username and oauth key from the provided link)

### 2.) Edit settings in bot.js as desired.

### 3.) Add the username of the chat you want to connect to in username.js

### 4.) Add a new browser source in OBS (in addition to the one above) and set the source to http://127.0.0.1:8080/subtitles-bot.html

<br>

The chatbot is now setup! When the source is made visible, it will connect to the twitch chat and await STT input. It automatically disconnects from twitch chat when the source is not visible.
By default, it will not connect if you are not currently streaming (for a bit a protection from accidental STT). This can be changed in bot.js settings.


<br>
<br>

# Additional Customizations

## Parameters and Settings

It's easy to change various aspects of the voice capture system including
language and text styles.

## Set Language

The default language is detected by your country of origin.
However you may wish to set the language to English.

The following will change the language to USA English:

https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?language=es-US

You can change the language to any language code.
The following are just a few examples:

 - English: `language=en-US`
 - Spanish: `language=es`
 - Mandarin: `language=zh`
 - German: `language=de`
 - Japanese: `language=ja`

More language codes shown here:
https://www.w3schools.com/tags/ref_language_codes.asp

## V1 Old Voice Setting - Downgrade Option (This is untested with the chatbot currently)

> We've recently upgraded the voice detection algorithm!

The new algorithm offers a continuous stream of voice detection.
The old V1 voice detection algorithm stopped recording
for 0.2 - 1.5 seconds while a new voice recognition session initialized.
The affect was a delay in recognizing your voice,
also it would cause the text on the screen to clear.

The new V2 upgrade is a continuous voice session, without any pauses or delays.
So overall it's an improved voice capture voice-to-text upgrade.
However some may have relied on this.

To downgrade the algorithm, use the `continuous=off` parameter.

> https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?continuous=off

The above link will downgrade your voice-to-text to the old algorithm.

## Change Font Style

You can set the font display style using any valid CSS modifiers.
Some defaults are available for you.

 - Set Style: `?style=CSS_HERE`
 - Set Background White: `?style=background:%23white`
 - Set Font Red: `?style=color:%23red`
 - Set Text Padding: `?style=padding:10px`

Here are some pre-built options to try:

 - Clean: https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?subkey=sub-c-79b0a26a-80a9-11e8-8f4a-96bbd71e7d14&pubkey=pub-c-fd9b97a4-7b78-4ae1-a21e-3614f2b6debe&channel=1588208805983537980353&style=color%3Argba(0%2C0%2C0%2C.9)%3Btext-shadow%3A0%200%205px%20%23fff
 - CC Caption: https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?style=background%3A%23000%3Bfont-weight%3A600%3Btext-transform%3Auppercase%3Btext-shadow%3Anone%3Bpadding%3A10px


![closed-caption](https://user-images.githubusercontent.com/45214/81862816-1fe75300-951f-11ea-9cde-ebd7ad881654.gif)
 
 
 - Blue: https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?subkey=sub-c-79b0a26a-80a9-11e8-8f4a-96bbd71e7d14&pubkey=pub-c-fd9b97a4-7b78-4ae1-a21e-3614f2b6debe&channel=1588208805983537980353&style=color%3A%2300f%3Bfont-weight%3A400%3Btext-shadow%3A0%200%205px%20%23fff
 - Rainbow: https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?subkey=sub-c-79b0a26a-80a9-11e8-8f4a-96bbd71e7d14&pubkey=pub-c-fd9b97a4-7b78-4ae1-a21e-3614f2b6debe&channel=1588208805983537980353&style=background%3Alinear-gradient(to%20right%2Corange%2C%23ff0%2Cgreen%2C%230ff%2C%2300f%2Cviolet)%20100%25%3Bfont-weight%3A800%3B-webkit-background-clip%3Atext%3B-webkit-text-fill-color%3Atransparent%3Btext-shadow%3Anone
 
![rainbow](https://user-images.githubusercontent.com/45214/81860401-8b2f2600-951b-11ea-9a0d-a7513dd63f20.gif)

Sky is the limit!
Enjoy.

## Clear Text on Screen after you stop talking

We've added a new feature to allow the text to clear from the screen after a
moment of silence.
The default is set to `4 seconds`.
You can change this by setting the following:

> Don't go lower than 2 seconds. It will cause unexpected problems for you.

 - Clear Text after 2 Seconds: https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?cleartime=2
 - Clear Text after 5 Seconds: https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?cleartime=5
 - Clear Text after 10 Seconds: https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?cleartime=10
 - Clear Text after 100 Seconds: https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?cleartime=100

And so on, you can change the value to any valid number.
Just don't go lower than 2 seconds.
Using the default of 4 seconds is recommended.

## Change Intro Text

By default the intro text is set to "Start talking."
You can change this value to anything you'd like:

 - Intro Text BLANK: https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?introtext=%20
 - Intro Text "Hello!": https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?introtext=Hello!
 - Intro Text "Whatup": https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?introtext=Whatup

## Display Last Two Lines

Sometimes you don't want a wall of text.
You want to set the display to show only the last two lines.

There's a way to crop using CSS like this `bottom:92vh`.

> https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?style=background%3A%23000%3Bfont-weight%3A600%3Btext-transform%3Auppercase%3Btext-shadow%3Anone%3Bpadding%3A10px;bottom:92vh

![Closed Captions Last Two Lines](https://user-images.githubusercontent.com/45214/81858459-a3517600-9518-11ea-8963-1eb4faaea858.gif)

Change the CSS to match your desired display.  
For example you may wish to fine-tune the crop effect using the calc operator:

`bottom:calc(100vh%20+%201.3em)`

https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?style=background%3A%23000%3Bfont-weight%3A600%3Btext-transform%3Auppercase%3Btext-shadow%3Anone%3Bpadding%3A10px;bottom%3Acalc(100vh%20%2B%201.3em)

Essentially you can add the CSS in the URL, or you can 
customize the look and feel by [forking the repo and editing the HTML directly](https://github.com/stephenlb/twitch-tv-obs-subtitles/fork).

## Nyan Cat Subtitles

Nyan Cat helps you with closed captioning. 
Nyan Cat subtitles, just in case.

![nyan-preview](https://user-images.githubusercontent.com/45214/81875360-f76a5380-9534-11ea-9600-3eb4eec0a8f6.gif)

> Try it here: https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles-nyan.html?channel=MYCHANNEL

Since **Twitch Subtitles** and Streaming Closed Captions are open source and free tool, 
it's open to fully customize the display any way you like.

## Set Max Words

Setting the maximum display words is easy using this URL parameter:

https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?maxwords=10

This will display a maximum of 10 words, just as an example.
Exclude the parameter to remove the limit.

## Disable the Microphone

If you want this page to only be used to display your voice transcript
you can disable the microphone.
This allows you to share a URL that is read-only.

https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?mic=off&subkey=sub-c-XXXX&channel=XXXX

Note that you need to specify the Subscribe Key and Channel,
while excluding the Publish Key.
This will prevent others from speaking over your output. 

## Subscribe and Publish Keys

These keys are used for private account purposes.
Only expose the Publish Key to your self, and do not share the key.

You can get a new key at https://dashboard.pubnub.com/

https://stephenlb.github.io/twitch-tv-obs-subtitles/subtitles.html?mic=off&subkey=sub-c-XXXX&pubkey=pub-c-XXX&channel=XXXX

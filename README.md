<div align="center">

# 🤖 SYRCityline Data Explorer

![Syracuse Data Challenge (Social Post) (7)](https://github.com/josephistired/SYRCityline-Data-Explorer/assets/65987360/659127a0-cc59-4874-b9de-aa3aca14c4dd)

</p>

[Invite SYRCityline Data Explorer to your discord server!](https://www.josephcarmosino.com/invite-SYRCityline-Data-Explorer)

</div>

# 🧠 Introduction

Update: The bot has won the May edition of the [Syracuse Data Challenge](https://data.syr.gov/pages/data-challenge)! [Link](https://data.syr.gov/pages/d5838bcbb4434ee39c82dbd13e06aa25)

A bot developed for the May edition of the [Syracuse Data Challenge](https://data.syr.gov/pages/data-challenge). With a mission to harness the power of data, the bot provides an indispensable tool for accessing and presenting valuable information concerning service requests made through the SYRCityline system on Discord.

SYRCityline Data Explorer revolves around SYRCityline, an innovative platform that empowers Syracuse, New York, residents to effortlessly submit non-emergency service requests and report various issues within the city. The bot seamlessly retrieves and presents data from this platform by tapping into Open Data Syracuse, enabling users to gain crucial insights into the city's service landscape.

SYRCityline Data Explorer empowers residents to access and explore comprehensive information about their service requests through simple Discord commands. Please stay informed about your requests' progress, status, and resolution, ensuring the city administration has transparency and accountability. This powerful tool fosters effective communication, encouraging an engaged and proactive community that actively participates in shaping a better Syracuse.

Join us in revolutionizing how residents interact with the city they call home. Embrace the capabilities of SYRCityline Data Explorer and unlock a world of information, making your voice heard and contributing to a vibrant and thriving Syracuse, New York. Together, let's build a stronger community through data-driven insights.

# 💬 Commands

**_/random request_**: Fetches a random request from the SYRCityline Requests dataset. This command provides a glimpse into the diverse range of service requests made through SYRCityline, allowing users to explore different reported issues within the city.

![image](https://github.com/Syracuse-Open-Source-Collective/SYRCityline-Data-Explorer/assets/65987360/461e0831-4e48-46b9-90cd-dc8c9eb7f974)

**_/search address_**: Retrieves all requests associated with a specific address. Users can obtain a comprehensive list of service requests submitted for that location by providing an address as input. This command helps residents understand the issues reported in their neighborhood or community.

![image](https://github.com/Syracuse-Open-Source-Collective/SYRCityline-Data-Explorer/assets/65987360/94d8f826-9eab-4287-b1d7-de3251c5008a)

**_/search lat-long_**: Retrieves all requests associated with a specific latitude and longitude. Users can obtain a comprehensive list of service requests submitted for that latitude and longitude by providing a latitude and longitude as input. This command helps residents understand the issues reported in their neighborhood or community.

![image](https://github.com/Syracuse-Open-Source-Collective/SYRCityline-Data-Explorer/assets/65987360/0eca609a-bd18-48b7-ad3d-6f40f1256742)

**_/search id_**: Retrieves detailed data about a specific request using its unique ID. By entering the ID of a request, users can access specific information such as the status, description, and progress updates related to that particular request.

![image](https://github.com/Syracuse-Open-Source-Collective/SYRCityline-Data-Explorer/assets/65987360/ff82c361-fdc7-4e69-a7c9-295789a8c148)

**_/stats month_**: Displays statistical insights about the data from SYRCityline for the current month. This command provides aggregated information, such as the total number of requests, the most common issues reported, or any notable trends observed within the current month's dataset.

![image](https://github.com/Syracuse-Open-Source-Collective/SYRCityline-Data-Explorer/assets/65987360/3e5c5d1d-7951-4fc6-ac61-2240ea9aba9c)

**_/stats year_**: Presents comprehensive statistics about the data from SYRCityline for the current year. Users can explore valuable information such as the total number of requests received throughout the year, the distribution of requests across different categories, or any emerging patterns.

![image](https://github.com/Syracuse-Open-Source-Collective/SYRCityline-Data-Explorer/assets/65987360/f6bd0637-5ee0-4ecb-978a-36d90156485a)

**_/stats query_**: Retrieves specific statistics for a given month and year combination from the SYRCityline Requests dataset. Users can obtain detailed insights into the data for that particular time frame by inputting a specific month and year. This command allows users to explore trends, identify patterns, and understand the overall service request landscape in a particular month and year.

![image](https://github.com/Syracuse-Open-Source-Collective/SYRCityline-Data-Explorer/assets/65987360/bc71d2c0-249c-4430-91c6-8397bf7c8fc8)

**_/stats overall_**: Provides an overview of the entire SYRCityline Requests dataset, offering comprehensive insights into the total number of requests, the most common issues reported, and other valuable information. This command allows users to gain a holistic understanding of the service request landscape within Syracuse, New York.

![image](https://github.com/Syracuse-Open-Source-Collective/SYRCityline-Data-Explorer/assets/65987360/a007f25d-1d0a-41e5-bff0-b61ae2d0fb62)

**_/chart summary_**: Generates a summary chart of the SYRCityline Requests dataset for a given year, and category. This command provides a visual representation of the data, allowing users to gain a quick understanding of the distribution of a category across different categories throughout the year.

![image](https://github.com/Syracuse-Open-Source-Collective/SYRCityline-Data-Explorer/assets/65987360/3def6a63-8dff-4d0b-9e61-54302cec326d)

**_/update-csv_**: Updates the bot's external database of requests. This command ensures that the bot's data is up-to-date with the latest information from the API. Developers can run this command to refresh the bot's database and access the most recent service request data.

# ⚙️ Technology

SYRCityline Data Explorer is powered by advanced technologies to deliver a seamless user experience. It utilizes [Discord.js](https://github.com/discordjs/discord.js), a powerful JavaScript library, to establish communication with the Discord API. This integration enables the bot to efficiently interact with users on the Discord platform, providing a reliable and intuitive interface for accessing SYRCityline request data.

To retrieve data from the SYRCityline API, the bot relies on [superagent](https://github.com/ladjs/superagent), a popular HTTP client library in JavaScript. Superagent facilitates seamless requests to the [SYRCityline API](https://data.syr.gov/datasets/0d58a53ccb22457990161d756ed8a870_0/api), which uses [Arcgis](https://developers.arcgis.com/rest/), allowing the bot to fetch the latest information about service requests made within Syracuse.

# ❓ Host yourself?

You have the option to host the bot yourself. You can follow the instructions below to run the bot yourself.

Prerequisites: You will need [Node.js](https://nodejs.org/en/download) version 18.60 or above, [Discord bot token](https://discord.com/developers/applications), and [Discord User ID](https://www.businessinsider.com/guides/tech/discord-id#:~:text=To%20find%20a%20user's%20Discord,sidebar%20and%20select%20Copy%20ID.)!

Run the following commands in your terminal!

```
git clone https://github.com/Syracuse-Open-Source-Collective/SYRCityline-Data-Explorer.git
cd SYRCityline-Data-Explorer
npm install
```

1. Start by clicking the "New Application" button in the Discord Developer Portal.
   Give your application a meaningful name and click "Create" to proceed.
   Next, navigate to the "Bot" tab and click "Add Bot" to create a new bot user for your application.
   If you want others to be able to invite your bot, make sure to tick the "Public Bot" option.
   Copy the token using the "Copy" button.
   Finally, copy your bot token using the "Copy" button to use it in your bot's code.

2. Now invite the bot to your server by heading to the OAuth2 tab and pressing URL Generator. Make sure to click the bot and applications. Commands, and make sure to give the bot Administrator permissions. Copy & paste that link into your browser, and choose the server you want the bot in.

3. If you see the files you have, a file .env.example is there. Remove the .example part of the file name. Open the file, and put the token you copied earlier and your discord user ID!

```
token=put token here
id=put id here
```

4. Now you are ready to start the bot! Run the **_node ._** command in the console, or run the bat file!

5. Please run the /update-csv command when first starting your bot. This will allow the bot to create its external database. Feel free to run this command whenever. **Note: the bot has a cron job that runs daily that will update the database for you.**

# ⚠️ Disclaimer

SYRCityline Data Explorer is an open-source bot developed to foster transparency and collaboration. The bot's source code allows the community to explore, modify, and enhance according to their needs. You are encouraged to [invite](https://www.josephcarmosino.com/invite-SYRCityline-Data-Explorer) the bot to your Discord server and leverage its capabilities to access SYRCityline request data.

If you wish to customize the bot, you can fork the repository and make it your own. Feel free to modify the code to suit your requirements or add new features. However, please ensure you comply with the terms and conditions of [Open Data Syracuse](https://data.syr.gov/pages/termsofuse). 

By offering SYRCityline Data Explorer as an open-source project, the aim is to encourage collaboration, innovation, and community engagement. Join the project, contribute to its development, and unleash the potential of data-driven insights for Syracuse, New York residents.

Enjoy!

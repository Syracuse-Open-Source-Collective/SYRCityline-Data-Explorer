<div align="center">

# 🤖 SYRCityline Data Explorer 
![Syracuse Data Challenge (Social Post) (7)](https://github.com/josephistired/Syracuse-Data-Challenge-May-Discord-Bot/assets/65987360/36025a66-991c-461e-9a19-621674977204)

</p>

</div>

# 🧠 Introduction

A bot developed for the May edition of the [Syracuse Data Challenge](https://data.syr.gov/pages/data-challenge). With a mission to harness the power of data, the bot provides an indispensable tool for accessing and presenting valuable information concerning service requests made through the SYRCityline system on Discord.

SYRCityline Data Explorer revolves around SYRCityline, an innovative platform that empowers residents of Syracuse, New York, to effortlessly submit non-emergency service requests and report various issues within the city. By tapping into Open Data Syracuse, the bot seamlessly retrieves and presents data from this platform, enabling users to gain crucial insights into the city's service landscape.

Through simple discord commands, SYRCityline Data Explorer empowers residents to access and explore comprehensive information about their service requests. Stay informed about the progress, status, and resolution of your requests, ensuring transparency and accountability from the city administration. This powerful tool fosters effective communication, encouraging an engaged and proactive community that actively participates in shaping a better Syracuse.

Join us in revolutionizing the way residents interact with the city they call home. Embrace the capabilities of SYRCityline Data Explorer and unlock a world of information, making your voice heard and contributing to a vibrant and thriving Syracuse, New York. Together, let's build a stronger community through data-driven insights.

# 💬 Commands

***/random request***: Fetches a random request from the SYRCityline Requests dataset. This command provides a glimpse into the diverse range of service requests made through SYRCityline, allowing users to explore different types of reported issues within the city.

![image](https://github.com/josephistired/SYRCityline-Data-Explorer/assets/65987360/efa61fc1-b40c-4cee-b859-8596c0ee315e)


***/search address***: Retrieves all requests associated with a specific address. By providing an address as input, users can obtain a comprehensive list of service requests submitted for that location. This command helps residents gain insights into the issues reported in their neighborhood or community.

![image](https://github.com/josephistired/SYRCityline-Data-Explorer/assets/65987360/9aeecd0e-09f2-4649-a659-d0f2f7942617)


***/search id***: Retrieves detailed data about a specific request using its unique ID. By entering the ID of a request, users can access specific information such as the status, description, and progress updates related to that particular request.

![image](https://github.com/josephistired/SYRCityline-Data-Explorer/assets/65987360/08352ec6-a3e8-476a-9040-ca6bb3a95df5)


***/stats month***: Displays statistical insights about the data from SYRCityline for the current month. This command provides aggregated information, such as the total number of requests, the most common types of issues reported, or any notable trends observed within the current month's dataset.

![image](https://github.com/josephistired/SYRCityline-Data-Explorer/assets/65987360/d16fd198-237a-4a97-989f-26a6a691d43b)


***/stats year***: Presents comprehensive statistics about the data from SYRCityline for the current year. Users can explore valuable information such as the total number of requests received throughout the year, the distribution of requests across different categories, or any significant patterns that have emerged.

![image](https://github.com/josephistired/SYRCityline-Data-Explorer/assets/65987360/70290a8c-bec4-494d-972c-6d73af9c64ff)


***/stats query***: Retrieves specific statistics for a given month and year combination from the SYRCityline Requests dataset. By inputting a specific month and year, users can obtain detailed insights into the data for that particular time frame. This command allows users to explore trends, identify patterns, and understand the overall service request landscape for a specific month and year.

![image](https://github.com/josephistired/SYRCityline-Data-Explorer/assets/65987360/6d39da47-fcf1-4738-b612-015807f84641)


# ⚙️ Technology

SYRCityline Data Explorer is powered by advanced technologies to deliver a seamless user experience. It utilizes [Discord.js](https://github.com/discordjs/discord.js), a powerful JavaScript library, to establish communication with the Discord API. This integration enables the bot to efficiently interact with users on the Discord platform, providing a reliable and intuitive interface for accessing SYRCityline request data.

To retrieve data from the SYRCityline API, the bot relies on [superagent](https://github.com/ladjs/superagent), a popular HTTP client library in JavaScript. Superagent facilitates seamless requests to the [SYRCityline API](https://data.syr.gov/datasets/0d58a53ccb22457990161d756ed8a870_0/api) which uses [Arcgis](https://developers.arcgis.com/rest/), allowing the bot to fetch the latest information about service requests made within Syracuse.


# ❓ Host yourself?

You have the option to host the bot yourself, follow below to be able to run the bot yourself.

Prerequisites - You will need [Node.js](https://nodejs.org/en/download) version 18.60 or above, [Discord bot token](https://discord.com/developers/applications)!

Run the following commands in your terminal!

```
git clone https://github.com/josephistired/SYRCityline-Data-Explorer
cd SYRCityline-Data-Explorer
npm install
```


1. Start by clicking on the "New Application" button in the Discord Developer Portal.
Give your application a meaningful name and click "Create" to proceed.
Next, navigate to the "Bot" tab and click "Add Bot" to create a new bot user for your application.
If you want others to be able to invite your bot, make sure to tick the "Public Bot" option.
Copy the token using the “Copy” button.
Finally, copy your bot token using the "Copy" button to start using it in your bot's code.

2. Now to invite the bot to your server by heading to the OAuth2 tab, and press URL Generator. Make sure to click bot, and applications.command, and make sure to give the bot Administrator premissions. Copy & paste that link into your browser, and choose the server you want the bot in.

3. If you see the files you have, a file .env.example is there. Remove the .example part of the file name. Open the file, and put the token you copied earlier!

```
token=put token here
```

4. Now you are ready to start the bot! Simply run the ***node .*** command in the console, or run the bat file!


#  ⚠️ Disclaimer

SYRCityline Data Explorer is an open-source bot developed to foster transparency and collaboration. The bot's source code is available for the community to explore, modify, and enhance according to their needs. You are encouraged to invite the bot to your Discord server and leverage its capabilities to access SYRCityline request data.

If you wish to customize the bot, you have the freedom to fork the repository and make it your own. Feel free to modify the code to suit your specific requirements or add new features. However, please note that as the original developer, I won't provide support or accept responsibility for any changes or modifications made to the bot by others.

By offering SYRCityline Data Explorer as an open-source project, the aim is to encourage collaboration, innovation, and community engagement. Join the project, contribute to its development, and unleash the potential of data-driven insights for the residents of Syracuse, New York. 

Enjoy!

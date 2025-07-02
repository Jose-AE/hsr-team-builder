<a name="readme-top"></a>

<br />

<h3 align="center">Honkai Star Rail Team Builder</h3>

  <p align="center">
    A Honkai Star Rail Team builder to find popular teams with the selected characters
    <br />
    <a href="https://github.com/Jose-AE/hsr-team-builder"></a>
    <br />
    <a href="https://github.com/Jose-AE/hsr-team-builder/issues">Report Bug</a>
    ·
    <a href="https://github.com/Jose-AE/hsr-team-builder/issues">Request Feature</a>
  </p>
</div>

<!-- ARCHIVED NOTICE -->

> **⚠️ This repository is archived and no longer maintained.**
>
> The cost of maintaining this project is not optimal due to the low number of users. Additionally, since the data is scraped, it is not reliable for long-term use.
>
> If you wish to continue using the project, you can run it locally by following the instructions below.

<!-- ABOUT THE PROJECT -->

## About The Project

<img src="https://i.imgur.com/ivVNrKr.png" />

### Built With

<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/typescript_original_logo_icon_146317.png" alt="Typescript" width="40" height="40"/> </a>
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/react_original_logo_icon_146374.png" alt="react" width="40" height="40"/> </a>
<a href="https://chakra-ui.com/" target="_blank" rel="noreferrer"> <img src="https://img.icons8.com/color/512/chakra-ui.png" alt="chakra ui" width="40" height="40"/> </a>

<!-- GETTING STARTED -->

### Running Locally

To run the project locally:

1. Clone the repository:
   ```sh
   git clone https://github.com/Jose-AE/hsr-team-builder.git
   cd hsr-team-builder/app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173` (or the port shown in your terminal).

### Scraping Data

If you want to update the character and team data by scraping:

1. Go to the `scraper` directory:
   ```sh
   cd ../scraper
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the scraper:
   ```sh
   npm start
   ```
   This will generate new `characters.json` and `teams.json` files in the `scraper/output` directory.  
   You can then copy these files to the appropriate location in the app if you want to use the updated data.

<!-- LICENSE -->

## License

Distributed under the GNU GENERAL PUBLIC License. See `LICENSE.txt` for more information.

This project is not affiliated with HoYoVerse. Honkai Star Rail, game content and materials are trademarks and copyrights of HoYoVerse.

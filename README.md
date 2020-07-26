# Rinku-Frontend

> Create/manage download links for filesystems, Re-captcha, analytics & download log for files & Downloaded files.

[![release][badge]][release link] [![license][license-badge]][license file]

[license-badge]: https://img.shields.io/github/license/Gopinath001/Rinku-Frontend?style=flat-square
[license file]: https://github.com/Gopinath001/Rinku-Frontend/blob/master/LICENSE
[badge]: https://img.shields.io/github/v/release/Gopinath001/Rinku-Frontend?include_prereleases&style=flat-square
[release link]: https://github.com/Gopinath001/Rinku-Frontend/releases

## Features

- Create download link for any files
- Manage all the download links
- Download page for files is seperate
- Get analytics of the download statistics
- Includes google Recaptcha (configurable, can be turned off/on)
- Get log of download files

## checkout the [Backend](https://github.com/Gopinath001/Rinku-Backend/) written in php (from scratch) 

## Preview

### modile

<p align="center">
  <img src=" demo-mobile.gif" height="400">
</p>


### pc

<p align="center">
  <img src="demo.gif">
</p>

## userStories

- only allowed users(login) can use all features except download
- create download link for any files in the server
- manage all download links
- get analytics of the downloaded files(chart)
- has google Re-captcha support to prevent bots,
  - Re-captcha is configurable, can be turned off/on
- get logs of download files(user agent, ip, download time,...etc)
- have a totally separate download page that has no authentication(but has recaptcha)

## Built with

- React
- React router
- semnatic ui (just for the login & modal)
- nivo (just for chart)

## Start Developing

```bash

npm start

```

## Start build


```bash

npm run build

```

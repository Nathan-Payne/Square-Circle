# Square Circle
**Client project - currently in progress.**

This website is being completed for a graphic designer who provided design specifications on the layout, pages and positioning. Another requirement was fine control over future updates without the need for a developer. 

## Technologies
- HTML (via ejs templating)
- CSS
- Javascript
- Node.js
- mongodb
- Cloudinary API

## Purpose and lessons learned
The main two challenges on this project were having a large number of high quality images load in a reasonable time for the end user and having the future uploads managed independently. 

Choosing the cloudinary API allowed images to be transformed into the latest web compression formats (e.g. webp) at multiple resolutions, the most appropriate resolution is then requested dependent on the users screen size. To give a specific example: pages with as many as 27 high quality images load in 2.0s and achieve a 98 score for performance in google lighthouse; without percievably reducing image quality. Images are uploaded to cloudinary via the multer npm package; typically they are reduced to 100-300kb from 2-8MB in size.

Admin functionality is provided and allows content management via a form: this includes multi-file upload and CRUD options for position etc.

The project layouts also make use of the newer grid system in CSS. 

## Timespan
This project has been worked on on a non-continuous basis. It is currently waiting for a final mobile design specification before being deployed to a domain. 

## Future changes
- upload remaining project categories
- redesign of landing pages (mobile/desktop)
- update meta info
- ensure 2k/4k resolution design remains appropriate
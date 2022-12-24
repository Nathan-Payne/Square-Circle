# Square Circle
**Client project - currently not active.**

This website was completed for a graphic designer who provided design specifications on the layout, pages and positioning. The client also required fine control over future content/image positioning updates without the need for a developer. 

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

## Demo
For a look at how the site turned out head to [nathanpayne.dev](https://nathanpayne.dev/)

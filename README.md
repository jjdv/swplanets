# Star Wars Planets

## Overview
This project was started as an opportunity to take a deeper dive into Angular ecosystem, starting from TypeScript, through Angular Router, NgRX store, RxJS flow up to Angular Material. The intended basic functionality of the project was presentation of a list of Star Wars planets and their details based on the [SWAPI](https://swapi.co/) - The Star Wars API, created by Paul Hallett. However, when investigating available resources helpful for the graphical side of the project, I found the [Star Wars Galaxy Map](https://wrvh.home.xs4all.nl/galaxymap/index.html) which provides great visualization of Star Wars planets in the whole galaxy. From this point, I coudn't resist not to make this great work interactive.

## Interactive Star Wars Galaxy Map
I was very glad when I saw on the web page the whole interactivity I had in mind. You can see the final result at <https://swplanets.appspot.com>.  
Here is the full list of the interactive features:
- basic filtering and sorting based on different criteria
- you can see the respective sector on the Galaxy Map where the hovered planet is located
- if the planet is presented on a Detailed Map, this map is highlighted too
- you can freeze the highlights by clicking on a selected planet
- any sector of the Galaxy Map and any Detailed Map can be zoomed with a click
- you can also zoom-in and -out those maps for a selected planet directly from that planet specification by clicking on the related field
- finally, you can click on the details field of a planet to go to a page presenting details of that planets.

As a cherry on top, you may play a bit with the Star Wars style of text movement in the footer. Still you can make it stright, for better readability, with a click on the icon in the top right corner of the footer.

## Responsive design
Nowadays, a responsive design is a must, so the page elements fits optimally to the screen size automatically. For small screens the application limits displayed information and functionality as appropriate (fortunatelly the footer behaviour is kept ;)). In addition, a user is informed about more functions available on larger screens,

## Disclaimer
This site was created only to play with selected web development technologies. All materials, trademarks, logos, design rights or similar rights, that are used on this site, are the property of their respective owners, in particular Lucasfilm Ltd. LLC.

The use of any trademark on this site does not vest in the author of this site any trademark ownership rights in such trademarks, nor does the use of such trademarks imply any affiliation with or endorsement of the site and its authors by such owners.

## Licence
[![CC-BY-SA](https://i.creativecommons.org/l/by-sa/4.0/80x15.png)](http://creativecommons.org/licenses/by-sa/4.0/)

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). It may be copied, distributed and changed freely as long as the original author is credited and the result can also be copied, distributed and changed with no restrictions.

# Dinner-and-a-Show-app

This website will let the user search for a tv show, and then provide them with a recipe for a meal they might enjoy with that show. The front page contains a search bar where they can type the name of a show they want info on.  What they type is then used to access info about that show via an api, which is then displayed on the page.  A random recipe is also displayed on the page after being parsed from an external JSON file.  In case the user has trouble thinking of a show name, the front page will list some suggested show names below the search bar.  The info about these shows is stored in an array of objects in the app.js file, a for loop is used to dynamically display the content on the front page.  

The 3 Code Louisville Project requirements this webpage will satisfy are:

1.  Create an array, dictionary or list, populate it with multiple values, retrieve at least one value, and use or display it in your application

Location:  This requirement is satisfied starting on line 9 in app.js. This is the array with multiple values.  The for loop on line 51 of app.js is what retrieves the values and displays them in the application.

2.  Retrieve data from an external API and display data in your app (such as with fetch() or with AJAX)

Location:  This requirement is satisfied via the fetchInfo function on line 67 of app.js. An event listener on line 137 triggers when the user clicks the search button.  The value user typed into the search bar is grabbed and passed it into a url that retrieves data from the api website.  The JSON data the website returns is parsed, and then passed into the generateList function on line 81 that displays in the htmal a list of shows that match the user's search.  Each show listed has a button, which when clicked triggers an event listener on line 145 that accesses the api again for more detailed info about that specific show, which is then displayed on the page via the generateInfo function on line 97.

3.  Read and parse an external file (such as JSON or CSV) into your application and display some data from that in your app.

Location:  This requirement is also satified by the fetchInfo function on line 67 of app.js, only instead of accessing data from an external api, the function is now used to retrieve data from recipe.json, which is included in the project files.  Once the event listener on line 145 is triggered to show info about a specific tv show, the fetchInfo function is also triggered to retrieve the data in recipe.json.  The recipe data is then passed into the generateRecipe function on line 108, and a single random recipe is displayed on the page along with the specific show's info.   


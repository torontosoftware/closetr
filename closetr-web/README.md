# Closetr-Web

This is the front-end web project for Closetr. It was generated via Angular CLI and
is using Angular version 7.0.4. The contents of this README contain information about
features implemented in the front-end, as well as the structure of the different
components. Feel free to take a look at the project, and run it for yourself via
the instructions found later in this document.

### Features and Components

Each 'feature' has it's own Angular component. Each of the components can be found
in src/app/. Some components are nested inside other components, if they are related,
but most are stored in their own folder under src/app/. Here are the components that
are currently in the project.

1. **add-clothing**
Add Clothing component, corresponds to the UI and functionality of adding new
clothes to the user's closet.

2. **budget-widget**
Budget Widget component, corresponds to the UI and functionality of the budget
widget which is found on the dashboard.

3. **closet-manage**
Closet Manage component, corresponds to the UI and functionality of managing the
user's closet. Contains a view of user's closet, and the ability to edit, add, and
delete clothes. Serves as a container for the Closet Card component.

4. **closet-widget**
Closet Widget component, corresponds to the UI and functionality of the closet
widget, which is found on the dashboard. Also serves as a container for the Closet
Card component.

5. **closet-widget/closet-card**
Closet Card component, corresponds to the display of information about one piece
of clothing in a user's closet. Currently contained in both Closet Manage, and
Closet Widget component.

6. **dashboard**
Dashboard component, serves as a container for the widgets: Budget, Closet, and
Today.

7. **edit-clothing**
Edit Clothing component, corresponds to the UI and functionality of editing existing
clothing that is in the user's closet.

8. **today-widget**
Today Widget component, corresponds to the UI and functionality of the today widget,
which is found on the dashboard.

9. **today-widget/log-outfit**
Log Outfit component, corresponds to the UI and functionality of logging a user's
outfit for the day. Contains view of clothes added to outfit, and options to add
more via search, or adding a new piece of clothing to the closet itself.

### Services and Pipes

Also contained within src/app are services and pipes that are used for Closetr.
These are functions that are shared throughout different components, for various
purposes such as communicating with each other, or sending/retrieving data from
the server. Here are the pipes and services currently in the project.

#### Services
Services are contained in src/app/services/

1. **closet-service**
General functions that correspond to adding new pieces of clothing, editing
existing clothes, and deleting clothes in the user's closet, and saving these
changes to the server. This service is shared throughout all components that
correspond to closet management, such as Closet Manage, Closet Widget, Add
Clothing, and Edit Clothing.

2. **log-outfit**
Functions that correspond to maintaining a user's outfit clothing list for a
day. This includes the ability to add, and delete clothes, and saving them to
the server. This service is shared with Log Outfit Component currently, and
uses Closet Service.

3. **routes-service**
Functions that help with the routes/urls involved in navigating the Closetr
web app.

#### Pipes
Pipes are contained in src/app/pipes/

1. **search-filter**
A pipe that allows to filter a list of objects via a constraint that a given
attribute (which is a String) starts with a given value. This pipe is currently
used in the search functionalities in the components: Closet Manage, and Log
Outfit.

### Development Server

Run the web-app for yourself!

Before anything, ensure that you've installed the required dependencies running
`npm-install` in the root folder (closetr-web).

Run `ng serve` in the root folder (closetr-web) for a development server.
Navigate to `http://localhost:4200/` to see the app! You may also want to run the
back-end server (go to closetr-api to see how this works) locally. 

The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in
the `dist/` directory. Use the `--prod` flag for a production build.

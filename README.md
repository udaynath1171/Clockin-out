
## Clock In / Out

HiMama ClockIn/Out frontend application responsible for managing UI/UX attributes.

## Instructions

Access via cloud by heroku:</br>
1: Access the frontend application: [Frontend](https://himama-clockin-frontend.herokuapp.com/)</br>
2: Login with one of the seeded accounts:</br>
email: <b>marcos@marcos.com</b></br>
password: <b>123</b></br>
<i>Or</i></br>
email: <b>himama@himama.com</b></br>
password: <b>123</b></br>
<i>*Each user can only see their registers, so I seeded two accounts to test the data visibility accross access.</i></br></br>


To run locally:</br>
1: Clone project</br>
2: go to the project folder and run `npm i`</br>
3: After the install of all dependencies, run `yarn start`</br>
4: Your browser will open automatically on [http://localhost:3000](http://localhost:3000)</br>
<i>* The server will be running in development mode.</i></br></br>

## Key features
* React + Redux managing application state.
* Barrel architecture: [A quick overview](https://hackernoon.com/react-project-architecture-using-barrels-d086146eb0f6)
* Fully modular with Layouts, Common components, Views, Helpers, Stores and Theme configurations (Typhografy, Color Pallete and so on)
* Http communication through Axios + JWT Authorization.
* UI validations with friendly visual components reproducing API validation messages.
* What you see is what you get: You can't submit a form if there's an invalid field. The user has visual confirmation by enabling/disabling buttons.
* Requests + Business inside stores = Skinny components responsible only for managing the UI artifacts.
* Functional components + React hooks as much as possible to avoid creating Class components everywhere.
* Beautiful style following HiMama's design patterns.
* It is a small application but it was organized in the way it can grow as much as needed. No cyclic dependency between components.
* .env file configured to make deploys easier.
* Table fully configured to use Backend pagination for more performance. </br>

## Questions
* How did you approach this challenge?</br>
I started by reading the requirements over and over to not make assumptions. Once I understood the requirements I went to HiMama website to gather all visual identity: Colors, Components, Common approaches. With all in hand, I draw the screens in a draft paper to think about the best usability/experience.</br></br>

* What schema design did you choose and why?</br>
I chose React as Javascript framework because it's more common for HiMama developer team - thinking about future evolution. I first developed the whole visual structure and then I just fit the legos(Components).
For backend, I chose Ruby On Rails API Only + Postgres to quickly develop the endpoints and its constraints. I also dockerized the whole backend to make easier to run in all developers machines (Works not only on my machine :D ) - further information about backend and approach can be accessed here on its [Repository](https://github.com/marcosvieiraftw/himama-clockin-api)</br></br>

* If you were given another day to work on this, how would you spend it?</br>
<b>Frontend</b></br>
1: Refine the interface by adding some visual resources.</br>
2: Refine the frontend code by adding PropTypes to all components.</br>
3: Implement automated tests.</br>
4: Evolve the protection of the routes to avoid the blink effect.</br>

    <b>Backend</b></br>
    1: Create an admin namespace to administrate all users registers.</br></br>

* What if you were given a month?</br>
1: Implement super admin access.</br>
2: Implement an analytical module to retrieve reports from all users.</br>
3: Implement an hour bank feature according to the country work laws.</br>
4: Implement card components based on days instead of a table with all events.</br>
5: Improve constraints.</br>
6: Gather the needs/requirements by talking to the future users to plan the next sprint/month of work.</br>

# IO Era Home Test - Create rating & review system

Hello and welcome to IO Era's post-interview task assignment. Before we start, we want to thank you for your interest in joining our team, and for taking the time to work on this task as part of your adventure to become one of us!

## App requirements
Your app should have 2 public screens (movies list, movie details) and an admin. User should be able to navigate to the movie details page without authentication and leave a review. Once a review is submitted it is not displayed until approved by the admin. All users should see all approved reviews for a specific movie. Each review can be upvoted (+1) or downvoted (-1) these actions determine the review's score. Reviews with the highest score should be displayed on top. Each user should be able to vote only once and cancel or change their vote.

### Movie list page
Use the data from `movies.json` to display a list of movies that users can review.

### Movie details page
Visualize the movie details, the cummulative rating based on approved reviews and a list of all approved reviews, as well as a public form for adding a review.

The review form must include the following:
- first name, last name, email address (input fields)
- star rating widget (1 to 6 scale)
- user review (textarea field, minimum 10 characters)
- submit button
- front-end form validation and error handling
- success message after submit

### Admin
The admin panel should display a list of reviews. New reviews must be approved by an administrator before they go live.

## Tech requirements
- The app should be developed using ReactJS. You can start from scratch, from a boilerplate project or use a scaffolding CLI.
- You can use ES6+, TypeScript and any supporting libraries (e.g. Lodash, Ramda, RxJS, etc.) you need.
- You are free to choose the technologies for the backend, DB and the API communication layer
- The code needs to demonstrate state management within the app as well as managing asynchronous requests.
- In terms of serving the static JSON file upon app requests, it's up to you whether to create a mock server or use an existing package.
- The app's aesthetics are up to you - you can use Bootstrap, Material or Ant Design.

## Bonus points
- captcha for the reviews form (anything of your choice to validate if the user is a human)
- debouncing for upvoting and downvoting of reviews
- frontend unit tests


## Timeline
The app should take no more than 16h to complete and you have up to 5 business days to submit your solution.

If you have any questions - let us know. Good luck! :)
# 💌 Angbao Distribution API

## Preamble

This project communicates with a mongodb database to distribute a random amount of money to multiple people. For easy access to the database to public without exposing sensitive environment variables, I have hosted the app is hosted on vercel. I have included endpoints for user creation and deletion as well for increased accessibility. Postman will be used to test the endpoints. The github repository can be found here: https://github.com/kiblykat/angbao-distribution-api.

Note: Money is stored in cents to prevent floating point conversion issues.

## Setup Instructions

### Running the program

1. Ensure Postman is downloaded on your computer.
2. Open Postman app, on the top-left hand corner, click the Import button beside "My Workspace". A popup window should appear.
3. After extracting the zip folder, enter the "Postman" folder
4. Drag the "Angbaobao.postman_collection.json" onto the popup window in step 2.
5. Navigate through the different endpoint on the left side to test the endpoints. These endpoints are hosted on Vercel.
6. The relevant endpoints are:
   - https://angbaobao.vercel.app/users (for any user related endpoints)
   - https://angbaobao.vercel.app/angbaos/distribute (only has POST endpoint to randomly distribute angbaos)

### Testing

1. After extracting the zip folder, enter the "backend" folder
2. Open terminal and install relevant dependencies by typing "npm i"
3. After dependencies are installed, type "npm run test" to run all test cases available.
4. To check decision coverage, run "npx jest --coverage"

## Tech Stack

- Backend: Node.js, Express, TypeScript, Mongoose
- Database: MongoDB
- Testing: Jest

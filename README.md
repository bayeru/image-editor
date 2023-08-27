# Image Editor App
A small content creation tool to edit images and download them.

Live preview: https://image-editor-henna.vercel.app/

## User stories
The application should satisfy these user stories:

- As a user, I want to be able to browse through the list of images.
    - Images list should be paginated.
    - Image item should include image preview and author's name.
- As a user, I want to click an image and be navigated to the edit image page.
- As a user, I want to be able to edit image:
    - User can select image size [height, width]
    - User can choose greyscale mode.
    - User can blur the image (grade between 1 - 10)
    - User should see the currently edited image preview
- As a user, I want to be able to download edited image
- As a user, I want to be able to refresh the page at any point and still get the previous result
- As a user I want the page to remember where I was when going back in history


## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:playwright`

Launches e2e tests with Playwright

### `npm run build`

Builds the app for production to the `build` folder.\


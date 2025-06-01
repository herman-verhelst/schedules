# Code

This directory contains the source code of the Visual Day Schedules web application, built
with [Vue](https://vuejs.org/) and powered by [Vite](https://vitejs.dev/) for development and build tooling.

## Scripts

The following npm scripts are defined in the project:

| Command           | Description                                                                                                                    |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `npm run dev`     | Starts the Vite development server with hot module reloading.                                                                  |
| `npm run build`   | Builds the production-ready version of the app.                                                                                |
| `npm run preview` | Previews the production build locally.                                                                                         |
| `npm run icons`   | Generates the icon library by processing SVGs located in `/tooling/icons`. The result is stored in `/public/icons/icons.json`. |

## Icon Workflow

Custom icons are a key part of the application’s visual language. Here's how to add or update icons:

1. **Add Your SVGs**  
   Place individual SVG icon files into the `/tooling/icons/` directory. Filenames should be in kebab-case (e.g.
   `running.svg`).

2. **Generate the Icon Library**  
   Run the following command to build the icon metadata and copy the icons to the public folder:
   ```bash
   npm run icons

3. **Add alternative names**
   Each icon has an official name and alternative names. Alternative names are used for searching and filtering. To add
   alternative names, edit the `icons.json` file in the `/tooling/icons/` directory. Each icon object should have an
   `alternativeNames` string with the desired names seperated by commas.
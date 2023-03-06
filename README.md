## CAPA Tracker (Work In Progress)

<!--- <h3><a href="https://capa-tracker.netlify.app/">View Demo</a> (requires GitHub login)</h3> -->
<!-- <p>*NOTE: The <a href='https://capa-tracker.netlify.app/'>CAPA Tracker Demo</a> is under construction and authentication may become disconnected from the production environment during updates, preventing login access!*</p> -->

<p>CAPA Tracker is a full-stack application that allows users to create CAPA records, add information, update information, and delete entries. CAPA stands for Corrective And Preventive Action, and is a process by which a manufacturing organization can make improvements to reduce non-conformances and process gaps.</p>
<p>My background is in pharmaceutical and medical device quality assurance; in both industries, CAPA processes are required by regulatory agencies. CAPA Tracker is an app that can help document and keep track of your organization's CAPAs.</p>
<p>CAPA Tracker is in development using <a href="https://kit.svelte.dev/">SvelteKit</a> and <a href="https://daisyui.com/">DaisyUI (Tailwind plugin)</a> on the front-end. Server calls to the <a href="https://www.mongodb.com/">MongoDB</a> back-end database are made using <a href="https://kit.svelte.dev/docs/form-actions">SvelteKit form actions</a>. Authentication is handled by <a href="https://authjs.dev/reference/sveltekit/modules/main">Auth.js for SvelteKit</a> (beta version).</p>
<p>The `help` page has a chatbot that utilizes an <a href="https://platform.openai.com/playground">OpenAI API</a>.</p>
<p>This application is a complete overhaul of my <a href="https://github.com/ubemacapuno/capa-tracker">original CAPA Tracker</a> application, which was developed using Embedded JavaScript (EJS), Node (Express), and MongoDB.</p>

 <tr>
    <td width="30%"  style="align:center;" valign="top">
            <img src="https://github.com/ubemacapuno/images-for-github-readme/blob/main/2023-01-23%2020-02-22_2.gif?raw=true" width="30%"  alt="CAPA Tracker demo animation."/>
    </td>
  </tr>

## How It's Made:

**Tech used:**

<a href="https://kit.svelte.dev/">SvelteKit</a>, <a href="https://www.typescriptlang.org/">TypeScript</a>, <a href="https://www.mongodb.com/">MongoDB</a>, <a href="https://authjs.dev/reference/sveltekit/modules/main">Auth.js</a>, <a href="https://docs.github.com/en">GitHub OAuth API</a>, <a href="https://tailwindcss.com/">Tailwind CSS</a>, <a href="https://daisyui.com/">DaisyUI</a>.

## Install the dependencies either using NPM/Yarn/PNPM:

Using NPM:

```bash
# Install dependencies
$ npm install

# Start development server
$ npm run dev
```

Using Yarn:

```bash
# Install dependencies
$ yarn

# Start development server
$ yarn dev
```

Using PNPM:

```bash
# Install dependencies
$ pnpm i

# Start development server
$ pnpm run dev
```

Open http://127.0.0.1:5173/ to view it in the browser.

## Things to add:

- Create a `.env` file and add the following:
  - DB_URI=(your MongoDB connection string)
  - GITHUB_ID=(your GitHub OAuth Client ID)
  - GITHUB_SECRET=(your GitHub client secret key)
  - AUTH_SECRET=(32 character random string)
  - AUTH_TRUST_HOST=true(set to true if hosting outside of Vercel)
  - OPENAI_KEY=(OpenAI API string)

## Lessons Learned:
- Greater understanding of CRUD operations and routing with SvelteKit
- Handling user authentication via Auth.js and +page.server.ts files.
- Better understanding of Form Actions and Page Load with SvelteKit
- Better understanding of zod schemas
- Better understanding of Svelte, SvelteKit, and TypeScript
- Better understanding of Svelte stores
- Better understanding of cookies
- Connecting to OpenAI API
- Loader components
- Edge functions and SvelteKit deployment adapters

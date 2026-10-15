# Ekinsu Oğuz — Personal Website

Ekinsu Oğuz's personal portfolio and travel journal. The site brings together a personal introduction, blog posts, travel countries and places, and experience and education details. Content is read from Convex, and blog and travel content can be added through the admin panel.

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Commands](#commands)
- [Pages](#pages)
- [Data and image flow](#data-and-image-flow)
- [Project structure](#project-structure)
- [Admin panel and security note](#admin-panel-and-security-note)
- [Deployment](#deployment)

## Features

- Personal introduction and portfolio pages
- Blog posts retrieved from Convex
- Travel journal with countries and their associated places
- Country and travel photos uploaded to Convex Storage
- Experience and education listings
- Admin panel for adding content
- Responsive layouts for mobile and desktop

## Tech stack

- [Next.js](https://nextjs.org/) 16 — App Router
- [React](https://react.dev/) 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Convex](https://convex.dev/) — database, reactive queries, and file storage

## Getting started

### Requirements

- Node.js and npm
- A Convex account and a Convex development deployment linked to this project

### 1. Clone the repository and install dependencies

```bash
git clone <repository-url>
cd ekinsuoguz-website
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_CONVEX_URL=https://<deployment-name>.convex.cloud
ADMIN_PASSWORD=<local-admin-password>
```

`NEXT_PUBLIC_CONVEX_URL` is the URL of your Convex deployment. When connecting a development deployment for the first time, `npx convex dev` can guide you through setup and configure the deployment. If needed, copy the URL from the deployment settings in the Convex dashboard and add it to `.env.local`.

`ADMIN_PASSWORD` is the password checked by the `/admin` login page. Do not share `.env.local` or commit it to Git when it contains a real password. `.env*` files are ignored by `.gitignore`.

### 3. Start the Convex development process

```bash
npx convex dev
```

This command syncs the Convex functions and schema with the development deployment. Keep it running during development.

### 4. Start the Next.js application

In a separate terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. The admin panel is available at [http://localhost:3000/admin](http://localhost:3000/admin).

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server. |
| `npm run lint` | Runs ESLint. |
| `npx tsc --noEmit` | Runs the TypeScript type check. |
| `npm run build` | Creates a production build. |
| `npm run start` | Serves the production build locally. |
| `npx convex dev` | Starts Convex development and syncs functions with the deployment. |

## Pages

| Path | Content |
| --- | --- |
| `/` | Home page and personal introduction |
| `/aboutMe` | About, journey, and interests |
| `/posts` | Blog posts retrieved from Convex |
| `/travels` | Countries and places in the selected country |
| `/experiences` | Experience and education details |
| `/admin` | Admin panel for adding blog and travel content |

## Data and image flow

The Convex schema is defined in [`convex/schema.ts`](./convex/schema.ts). The main tables are:

- `posts`: blog post titles and content
- `travelCountries`: country names, descriptions, sort order, and cover images
- `travels`: travel places, content, associated countries, and image information
- `experiences`: work and experience entries
- `educations`: education entries

Convex functions live in the `convex/` directory. Client-side pages call queries with `useQuery` and write operations with `useMutation`. Convex queries reactively update clients when data changes.

Image files are uploaded to Convex Storage. The database stores each file's Storage ID (`_storage` ID), rather than the file itself. Read queries resolve these IDs to URLs that can be displayed in the site. Image uploads in the admin panel are limited to 10 MB.

## Project structure

```text
app/
  admin/          Admin panel and password verification action
  aboutMe/        About page
  experiences/    Experience and education page
  posts/          Blog posts
  travels/        Countries and travel places
  layout.tsx      Root layout and Convex provider
  page.tsx        Home page
  globals.css     Global styles
convex/
  _generated/     Convex-generated types and API references
  schema.ts       Database tables and indexes
  *.ts            Queries and mutations
public/           Static images and files
```

## Admin panel and security note

The panel can add blog posts and countries, update a country's cover image, and add travel places to a country. Images are optional when creating a country or travel place. To replace a country's image, select the country and choose a new image.

**Important:** The current password check runs in a server action, but successful access to the panel is then represented by client-side React state. This is not a persistent session or a complete authentication system. In addition, the existing public Convex mutations do not independently check the user's identity or role. Do not consider the panel or its write functions protected for sensitive or production use without adding proper authentication and authorization.

## Deployment

The application can be deployed to a platform that supports Next.js, such as Vercel. Set `NEXT_PUBLIC_CONVEX_URL` in the deployment environment and deploy the Convex functions to the intended deployment. If needed, configure `ADMIN_PASSWORD` as a server-side environment variable; never put it in source code or in a client-accessible `NEXT_PUBLIC_` variable.

Before deploying, review the production Convex deployment configuration, backup strategy, and the authentication and authorization requirements described above.

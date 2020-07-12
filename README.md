# Rokt Test to View GitHub Repositories
Repositories matching the search term are retieved and sorted by the number of stars.
Only the id, name and total number of watchers for each repository are displayed.

## Development Approach
- Searched the GitHub API documentation to be able to see the required API calls and their responses.
- I found the GitHub GraphQL Explorer at: http://developer.github.com/v4/explorer and felt this was the simplest approach.
  - I played around with the Explorer and developed my query.
  - I had trouble with ordering by 'stargazers' as it contains an orderBy field and so I had to do some Googling.
  - I was very happy with this approch as I only needed a single API call, minimalising network trafic and trivialising this task.
- The React app was bootstraped using Next.js
- I added the GraphQL code to the main App and just console logged the results.
  - I needed a GitHub Token to access the API; the documentation was pretty straight forward.
  - Although I intended to use Apollo Client, it felt like overkill. By using a basic `fetch` call I thought this
  could be used as a great example of GraphQL's power without the complications (magic) of the client. 
- I reused the search input I created for a previous test.
- React Hooks helped to keep the code clean.

### Extension
- Added mobile first, basic responsiveness.
- Pagination (not implemented) seems to be achieved by using 'cursors'.
  - I did not get a chance to look into that, but I was very interested in learning how to use them.

## This test is deployed on Vercel for testing
### NOTE: only tested on Chrome
https://rokt-test.vercel.app

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

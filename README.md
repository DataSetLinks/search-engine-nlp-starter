# Why DataLinks?

- Natural language interface for your data
- Flexible, fast setup
- Ideal for internal tools, rapid prototyping, and curious minds
- Deploy natural langage searches in 10 minutes

## Quickstart

1. Duplicate .env.example as .env.local
2. Fill it with your configuration (detailed below)
3. Run the project - and behold the power of natural language search in your hands

## Setup

Provide all required environment variables in a `.env.local` file.
Use `.env.example` as a reference.

## Environment Variables Instructions

### DATALINKS_DATASET

Open the dataset you want to use in DataLinks, copy its displayed name, and paste it into `.env.local`.

For example, for the dataset shown below:

_datalinks/supplychain/tariffs_

![DataLinks Dataset Visualization](/public/Datalinks_Dataset.png)

Your `.env.local` entry should look like this:

`DATALINKS_DATASET=datalinks/supplychain/tariffs`

### DATALINKS_TOKEN

Visit `https://datalinks.com/dashboard/settings` and create a new token.
Paste the token into your `.env.local`.

### USE_NATURAL_LANGUAGE_QUERY

This flag enables or disables the natural language query adjustment feature in the web app.

If set to `1` you can use natural language query feature.

If set to `0` you can use our custom query system - visit [docs.datalinks.com](https://docs.datalinks.com/) to learn more!

## Prefer not to clone the repo? You can use v0.dev instead

If you'd rather get started without cloning the repository manually, you can open an exact copy of this project directly in v0.dev:

- [v0.dev starter link](https://v0.dev/community/data-links-ui-template-F0AFCpdkNSX)

Click the "Open in v0" button to launch the project.

If you're not signed in yet, simply log in using your Vercel account.

Once you're in, click the "Deploy" button in the top-right corner and follow the instructions to deploy the project to your Vercel account.
After deployment, please remember to configure your environment variables.

You can do this in one of two ways:

- directly within the v0.dev interface under your project settings, or
- from your project dashboard on Vercel.

If you run into any issues, don't hesitate to [reach out](mailto:support@datasetlinks.com) - we're here to help!

## Need Help or Inspiration?

We're here if you need a hand - from setup to deployment.
Visit [datalinks.com](https://datalinks.com/) or drop us a message anytime.

For tips, tricks, and updates, follow us on [LinkedIn](https://www.linkedin.com/company/datasetlinks/).
Let's shape the future of data interaction together.

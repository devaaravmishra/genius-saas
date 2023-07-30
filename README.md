# Genius-SaaS

<div align="center">
    <img src="public/logo.png" height="120px" width="120px"/>
</div>

<div align="center" >

![Next.js Version](https://img.shields.io/badge/Next.js-13-green)
![React Version](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/license-MIT-orange)

</div>

## Introduction

[Genius](https://genius-saas.vercel.app) is a cutting-edge web application built using Next.js, React, and other modern [technologies](#technologies). It is designed to showcase the implementation of Artificial Intelligence (AI) features in a Software-as-a-Service (SaaS) application. This repository serves as a foundation for creating AI-powered SaaS products, with an emphasis on the user experience and seamless integration of AI capabilities.

## Table of Contents

-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Usage](#usage)
-   [Configuration](#configuration)
-   [AI Integration](#ai-integration)
-   [Technologies](#technologies)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   **AI-driven Recommendations**: The application leverages AI algorithms to provide personalized recommendations to users based on their preferences and behavior.

-   **Dynamic Content Generation**: AI-powered content generation allows for creating dynamic and relevant content on the fly, optimizing user engagement.

-   **User Behavior Prediction**: The app uses AI models to predict user behavior, aiding in user retention and improving customer satisfaction.

## Getting Started

Follow the instructions below to set up the project locally on your machine.

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn

### Installation

1. Clone the repository to your local machine:

2. Navigate to the project directory:

3. Install the dependencies:

```bash
npm install
```

or

```bash
yarn install
```

## Usage

Create a `.env.local` file in the root directory of the project and add the following environment variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_api_key
CLERK_SECRET_KEY=your_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=your_api_key

REPLICATE_API_TOKEN=your_api_token

DATABASE_URL=your_database_connection_string

STRIPE_API_KEY=your_stripe_api_key

NEXT_PUBLIC_APP_URL=http://localhost:3000

CRISP_WEBSITE_ID=your_crisp_website_id

```

Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

## Screenshots
<img width="1469" alt="Screenshot 2023-07-28 at 10 37 17 PM" src="https://github.com/aaaravv/genius-saas/assets/66662179/a363de4a-47d2-4cc6-aa4f-0bf640960bd6">
<img width="1470" alt="Screenshot 2023-07-28 at 11 01 59 PM" src="https://github.com/aaaravv/genius-saas/assets/66662179/c506d422-57b8-48b6-83bf-c26a07dd8fd5">

## Configuration

The application uses [Clerk](https://clerk.dev/) for authentication and user management. You can sign up for a free Clerk account [here](https://dashboard.clerk.dev/).

The app also uses [OpenAI](https://openai.com/) for AI-powered content generation. You can sign up for a free OpenAI account [here](https://beta.openai.com/).

The app uses [Replicate](https://replicate.ai/) for AI model deployment. You can sign up for a free Replicate account [here](https://replicate.ai/).

The app uses [Stripe](https://stripe.com/) for payment processing. You can sign up for a free Stripe account [here](https://dashboard.stripe.com/register).

The app uses [Crisp](https://crisp.chat/) for customer support. You can sign up for a free Crisp account [here](https://crisp.chat/en/).

## AI Integration

The application uses AI models to provide personalized recommendations to users based on their preferences and behavior. It also uses AI-powered content generation to create dynamic and relevant content on the fly, optimizing user engagement. The app uses AI models to predict user behavior, aiding in user retention and improving customer satisfaction.

## Technologies

-   [Next.js](https://nextjs.org/)
-   [React](https://reactjs.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Clerk](https://clerk.dev/)
-   [OpenAI](https://openai.com/)
-   [Replicate](https://replicate.ai/)
-   [Stripe](https://stripe.com/)
-   [Crisp](https://crisp.chat/)
-   [Prisma](https://www.prisma.io/)

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any questions or suggestions.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Bonus

I hope this project provides a valuable resource for developers interested in exploring the potential of AI in SaaS applications. Happy coding! 🚀

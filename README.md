# NekoWalls

A beautiful, responsive wallpaper gallery built with Next.js that displays anime catgirl images fetched from the Nekosia API. 

## ✨ Features

- **Infinite Gallery**: Browse through pages of high-quality anime catgirl wallpapers.
- **Dynamic Grid Layout**: Automatically adjusts from 1 column on mobile to 3 columns on desktop.
- **Modern UI**: Dark-mode aesthetic with liquid glass effects, neon glowing text, and smooth micro-animations.
- **Smart Image Cards**: Interactive cards that reveal tags and a color palette accent upon hover.
- **Route-based Pagination**: Easily navigate between pages (e.g., `/page/1`, `/page/2`) with proper server-side rendering.
- **Optimized Data Fetching**: Utilizes `Promise.allSettled` to fetch 9 random images concurrently per page load for faster performance without exceeding API rate limits.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Directory)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **API**: [Nekosia API](https://nekosia.cat/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## 📦 Getting Started

### Prerequisites

You need [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   cd anime-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser. You will be automatically redirected to the first page of the gallery.

## 📂 Project Structure

- `src/app/page.tsx` - Root page that redirects to `/page/1`.
- `src/app/page/[num]/page.tsx` - The dynamic gallery page that fetches data and renders the layout.
- `src/app/globals.css` - Custom CSS containing root variables, liquid glass variants, and image card hover animations.
- `src/components/ImageGrid.tsx` - Responsive grid container.
- `src/components/ImageCard.tsx` - Individual image component with hover effects, badges, and color dots.
- `src/components/Pagination.tsx` - Navigation controls for moving between gallery pages.
- `src/lib/api.ts` - Axios configuration and fetching logic for the Nekosia API.

## 🤝 Acknowledgments

Images and metadata are provided by the [Nekosia API](https://nekosia.cat/).

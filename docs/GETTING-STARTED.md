# Getting Started

Welcome to the **Neural Architect** development environment. This guide will help you set up the project locally for development and testing.

## Prerequisites
Ensure your local environment meets the following requirements:
- **Node.js**: v20+ recommended.
- **npm** or **yarn**: Used for package management.
- **Git**: For version control.
- **Supabase Account**: Required for database, auth, and logic layer operations.
- **GitHub Account**: Required for API proxy configuration.

## Initial Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/farhanmallik05/portfolio.git
   cd portfolio
   ```

2. **Install Dependencies**
   The project leverages Next.js 16 and Turbopack. Install dependencies using your preferred package manager:
   ```bash
   npm install
   ```
   > **Note:** If you encounter upstream peer dependency conflicts (especially involving React 19 constraints with certain GSAP or Three.js bindings), use `npm install --legacy-peer-deps`.

3. **Environment Configuration**
   The project requires specific backend keys to function fully, especially for the GitHub integration and Supabase connectivity.
   
   Create a `.env.local` file in the root of the project:
   ```bash
   touch .env.local
   ```
   
   Populate it with the following required variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GITHUB_TOKEN=your_classic_personal_access_token
   GITHUB_USERNAME=farhanmallik05
   ```
   *Make sure your `GITHUB_TOKEN` is a Classic PAT. Fine-grained tokens may encounter issues with the specific REST API endpoints used.*

4. **Running the Development Server**
   Start the Next.js development server with Turbopack enabled:
   ```bash
   npm run dev
   ```
   The cinematic portfolio will now be accessible at [http://localhost:3000](http://localhost:3000).

## Next Steps
Once the project is running:
- Check out `docs/DEVELOPMENT.md` for our branching and component-building guidelines.
- Review `docs/ARCHITECTURE.md` to understand the separation of concerns between GSAP and Framer Motion.

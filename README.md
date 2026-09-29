# Karre John Hyde — AI / ML Engineer Portfolio

A modern, high-performance portfolio website built with React 19, Vite, Tailwind CSS v4, and TypeScript, showcasing AI/ML projects, experience, technical skills, and achievements.

## 🚀 Live Demo

- **GitHub Repository**: [KarreJohnHyde/my_-portfolio](https://github.com/KarreJohnHyde/my_-portfolio)
- **Deployment**: Live on [Vercel](https://vercel.com/johnnyvercel)

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🌟 Featured Projects

1. **Study2AI** — Full-stack RAG system turning documents into grounded, context-aware learning conversations *(LangChain, FAISS, Python, Gradio)*.
2. **Expense AI** — Serverless expense intelligence with receipt OCR, QR payments, and spending analytics *(AWS, Next.js, DynamoDB, OCR)*.
3. **Cognitive Learning** — Adaptive ML dashboard classifying learners into cognitive profiles *(Streamlit, scikit-learn, K-Means, PCA)*.
4. **MedTwin** — Healthcare-focused AI exploration turning complex clinical data into interactive digital tools.

---

## 💻 Getting Started Locally

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v20+ recommended) and [pnpm](https://pnpm.io/) installed.

### Installation

```bash
# Clone the repository
git clone https://github.com/KarreJohnHyde/my_-portfolio.git

# Navigate to the project directory
cd my_-portfolio

# Install dependencies
pnpm install
```

### Development Server

```bash
pnpm dev
```

Open [http://localhost:8443](http://localhost:8443) (or the displayed Vite local port) in your browser.

### Production Build

```bash
pnpm build
```

The output will be bundled into the `dist/` directory.

---

## 🚢 Deployment to Vercel

### Method 1: Automatic Deployment via GitHub (Recommended)
1. Push this repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import `KarreJohnHyde/my_-portfolio`.
4. Framework Preset: **Vite**
5. Root Directory: `./`
6. Click **Deploy**. Vercel will build and assign your production domain. Every subsequent push to `main` will automatically trigger a new deployment.

### Method 2: Vercel CLI
```bash
# Install and login
npx vercel login

# Deploy to production
npx vercel --prod
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
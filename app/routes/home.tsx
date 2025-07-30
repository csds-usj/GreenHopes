import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <main>
        <h1>Welcome to the Home Page</h1>
        <p>This is a simple home component.</p>
      </main>
    </>
  );
}

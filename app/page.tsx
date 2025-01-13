import Button from "@/components/Button/index";
import Link from "@/node_modules/next/link";

export default function Home() {
  return (
   
     <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">Welcome to Kanban Board</h1>
      <p className="text-xl mb-8">Organize your tasks with ease</p>
      <Link href="/kanban">
        <Button>Get Started</Button>
      </Link>
    </main>
  );
}

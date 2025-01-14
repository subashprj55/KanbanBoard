import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="flex flex-col-reverse items-center w-full justify-between gap-10 lg:flex-row">
        {/* Text Section */}
        <div
          data-aos="fade-right"
          className="w-full lg:w-1/2 text-center lg:text-left space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight sm:text-6xl text-blue-600">
            Organize Your Workflow
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Streamline your tasks and boost productivity with our intuitive
            Kanban Board. Visualize your workflow and stay organized
            effortlessly.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Link
              className="px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
              href="/kanban"
            >
              <button className="text-lg">Get Started</button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <Image
            src="/Kanban-Zone-Board.webp"
            alt="Kanban Board"
            width={600}
            height={400}
            className="rounded-lg shadow-md max-w-full h-auto"
            priority
          />
        </div>
      </div>
    </main>
  );
}

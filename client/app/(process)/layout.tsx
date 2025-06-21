import Navbar from "@/components/home/navbar";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-transparent">
      {/* Background gradient circles */}
      <div className="fixed -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="fixed -bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-full blur-[90px] -z-10"></div>

      {/* Navbar at top */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>

      {/* Main content with padding to account for fixed navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {" "}
        {/* Added pt-20 to push content below navbar */}
        {children}
      </div>

      {/* Optional decorative elements */}
      <div className="fixed bottom-0 left-0 w-full overflow-hidden -z-10">
        <svg
          className="w-full h-24 text-gray-100"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </main>
  );
}

export default Layout;

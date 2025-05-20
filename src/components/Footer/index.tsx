export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-2">About Us</h3>
            <p className="text-gray-300">
              {/* A brief description about your company and what you do. */}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Contact</h3>
            <p className="text-gray-300">Email: fardee.tat@gmail.com</p>
            {/* <p className="text-gray-300">Phone: (123) 456-7890</p> */}
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://github.com/FardeeUseng"
                className="text-gray-300 hover:text-white"
                target="_blank"
              >
                Github
              </a>
              <a
                href="https://www.linkedin.com/in/fardee-useng-060b88264/"
                className="text-gray-300 hover:text-white"
                target="_blank"
              >
                Link In
              </a>
              <a href="https://medium.com/@fardee.tat" className="text-gray-300 hover:text-white">
                Medium
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Fardee Useng. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Welcome to our Application</h2>
      <p className="mb-4">
        This is a simple layout using Ant Design's Layout component with
        Tailwind CSS for styling. It includes just a header, content area, and
        footer.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="font-medium text-lg mb-2">Feature One</h3>
          <p>Description of your first amazing feature goes here.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="font-medium text-lg mb-2">Feature Two</h3>
          <p>Description of your second amazing feature goes here.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="font-medium text-lg mb-2">Feature Three</h3>
          <p>Description of your third amazing feature goes here.</p>
        </div>
      </div>
    </div>
  );
}

export const Button = ({ children, onClick, disabled }: any) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-300"
      >
        {children}
      </button>
    );
  };
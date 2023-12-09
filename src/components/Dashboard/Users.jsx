const Users = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users Content</h2>
      <div className="flex flex-wrap">
        {/* Exemple de carte Tailwind */}
        <div className="max-w-sm w-full bg-white shadow-md rounded-md overflow-hidden mx-2 my-4">
          <img className="w-full h-48 object-cover object-center" src="https://via.placeholder.com/300" alt="User" />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">User Name</h3>
            <p className="text-gray-600">Description or additional information about the user.</p>
          </div>
        </div>

        {/* Ajoutez d'autres cartes si nécessaire */}
      </div>
    </div>
  );
};

export default Users;

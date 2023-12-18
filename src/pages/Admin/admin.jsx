import { useEffect, useState } from 'react';
import { FaUsers } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaFileCircleCheck } from "react-icons/fa6";
import { FaFileCircleXmark } from "react-icons/fa6";
import { TbFileEuro } from "react-icons/tb";
import { FaImages } from "react-icons/fa";

import { API_URL } from '../../../stores/apiUrl';

const DashboardComponent = () => {
  const [numUsers, setNumUsers] = useState(0);
  const [numQuotes, setNumQuotes] = useState(0);
  const [processedQuotesCount, setProcessedQuotesCount] = useState(0);
  const [unprocessedQuotesCount, setUnprocessedQuotesCount] = useState(0);
  const [numOrders, setNumOrders] = useState(0);
  const [numItems, setNumItems] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // const API_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;
  

  const fetchData = async () => {
    try {
      const [userStats, quoteStats, processedCount, unprocessedCount, orderStats, itemStats, recentOrdersData, usersData] = await Promise.all([
        fetch(`${API_URL}/user_stats`).then((response) => response.json()),
        fetch(`${API_URL}/quote_stats`).then((response) => response.json()),
        fetch(`${API_URL}/processed_quotes_count`).then((response) => response.json()),
        fetch(`${API_URL}/unprocessed_quotes_count`).then((response) => response.json()),
        fetch(`${API_URL}/order_stats`).then((response) => response.json()),
        fetch(`${API_URL}/item_stats`).then((response) => response.json()),
        fetch(`${API_URL}/recent_orders`).then((response) => response.json()),
        fetch(`${API_URL}/users`).then((response) => response.json()),
      ]);

      setNumUsers(userStats.num_users);
      setNumQuotes(quoteStats.num_quotes);
      setProcessedQuotesCount(processedCount.processed_quotes_count);
      setUnprocessedQuotesCount(unprocessedCount.unprocessed_quotes_count);
      setNumOrders(orderStats.num_orders);
      setNumItems(itemStats.num_items);
      setRecentOrders(recentOrdersData);
      setUsers(usersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <article id="content" className="bg-black col-span-9 mt-5 rounded-lg p-6">
      <div id="24h">
        <h1 className="font-extrabold py-4 underline decoration-4 decoration-violet-500 underline-offset-8 text-white uppercase text-2xl">Statistiques</h1>
        <div id="stats" className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Utilisateurs */}
          <div className="bg-gray-600 p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center">
              <div id="stats-1">
                <FaUsers className="text-4xl text-white" />
              </div>
              <div>
                <p className="text-indigo-300 text-sm font-medium uppercase leading-4">Utilisateurs</p>
                <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                  <span>{numUsers}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Devis */}
          <div className="bg-gray-600 p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center">
              <div id="stats-1">
                <FaFileInvoiceDollar className="text-4xl text-white" />
              </div>
              <div>
                <p className="text-teal-300 text-sm font-medium uppercase leading-4">Devis</p>
                <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                  <span>{numQuotes}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Devis Traité */}
          <div className="bg-gray-600 p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center">
              <div id="stats-1">
                <FaFileCircleCheck className="text-4xl text-white" />
              </div>
              <div>
                <p className="text-green-300 text-sm font-medium uppercase leading-4">Devis Traité</p>
                <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                  <span>{processedQuotesCount}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Devis Non-Traité */}
          <div className="bg-gray-600 p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center">
              <div id="stats-1">
                <FaFileCircleXmark className="text-4xl text-white" />
              </div>
              <div>
                <p className="text-purple-300 text-sm font-medium uppercase leading-4">Devis Non-Traité</p>
                <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                  <span>{unprocessedQuotesCount}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Commandes */}
          <div className="bg-gray-600 p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center">
              <div id="stats-1">
                <TbFileEuro className="text-4xl text-white" />
              </div>
              <div>
                <p className="text-blue-300 text-sm font-medium uppercase leading-4">Commandes</p>
                <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                  <span>{numOrders}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Articles en Boutique */}
          <div className="bg-gray-600 p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center">
              <div id="stats-1">
                <FaImages className="text-4xl text-white" />
              </div>
              <div>
                <p className="text-rose-300 text-sm font-medium uppercase leading-4">Articles en Boutique</p>
                <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                  <span>{numItems}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commandes dernières 24H */}
      <div id="last-incomes">
  <h1 className="font-bold text-white underline decoration-4 decoration-violet-500 underline-offset-8 py-4 uppercase">Commandes dernières 24H</h1>
  <div id="stats" className="flex flex-wrap -mx-2">
    {Array.isArray(recentOrders) && recentOrders.map((order) => {
      return (
        <div key={order.id} className="bg-black/60 to-white/5 rounded-lg w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4">
          <div className="flex flex-row items-center">
            <div className="text-3xl p-4">💰</div>
            <div className="p-2">
              <p className="text-xl text-green-400 font-bold">{order.total_price} €</p>
              <p className="text-gray-500 text-sm">{order.created_at}</p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>

      {/* Utilisateurs inscrits dernières 24H */}
      <div id="last-users">
        <h1 className="font-bold text-white underline decoration-4 decoration-violet-500 underline-offset-8 py-4 uppercase">Utilisateurs inscrits dernières 24H</h1>
        <div className="overflow-x-scroll">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-black">
              <tr>
                <th className="text-left text-white py-3 px-2">Email</th>
                <th className="text-left text-white py-3 px-2">Groupe</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b bg-white border-black">
                  <td className="py-3 text-black px-2">{user.email}</td>
                  <td className="py-3 text-black px-2">{user.admin ? 'Administrator' : 'User'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
};

export default DashboardComponent;

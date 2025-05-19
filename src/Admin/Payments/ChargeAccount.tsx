
import { useState, useEffect } from "react";
import axios from "axios";
import { getSecureCookie } from "../../utils/cookiesHelper";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function ChargeAccount() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchingUsers, setFetchingUsers] = useState<boolean>(true);
  const navigate = useNavigate();
  
  // جلب قائمة المستخدمين
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setFetchingUsers(true);
        const token = getSecureCookie("token");
        const response = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (response.data && response.data.data) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        showToast("Failed to fetch users", "error");
      } finally {
        setFetchingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // إرسال طلب شحن الحساب
  const handleChargeAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser) {
      showToast("Please select a user", "error");
      return;
    }
    
    if (amount <= 0) {
      showToast("Amount must be greater than 0", "error");
      return;
    }
    
    try {
      setLoading(true);
      const token = getSecureCookie("token");
      
      const formData = new FormData();
      formData.append("user_id", selectedUser.toString());
      formData.append("amount", amount.toString());
      
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/charge",
        formData,
        {
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      
      if (response.data && response.data.status === "success") {
        showToast("Account charged successfully", "success");
        setSelectedUser(null);
        setAmount(0);
        navigate("/Admin/Payments");
      } else {
        showToast(response.data.message || "Failed to charge account", "error");
      }
    } catch (error: any) {
      console.error("Error charging account:", error);
      showToast(error.response?.data?.message || "Failed to charge account", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-violet-800 p-6">
          <h1 className="text-2xl font-bold text-white">Charge User Account</h1>
          <p className="text-violet-100 mt-2">Add funds to a user's account balance</p>
        </div>
        
        <form onSubmit={handleChargeAccount} className="p-6 space-y-6">
          {/* User Selection */}
          <div>
            <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-2">
              Select User
            </label>
            <div className="relative">
              {fetchingUsers ? (
                <div className="flex items-center justify-center p-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-violet-600"></div>
                  <span className="ml-2 text-gray-600">Loading users...</span>
                </div>
              ) : (
                <select
                  id="user"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500 bg-white"
                  value={selectedUser || ""}
                  onChange={(e) => setSelectedUser(Number(e.target.value))}
                >
                  <option value="">-- Select a user --</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              )}
            </div>
            
            {selectedUser && (
              <div className="mt-2 p-3 bg-violet-50 border border-violet-200 rounded-md">
                <div className="font-medium">
                  {users.find(u => u.id === selectedUser)?.name}
                </div>
                <div className="text-sm text-gray-500">
                  {users.find(u => u.id === selectedUser)?.email}
                </div>
              </div>
            )}
          </div>
          
          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                className="focus:ring-violet-500 focus:border-violet-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                min="1"
                step="1"
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">USD</span>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              onClick={() => navigate("/Admin/Payments")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              disabled={loading || !selectedUser || amount <= 0}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Charge Account"
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Information Card */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Charging an account will immediately add funds to the user's balance. The user will be able to use these funds to purchase courses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

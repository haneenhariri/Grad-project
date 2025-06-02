
import { useState, useEffect } from "react";
import axios from "axios";
import { getSecureCookie } from "../../utils/cookiesHelper";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Label from "../../Ui/Label/Label";
import Spinner from "../../components/Spinner/Spinner";
import Input from "../../Ui/Input/Input";
import axiosInstance from "../../services/axiosInstance";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function ChargeAccount() {
  const { t } = useTranslation()
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchingUsers, setFetchingUsers] = useState<boolean>(true);
  const navigate = useNavigate();
  
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
      
      const formData = new FormData();
      formData.append("user_id", selectedUser.toString());
      formData.append("amount", amount.toString());
      
      const response = await axiosInstance.post(
        "/accounts/charge",
        formData,
      );
      
      if (response.data && response.data.status === "success") {
        showToast("Account charged successfully", "success");
        setSelectedUser(null);
        setAmount(0);
       
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
    <div className=" mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-violet-800 p-6">
          <h1 className="text-2xl font-bold text-white">{t("Charge User Account")}</h1>
          <p className="text-violet-100 mt-2">{t("Add funds to a user's account balance")}</p>
        </div>
        <form onSubmit={handleChargeAccount} className="p-6 space-y-6">
          {/* User Selection */}
          <div>
            <Label label="Select User"/>
            <div className="relative">
              {fetchingUsers ? (
                <div className="flex items-center justify-center p-4">
                  <Spinner/>
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
            <Label label="Amount"/>
            <Input type="text" name="amount" placeholder="0.00" value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              onClick={() => navigate("/Admin/Payments")}
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              disabled={loading || !selectedUser }
            >
              {loading ? (
                  t("Charge Account...")
              ) : (
                t("Charge Account")
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
              {t("ChargingText")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

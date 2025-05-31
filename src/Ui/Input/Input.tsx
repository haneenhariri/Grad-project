import React, { useState } from "react";
import { InputProps } from "../../types/interfaces";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Input({
  placeholder = "",
  type = "text",
  name,
  value,
  onChange,
  error,
  maxLength,
  showCount = false,
  icon,
  className = "",
  rest,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [charCount, setCharCount] = useState(value?.length || 0);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (maxLength) {
      setCharCount(e.target.value.length);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" 
    ? (showPassword ? "text" : "password") 
    : type;

  return (
    <div className="mb-4 w-full">
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`
            w-full px-3 py-2.5 
            border ${error ? "border-red-500" : "border-gray-300"} 
            rounded-md 
            focus:outline-none focus:ring-1 
            ${error ? "focus:ring-red-500" : "focus:ring-violet-500"} 
            focus:border-transparent
            bg-white
            placeholder:text-gray-400 placeholder:text-sm
            ${className}
          `}
          {...rest}
        />
        
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 rtl:left-0 ltr:right-0 ltr:pr-3 rtl:pl-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
        
        {/* أيقونة مخصصة */}
        {icon && !type.includes("password") && (
          <div className="absolute inset-y-0 rtl:left-0 ltr:right-0 pr-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
      </div>
      
      {/* عرض عدد الأحرف إذا كان مطلوبًا */}
      {showCount && maxLength && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-500">
            {charCount}/{maxLength}
          </span>
        </div>
      )}
      
      {/* عرض رسالة الخطأ */}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

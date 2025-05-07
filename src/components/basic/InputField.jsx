import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff } from "lucide-react";

export const InputField = ({
  label,
  id,
  name,
  type = "text",
  rows,
  value,
  onChange,
  error,
  placeholder,
  showPassword,
  togglePasswordVisibility,
  required
}) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    setIsTyping(e.target.value.length > 0);
    onChange(e);
  };

  return (
    <div className="space-y-2">
       <div className="flex">
        {label && <Label htmlFor={id}>{label}</Label>}
        <span className="text-red-500">{required}</span> </div>
      <div className="relative">
        {type === "textarea" ? (
          <Textarea 
            id={id}
            name={name}
            rows={rows || 3}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={`p-3 border rounded-lg w-full focus:outline-none transition-all ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-purple-500"
            }`}
          />
        ) : (
          <Input
            id={id}
            name={name}
            type={showPassword && type === "password" ? "text" : type}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={`p-3 border rounded-lg w-full focus:outline-none transition-all pr-10 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-purple-500"
            }`}
            autoComplete="new-password"
          />
        )}

        {type === "password" && isTyping && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};


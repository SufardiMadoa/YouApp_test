"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus } from "lucide-react";
import { profileAPI } from "../../api/profile/profile";
import { useRouter } from "next/navigation";
const Page = () => {
  const [interests, setInterests] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  const [data, setData] = useState({
    name: "",
    birthday: "",
    height: 0,
    weight: 0,
    horoscope: "",
    interests: []
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      try {
        const response = await profileAPI.getProfile(token);
        setData(response.data);
        if (response.data.interests && Array.isArray(response.data.interests)) {
          setInterests(response.data.interests);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...data,
        interests: [...interests]
      };

      console.log("Data yang dikirimkan:", formattedData);
      const response = await profileAPI.putProfile(formattedData);
      console.log("Profile updated successfully:", response);
      router.push('/profile');
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk menambahkan interest
  const addInterest = () => {
    if (inputValue.trim() !== "") {
      setInterests([...interests, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (event) => {
    // Menambahkan interest saat menekan koma atau enter
    if ((event.key === "," || event.key === "Enter") && inputValue.trim() !== "") {
      event.preventDefault();
      addInterest();
    }
  };

  // Handle untuk input mobile yang bisa mendeteksi spasi
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Jika input diakhiri dengan koma atau spasi, tambahkan sebagai interest
    if (value.endsWith(",") || value.endsWith(" ")) {
      const newInterest = value.slice(0, -1).trim();
      if (newInterest !== "") {
        setInterests([...interests, newInterest]);
        setInputValue("");
      }
    }
  };

  const handleRemoveInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
  };
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="min-h-screen flex flex-col p-[18px] bg-gradient-to-bl from-[#1F4247] via-[#0D1D23] to-[#09141A]">
      <div className="mt-[37px] flex items-center justify-between relative text-white">
        <Button onClick={handleBack} className="bg-transparent p-0 left-0">
          <ChevronLeft /> Back
        </Button>
        <Button 
          onClick={handleSave}
          disabled={isLoading}
          className="bg-transparent p-0 hover:bg-transparent"
        >
          <p className="bg-gradient-to-r from-[#ABFFFD] via-[#4599DB] to-[#AADAFF] bg-clip-text text-transparent">
            {isLoading ? "Saving..." : "Save"}
          </p>
        </Button>
      </div>
      <div className="flex flex-col mt-[100px] gap-2 w-full">
        <div>
          <p className="font-bold text-[14px] bg-gradient-to-r from-[#94783E] via-[#F3EDA6] to-[#D5BE88] bg-clip-text text-transparent">
            Tell everyone about yourself
          </p>
          <p className="font-bold text-[20px] text-white">What interests you?</p>
        </div>

        <div
          className="flex flex-wrap gap-2 mt-[35px] bg-[#D9D9D90F] px-3 py-2 rounded-lg"
          style={{ minHeight: "36px" }}
        >
          {interests.map((interest, index) => (
            <div
              key={index}
              className="flex items-center bg-[#D9D9D930] px-3 py-1 rounded-lg text-white text-sm"
            >
              <span>{interest}</span>
              <button
                onClick={() => handleRemoveInterest(index)}
                className="ml-2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          ))}
          <div className="flex items-center flex-grow">
            <input
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-white placeholder:text-white/40 text-sm flex-grow"
              placeholder="Type and press add or space"
            />
            <Button
              onClick={addInterest}
              className="bg-transparent hover:bg-[#D9D9D930] p-1 h-auto"
              disabled={!inputValue.trim()}
            >
              <Plus className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
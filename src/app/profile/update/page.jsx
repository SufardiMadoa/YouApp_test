"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PencilLine, Plus } from "lucide-react";
import { TextInput, Label } from "flowbite-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { profileAPI } from "../../api/profile/profile";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    gender: "",
    birthday: "",
    horoscope: "",
    zodiac: "",
    height: "",
    weight: "",
    interests: [],
  });

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getZodiac = (month, day) => {
    const zodiacSigns = [
      { sign: "Capricorn", start: "12-22", end: "01-19" },
      { sign: "Aquarius", start: "01-20", end: "02-18" },
      { sign: "Pisces", start: "02-19", end: "03-20" },
      { sign: "Aries", start: "03-21", end: "04-19" },
      { sign: "Taurus", start: "04-20", end: "05-20" },
      { sign: "Gemini", start: "05-21", end: "06-20" },
      { sign: "Cancer", start: "06-21", end: "07-22" },
      { sign: "Leo", start: "07-23", end: "08-22" },
      { sign: "Virgo", start: "08-23", end: "09-22" },
      { sign: "Libra", start: "09-23", end: "10-22" },
      { sign: "Scorpio", start: "10-23", end: "11-21" },
      { sign: "Sagittarius", start: "11-22", end: "12-21" }
    ];
  
    // Handle Capricorn special case
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      return "Capricorn";
    }
  
    const currentDate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    return zodiacSigns.find(({ start, end }) => {
      const [startMonth, startDay] = start.split("-").map(Number);
      const [endMonth, endDay] = end.split("-").map(Number);
      
      const dateToCheck = new Date(2000, month - 1, day);
      const startDate = new Date(2000, startMonth - 1, startDay);
      const endDate = new Date(2000, endMonth - 1, endDay);
      
      return dateToCheck >= startDate && dateToCheck <= endDate;
    })?.sign || "";
  };
  const convertDateFormat = (dateStr) => {
    if (!dateStr) return "";
    // Convert "DD MM YYYY" to "YYYY-MM-DD"
    const [day, month, year] = dateStr.split(" ");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  const getHoroscope = (zodiac) => {
    const horoscopes = {
        Aries: "Dragon",     // Changed to match traditional Chinese zodiac
        Taurus: "Snake",
        Gemini: "Horse",
        Cancer: "Goat",
        Leo: "Monkey",
        Virgo: "Rooster",
        Libra: "Dog",
        Scorpio: "Pig",
        Sagittarius: "Rat",
        Capricorn: "Ox",
        Aquarius: "Tiger",
        Pisces: "Rabbit"
      };

    return horoscopes[zodiac] || "";
  };

  const handleBirthdateChange = (dateString) => {
    if (!dateString) return;
    
    const [year, month, day] = dateString.split("-").map(Number);
    if (!year || !month || !day) return;
  
    const zodiac = getZodiac(month, day);
    const horoscope = getHoroscope(zodiac);
  
    setProfileData((prevData) => ({
      ...prevData,
      birthday: dateString,
      zodiac: zodiac,
      horoscope: horoscope
    }));
  };
  useEffect(() => {
    if (data?.birthday) {
      const [day, month, year] = data.birthday.split(" ").map(Number);
      if (month && day) {
        const zodiac = getZodiac(month, day);
        const horoscope = getHoroscope(zodiac);
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
        setProfileData(prev => ({
          ...prev,
          birthday: formattedDate,
          zodiac: zodiac,
          horoscope: horoscope
        }));
      }
    }
  }, [data]);
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
        if (response.data.birthday) {
          const formattedDate = convertDateFormat(response.data.birthday);
          handleBirthdateChange(formattedDate);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if(data){

        setProfileData({
            name: data.name || "",
            gender: data.gender || "",
            birthday: data.birthday ? convertDateFormat(data.birthday) : "",
            horoscope: data.horoscope || "",
            zodiac: data.zodiac || "",
            height: data.height || "",
            weight: data.weight || "",
            interests: data.interests || [],
        });
    }
  }, [data]);
  const handleHeightChange = (e) => {
    // Extract number from input (remove non-digits)
    const value = e.target.value.replace(/[^\d]/g, "");
    // Convert to number immediately
    const numericValue = value === "" ? 0 : parseInt(value, 10);

    setProfileData((prev) => ({
      ...prev,
      height: numericValue,
    }));
  };

  const handleWeightChange = (e) => {
    // Extract number from input (remove non-digits)
    const value = e.target.value.replace(/[^\d]/g, "");
    // Convert to number immediately
    const numericValue = value === "" ? 0 : parseInt(value, 10);

    setProfileData((prev) => ({
      ...prev,
      weight: numericValue,
    }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    // Convert YYYY-MM-DD to DD MM YYYY
    const [year, month, day] = dateStr.split("-");
    return `${day} ${month} ${year}`;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formattedData = {
        name: profileData.name,
        birthday: formatDate(profileData.birthday),
        height: parseInt(profileData.height) || 0,
        weight: parseInt(profileData.weight) || 0,
        horoscope: profileData.horoscope?.toLowerCase() || "",
        zodiac: profileData.zodiac || "",
        interests: profileData.interests || []
      };
  
      const response = await profileAPI.putProfile(formattedData);
      console.log("Profile updated successfully:", response);
      router.push('/profile');
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    try {
      router.back();
    } catch (error) {
      // Fallback to pushing to a specific route if router.back() fails
      router.push('/'); // or any default fallback route
    }
  };
  const hasInterestData = (data) => {
    if (!data) return false;
    return data.interests && data.interests.length > 0;
  };
  return (
    <div className="min-h-screen flex flex-col p-[18px] bg-[#09141A] text-white">
      {data ? (
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="mt-[37px] flex items-center relative">
            <Button
              onClick={handleBack}
              className="bg-transparent p-0 absolute left-0"
            >
              <ChevronLeft /> Back
            </Button>
            <p className="mx-auto font-bold">@{data.username}</p>
          </div>
          <div className="bg-[#162329] w-full gap-3 h-[190px] rounded-lg flex flex-col justify-end p-5">
            <p className="font-bold text-[16px]">@{data.username}</p>
            <p className="text-[13px] font-medium">
                gender {profileData.gender}
              </p>
            <span className="flex gap-3">
              {profileData.horoscope && (
                <span className=" flex gap-2 p-4 justify-center items-center h-[36px] bg-white bg-opacity-[6%] rounded-[100px]">
                  <Image
                    src={`/zodiac/${profileData.horoscope}.png`}
                    alt="Vercel Logo"
                    className="mask mask-white"
                    width={20}
                    height={20}
                    priority
                  />
                  <p className="text-white text-[13px] font-medium">
                    {profileData.horoscope}
                  </p>
                </span>
              )}
              {profileData.zodiac && (
                <span className=" flex gap-2 p-4 justify-center items-center h-[36px] bg-white bg-opacity-[6%] rounded-[100px]">
                  <Image
                    src={`/horoscope/${profileData.zodiac}.png`}
                    alt="Vercel Logo"
                    className="mask mask-white"
                    width={20}
                    height={20}
                    priority
                  />
                  <p className="text-white text-[13px] font-medium">
                    {profileData.zodiac}
                  </p>
                </span>
              )}
            </span>
          </div>
          {/* Form Section */}
          <div className="bg-[#0E191F] rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-lg">About</p>
              <Button
                className="relative text-[13px] font-medium bg-gradient-to-r from-[#94783E] via-[#F3EDA6] to-[#D5BE88] bg-clip-text text-transparent"
                onClick={handleSubmit}
                disabled={isLoading} >
                {isLoading ? "Updating..." : "Save & Update"}
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              {/* Upload Image */}
              <div className="flex flex-row gap-2 items-center">
                <label
                  htmlFor="image-upload"
                  className="w-[57px] h-[57px] flex items-center justify-center bg-gray-800 rounded-lg cursor-pointer overflow-hidden" >
                  {image ? (
                    <img
                      src={image}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="relative text-[50px] font-extralight bg-gradient-to-r from-[#94783E] via-[#F3EDA6] to-[#D5BE88] bg-clip-text text-transparent">
                      +
                    </p>
                  )}
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <p className="mt-2 text-[12px] font-medium text-white">
                  Add image
                </p>
              </div>

              {/* Display Name */}
              <div className="flex flex-row justify-between items-center gap-2">
                <Label className="text-white opacity-[33%] text-[13px] font-medium">
                  Display Name:
                </Label>
                <Input
                  defaultValue={profileData.name}
                  placeholder="Enter Name"
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-[202px] h-[36px] bg-[#D9D9D90F] bg-opacity-[6%] border-none placeholder:font-medium placeholder:text-white/40 text-white text-right font-medium text-[13px]"
                />
              </div>

              {/* Gender */}
              <div className="flex flex-row justify-between items-center gap-2">
                <Label className="text-white opacity-[33%] text-[13px] font-medium">
                  Gender:
                </Label>
                <Select
                  value={profileData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                >
                  <SelectTrigger className="w-[202px] justify-end gap-2 text-right h-[36px] bg-[#D9D9D90F] bg-opacity-[6%] border-none">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Birthday */}
              <div className="flex flex-row justify-between items-center gap-2">
                <Label className="text-white opacity-[33%] text-[13px] font-medium">
                  Birthday:
                </Label>
                <TextInput
                  type="date"
                  defaultValue={
                    data.birthday ? convertDateFormat(data.birthday) : ""
                  }
                  onChange={(e) => handleBirthdateChange(e.target.value)}
                  className="w-[202px] h-[36px] bg-[#D9D9D90F] bg-opacity-[6%] border-none placeholder:font-medium placeholder:text-white/40 text-white text-right font-medium text-[13px]"
                />
              </div>

              {/* Other fields */}
              <div className="flex flex-row justify-between items-center gap-2">
                <Label className="text-white opacity-[33%] text-[13px] font-medium">
                  Horoscope:
                </Label>
                <Input
                  value={profileData.zodiac}
                  placeholder="--"
                  readOnly
                  className="w-[202px] h-[36px] bg-[#D9D9D90F] bg-opacity-[6%] border-none placeholder:font-medium placeholder:text-white/40 text-white text-right font-medium text-[13px]"
                />
              </div>

              <div className="flex flex-row justify-between items-center gap-2">
                <Label className="text-white opacity-[33%] text-[13px] font-medium">
                  Zodiac:
                </Label>

                <Input
                  value={profileData.horoscope}
                  placeholder="--"
                  readOnly
                  className="w-[202px] h-[36px] bg-[#D9D9D90F] bg-opacity-[6%] border-none placeholder:font-medium placeholder:text-white/40 text-white text-right font-medium text-[13px]"
                />
              </div>

              <div className="flex flex-row justify-between items-center gap-2">
                <Label className="text-white opacity-[33%] text-[13px] font-medium">
                  Height:
                </Label>
                <Input
                  defaultValue={data.height ? `${data.height} ` : ""}
                  placeholder="Add height"
                  onChange={handleHeightChange}
                  className="w-[202px] h-[36px] bg-[#D9D9D90F] bg-opacity-[6%] border-none placeholder:font-medium placeholder:text-white/40 text-white text-right font-medium text-[13px]"
                />
              </div>
              <div className="flex flex-row justify-between items-center gap-2">
                <Label className="text-white opacity-[33%] text-[13px] font-medium">
                  Weight:
                </Label>
                <Input
                  defaultValue={data.weight ? `${data.weight} ` : ""}
                  placeholder="Add weight"
                  onChange={handleWeightChange}
                  className="w-[202px] h-[36px] bg-[#D9D9D90F] bg-opacity-[6%] border-none placeholder:font-medium placeholder:text-white/40 text-white text-right font-medium text-[13px]"
                />
              </div>
            </div>
          </div>

          {/* Interest Section */}
          <div className="mt-2 bg-[#0E191F] w-full gap-2 rounded-lg flex flex-col justify-end p-5">
            <span className="header flex justify-between">
              <p>Interest</p>
              <Link href="/profile/interests">
                  <PencilLine />
                </Link>
            </span>
            {hasInterestData(data) ?(
                <div
                className="flex flex-wrap gap-2   rounded-[100px]"
                style={{ minHeight: "36px" }}
                >
                {data.interests.map((interest, index) => (
                  <div
                    key={index}
                    className="  bg-[#D9D9D930] px-3 py-1 rounded-lg text-white text-sm"
                    >
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
              ) :(

                <p className="text-[15px] font-medium opacity-[52%]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, exercitationem.
              </p>
              )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;

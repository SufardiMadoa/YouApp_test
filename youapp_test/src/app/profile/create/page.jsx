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
const Page = () => {
  const [profileData, setProfileData] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setProfileData({
      username: "sufardi",
      gender: "male",
      birthday: "1995-07-22",
      horoscope: "Cancer",
      zodiac: "Goat",
      height: "170cm",
      weight: "60kg",
    });
  }, []);

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

  return (
    <div className="min-h-screen flex flex-col p-[18px] bg-[#09141A] text-white">
      {profileData ? (
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="mt-[37px] flex items-center relative">
            <Button className="bg-transparent p-0 absolute left-0">
              <ChevronLeft /> Back
            </Button>
            <p className="mx-auto font-bold">@{profileData.username}</p>
          </div>
          <div className="bg-[#162329] w-full h-[190px] rounded-lg flex flex-col justify-end p-5">
                
                
                <p className="font-bold text-[16px]">@{profileData.username},</p>
                <p className="text-[13px] font-medium">male</p>
            </div>
          {/* Form Section */}
          <div className="bg-[#0E191F] rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-lg">About</p>
              <Button className="relative text-[13px] font-medium bg-gradient-to-r from-[#94783E] via-[#F3EDA6] to-[#D5BE88] bg-clip-text text-transparent">
                Save & Update
              </Button>
            </div>
       
            <div className="flex flex-col gap-4">
              {/* Upload Image */}
              <div className="flex flex-row gap-2  items-center">
                <label
                  htmlFor="image-upload"
                  className="w-[57px] h-[57px] flex items-center justify-center bg-gray-800 rounded-lg cursor-pointer overflow-hidden"
                >
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
              <div className="flex flex-row justify-between  items-center gap-2">
                <Label className="text-white opacity-[33%] text-[13px] font-medium">
                  Display Name :
                </Label>
                <Input
                  id="display-name"
                  type="text"
                  placeholder="Enter name"
                  defaultValue={profileData.username}
                  className="w-[202px] h-[36px] bg-[#D9D9D90F] bg-opacity-[6%] border-none placeholder:font-medium placeholder:text-white/40 text-white text-right font-medium text-[13px] placeholder:text-[13px]"
                />
              </div>
              <div className="flex flex-row justify-between  items-center gap-2">
                <Label className="text-white opacity-[33%] text-[13px] font-medium">
                  Gender :
                </Label>

                {/* Gender */}
                <Select className="text-right">
                  <SelectTrigger className="w-[202px] justify-end gap-2 text-right h-[36px] bg-[#D9D9D90F] bg-opacity-[6%] border-none placeholder:font-medium placeholder:text-white/40 text-white font-medium text-[13px] placeholder:text-[13px]">
                    <SelectValue
                      className="text-right placeholder:font-medium placeholder:text-white/40 placeholder:text-[13px]"
                      placeholder="Select Gender"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* Birthday */}
              <div className="flex flex-row justify-between  items-center gap-2">
                <Label className="text-white opacity-[33%] text-[13px] font-medium">
                  Birthday :
                </Label>

                <TextInput
                  id="birthday"
                  type="date"
                  placeholder="DD MM YYYY"
                  defaultValue={profileData.birthday}
                  className="w-[202px] h-[36px] bg-[#D9D9D90F] bg-opacity-[6%] border-none placeholder:font-medium placeholder:text-white/40 text-white text-right font-medium text-[13px] placeholder:text-[13px]"
                  />
              </div>
              {/* Horoscope */}
              <div className="flex flex-row justify-between  items-center gap-2">
                <Label className="text-white opacity-[33%] text-[13px] font-medium">
                  Horoscope :
                </Label>
                <Input
                  id="horoscope"
                  type="text"
                  placeholder="--"
                  defaultValue={profileData.horoscope}
                  className="w-[202px] h-[36px] bg-[#D9D9D90F] bg-opacity-[6%] border-none placeholder:font-medium placeholder:text-white/40 text-white text-right font-medium text-[13px] placeholder:text-[13px]"
                  />
              </div>
              <div className="flex flex-row justify-between  items-center gap-2">
                <Label className="text-white opacity-[33%] text-[13px] font-medium">
                  Zodiac :
                </Label>
                {/* Zodiac */}
                <Input
                  id="zodiac"
                  type="text"
                  placeholder="--"
                  defaultValue={profileData.zodiac}
                  className="w-[202px] h-[36px] bg-[#D9D9D90F] bg-opacity-[6%] border-none placeholder:font-medium placeholder:text-white/40 text-white text-right font-medium text-[13px] placeholder:text-[13px]"
                  />
              </div>
              <div className="flex flex-row justify-between  items-center gap-2">
                <Label className="text-white opacity-[33%] text-[13px] font-medium">
                  Height :
                </Label>
                {/* Height */}
                <Input
                  id="height"
                  type="text"
                  placeholder="Add height"
                  defaultValue={profileData.height}
                  className="w-[202px] h-[36px] bg-[#D9D9D90F] bg-opacity-[6%] border-none placeholder:font-medium placeholder:text-white/40 text-white text-right font-medium text-[13px] placeholder:text-[13px]"
                  />
              </div>
              <div className="flex flex-row justify-between  items-center gap-2">
                <Label className="text-white opacity-[33%] text-[13px] font-medium">
                 Weight :
                </Label>
                {/* Weight */}
                <Input
                  id="weight"
                  type="text"
                  placeholder="Add weight"
                  defaultValue={profileData.weight}
                  className="w-[202px] h-[36px] bg-[#D9D9D90F] bg-opacity-[6%] border-none placeholder:font-medium placeholder:text-white/40 text-white text-right font-medium text-[13px] placeholder:text-[13px]"
                  />
              </div>
            </div>
          </div>
            <div className="mt-2 bg-[#0E191F] w-full gap-2 rounded-lg flex flex-col justify-end p-5">
               <span className="header flex justify-between">
                
                <p>Interest</p>
                <PencilLine />
                </span> 
                <p className="text-[15px] font-medium opacity-[52%]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque, esse?</p>
                {/* <p className="font-bold text-[16px]">@{profileData.username},</p>
                <p className="text-[13px] font-medium">male</p> */}
            </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;

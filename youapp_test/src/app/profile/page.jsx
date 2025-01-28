"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PencilLine } from "lucide-react";
import { profileAPI } from "../api/profile/profile";
import { Alert } from "flowbite-react";

const Page = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const response = await profileAPI.getProfile(token);
        setProfileData(response.data); // Simpan data dari API
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-[18px] bg-[#09141A]">
      {profileData ? (
        <div className="flex flex-col mb-[20px]">
          <div className="mt-[37px] flex items-center relative text-white ">
            {/* Tombol Back */}
            <Button className="bg-transparent p-0 absolute left-0">
              <ChevronLeft /> Back
            </Button>

            {/* Username */}
            <p className="mx-auto">@{profileData.username}</p>
          </div>
          {/* foto */}
          <div className="mt-[20px] text-white">
            <div className="bg-[#162329] w-full h-[190px] rounded-lg flex flex-col justify-end p-5">
                
                
                <p className="font-bold text-[16px]">@{profileData.username},</p>
                <p className="text-[13px] font-medium">male</p>
            </div>
          
            <div className="mt-4 bg-[#0E191F] w-full gap-2 rounded-lg flex flex-col justify-end p-5">
               <span className="header flex justify-between">
                
                <p>About</p>
                <PencilLine />
                </span> 
                <p className="text-[15px] font-medium opacity-[52%]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque, esse?</p>
                {/* <p className="font-bold text-[16px]">@{profileData.username},</p>
                <p className="text-[13px] font-medium">male</p> */}
            </div>
            <div className="mt-4 bg-[#0E191F] w-full gap-2 rounded-lg flex flex-col justify-end p-5">
               <span className="header flex justify-between">
                
                <p>Interest</p>
                <PencilLine />
                </span> 
                <p className="text-[15px] font-medium opacity-[52%]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque, esse?</p>
                {/* <p className="font-bold text-[16px]">@{profileData.username},</p>
                <p className="text-[13px] font-medium">male</p> */}
            </div>

           
        </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;

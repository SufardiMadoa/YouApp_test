"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PencilLine } from "lucide-react";
import { profileAPI } from "../api/profile/profile";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [profileData, setProfileData] = useState(null);

  // const getZodiac = (month, day) => {
  //   const zodiacSigns = [
  //     {
  //       sign: "Capricorn",
  //       start: { month: 12, day: 22 },
  //       end: { month: 1, day: 19 },
  //     },
  //     {
  //       sign: "Aquarius",
  //       start: { month: 1, day: 20 },
  //       end: { month: 2, day: 18 },
  //     },
  //     {
  //       sign: "Pisces",
  //       start: { month: 2, day: 19 },
  //       end: { month: 3, day: 20 },
  //     },
  //     {
  //       sign: "Aries",
  //       start: { month: 3, day: 21 },
  //       end: { month: 4, day: 19 },
  //     },
  //     {
  //       sign: "Taurus",
  //       start: { month: 4, day: 20 },
  //       end: { month: 5, day: 20 },
  //     },
  //     {
  //       sign: "Gemini",
  //       start: { month: 5, day: 21 },
  //       end: { month: 6, day: 20 },
  //     },
  //     {
  //       sign: "Cancer",
  //       start: { month: 6, day: 21 },
  //       end: { month: 7, day: 22 },
  //     },
  //     { sign: "Leo", start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
  //     {
  //       sign: "Virgo",
  //       start: { month: 8, day: 23 },
  //       end: { month: 9, day: 22 },
  //     },
  //     {
  //       sign: "Libra",
  //       start: { month: 9, day: 23 },
  //       end: { month: 10, day: 22 },
  //     },
  //     {
  //       sign: "Scorpio",
  //       start: { month: 10, day: 23 },
  //       end: { month: 11, day: 21 },
  //     },
  //     {
  //       sign: "Sagittarius",
  //       start: { month: 11, day: 22 },
  //       end: { month: 12, day: 21 },
  //     },
  //   ];
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
      { sign: "Sagittarius", start: "11-22", end: "12-21" },
    ];
  
    // Handle Capricorn's special case (spans across year end)
    if (month === 12 && day >= 22) return "Capricorn";
    if (month === 1 && day <= 19) return "Capricorn";
  
    return (
      zodiacSigns.find(({ start, end }) => {
        const [startMonth, startDay] = start.split("-").map(Number);
        const [endMonth, endDay] = end.split("-").map(Number);
        
        if (month === startMonth) {
          return day >= startDay;
        }
        if (month === endMonth) {
          return day <= endDay;
        }
        return false;
      })?.sign || ""
    );
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

  const hasProfileData = (data) => {
    if (!data) return false;
    return (
      data.birthday ||
      data.zodiac ||
      data.horoscope ||
      data.height ||
      data.weight
    );
  };
  const hasInterestData = (data) => {
    if (!data) return false;
    return data.interests && data.interests.length > 0;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
  
      try {
        const response = await profileAPI.getProfile(token);
        const data = response.data;
  
        if (data.birthday) {
          const [day, month, year] = data.birthday.split(" ").map(Number);
          const zodiac = getZodiac(month, day);        // Get zodiac first
          const horoscope = getHoroscope(zodiac);      // Then get horoscope based on zodiac
  
          setProfileData({
            ...data,
            zodiac,
            horoscope,
          });
        } else {
          setProfileData(data);
        }
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
            <div className="bg-[#162329] w-full gap-3 h-[190px] rounded-lg flex flex-col justify-end p-5">
              <p className="font-bold text-[16px]">@{profileData.username},</p>
              <p className="text-[13px] font-medium">
                gender {profileData.gender}
              </p>
              <span className="flex gap-3">
                {profileData.horoscope && (
                  <span className=" flex gap-2 p-4 justify-center items-center h-[36px] bg-white bg-opacity-[6%] rounded-[100px]">
                    <Image
                      src={`/horoscope/${profileData.horoscope}.png`}
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
                      src={`/zodiac/${profileData.zodiac}.png`}
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

            <div className="mt-4 bg-[#0E191F] w-full gap-2 rounded-lg flex flex-col justify-end p-5">
              <span className="header flex justify-between">
                <p>About</p>

                {hasProfileData(profileData) ? (
                  <Link href="/profile/update">
                    <PencilLine />
                  </Link>
                ) : (
                  <Link href="/profile/create">
                    <PencilLine />
                  </Link>
                )}
              </span>

              {/* jika salah satu ada maka tampilkan saja yang ada  */}

              {hasProfileData(profileData) ? (
                <span className="mt-3 flex flex-col gap-2">
                  {profileData.birthday && (
                    <span className=" text-[13px] flex font-medium">
                      <p className="text-white opacity-[33%]">Birthday: </p>{" "}
                      <p className="text-white text-opacity-100">
                        {profileData.birthday}
                      </p>
                    </span>
                  )}

                  {profileData.zodiac && (
                    <span className=" text-[13px] flex font-medium">
                      <p className="text-white opacity-[33%]"> Zodiac: </p>{" "}
                      <p className="text-white text-opacity-100">
                        {profileData.horoscope}
                      </p>
                    </span>
                  )}

                  {profileData.horoscope && (
                    <span className=" text-[13px] flex font-medium">
                      <p className="text-white opacity-[33%]"> Horoscope: </p>{" "}
                      <p className="text-white text-opacity-100">
                        {profileData.zodiac}
                      </p>
                    </span>
                  )}

                  {profileData.height && (
                    <span className=" text-[13px] flex font-medium">
                      <p className="text-white opacity-[33%]"> Height: </p>{" "}
                      <p className="text-white text-opacity-100">
                        {profileData.height} cm
                      </p>
                    </span>
                  )}
                  {profileData.weight && (
                    <span className=" text-[13px] flex font-medium">
                      <p className="text-white opacity-[33%]"> Weight: </p>{" "}
                      <p className="text-white text-opacity-100">
                        {profileData.weight} kg
                      </p>
                    </span>
                  )}
                </span>
              ) : (
                <p className="text-[15px] font-medium opacity-[52%]">
                  belum ada data yang dimasukkan silahkan create
                </p>
              )}
            </div>
            <div className="mt-4 bg-[#0E191F] w-full gap-2 rounded-lg flex flex-col justify-end p-5">
              <span className="header flex justify-between">
                <p>Interest</p>
                <Link href="/profile/interests">
                  <PencilLine />
                </Link>
              </span>
              {hasInterestData(profileData) ? (
                <div
                  className="flex flex-wrap gap-2   rounded-[100px]"
                  style={{ minHeight: "36px" }}
                >
                  {profileData.interests.map((interest, index) => (
                    <div
                      key={index}
                      className="  bg-[#D9D9D930] px-3 py-1 rounded-lg text-white text-sm"
                    >
                      <span>{interest}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[15px] font-medium opacity-[52%]">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Unde, exercitationem.
                </p>
              )}
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

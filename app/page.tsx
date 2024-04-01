"use client";
import { ModeToggle } from "@/components/ThemeMode";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import Image from "next/image";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [data, setData] = useState([
    { key: 0, boom: false, bool: true },
    { key: 1, boom: false, bool: true },
    { key: 2, boom: false, bool: true },
    { key: 3, boom: false, bool: true },
    { key: 4, boom: false, bool: true },
    { key: 5, boom: false, bool: true },
    { key: 6, boom: false, bool: true },
    { key: 7, boom: false, bool: true },
    { key: 8, boom: false, bool: true },
  ]);
  // const applause = new Audio("/applause.wav");

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudio(new Audio("/applause.wav"));
    }
  }, []);

  useEffect(() => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.key === getRandomInt(9)) {
          return { ...item, boom: true };
        }
        return item;
      })
    );
  }, []);

  function handleClick(e: any) {
    if (data[e].boom) handleBoom();
    setData((prevData) =>
      prevData.map((item) => {
        if (item.key === e) {
          return { ...item, bool: false };
        }
        return item;
      })
    );
  }

  function handleBoom() {
    setIsOpen(true);
    if (audio) {
      audio.play();
    }
  }

  function reload() {
    setIsOpen(false);
    const randomIndex = getRandomInt(data.length); // Generate random index once

    setData((prevData) =>
      prevData.map((item, index) => ({
        ...item,
        bool: true,
        boom: index === randomIndex, // Set boom to true only for the random index
      }))
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 sm:p-24">
      <ModeToggle />
      <AlertDialog open={isOpen}>
        <AlertDialogContent className="w-[80%]">
          <div className="items-center justify-around flex flex-col min-h-[500px]">
            <div onClick={() => reload()} className="p-4">
              <ReloadIcon height={50} width={50} />
            </div>

            <Image
              src="/beer.svg"
              alt="beer"
              width={150}
              height={150}
              priority
            />
          </div>
          {isOpen && <Fireworks autorun={{ speed: 1 }} />}
        </AlertDialogContent>
      </AlertDialog>
      <div className="w-full dark:bg-inherit dark:text-black ">
        <div className="grid grid-cols-3 gap-8 min-h-[650px] 2xl:min-h-[900px] ">
          {data.map((el) => (
            <div
              key={el.key}
              className="flex-center"
              onClick={() => handleClick(el.key)}
            >
              {el.bool && (
                <Image
                  src="/beer.svg"
                  alt="beer"
                  width={100}
                  height={100}
                  priority
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

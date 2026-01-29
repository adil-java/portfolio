"use client";

import { Button } from "./ui/button";
import { Download, DownloadIcon, PrinterIcon } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";

export const PrintDrawer = () => {
  return (
    <>
    <Download
    onClick={()=>{<a href="https://adil-java.github.io/AdilJaved_CV.pdf" >Download</a>}}
    ></Download>
    </>
  );
};

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { RESUME_DATA } from "@/data/resume-data";

export function ProfilePortrait() {
  return (
    <Avatar className="profile-portrait">
      <AvatarImage
        src={RESUME_DATA.avatarUrl}
        alt="Adil Javed"
        className="portrait-image"
      />
      <AvatarFallback className="portrait-fallback">
        AJ<span>SOFTWARE ENGINEER</span>
      </AvatarFallback>
    </Avatar>
  );
}

import React from "react";
import { Authorized } from "./Authorized";

export const AlbumCollection = ({ user }) => {
  return (
    <div className="container mx-auto">
      <Authorized user={user} />
    </div>
  );
};

"use client"
import { HOST, SpaceDetail } from "@/utils";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";


interface RouterWithQuery extends NextRouter {
  query: {
    spaceID: string;
  };
}

const SpacePage = () => {
  const router = useRouter() as RouterWithQuery;
  const { spaceID } = router.query;
  const [space, setSpace] = useState<SpaceDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSpace = async (spaceID: string) => {
      try {
        const resp = await fetch(`${HOST}/sp/${spaceID}`, {
          credentials: "include",
        });
        if (resp.status !== 200 && resp.status !== 206) {
          // 206 when media_url is null
          const err = await resp.text();
          setError(err);
          console.log("Error fetching space", err);
          return null;
        }
        const data = await resp.json();
        console.log("got space", data);
        return data;
      } catch (e) {
        const err = "Cannot reach server"
        setError(err);
        console.log("Error fetching space", err);
        return null;
      }
    };
    if (space === null && spaceID) getSpace(spaceID).then(setSpace);
  }, [spaceID, space]);

  return (
    <div>
      <h1><a href="/">Home</a></h1>
      {error ? (
        <h1>Error: {error}</h1>
      ) : (
        <>
          {space ? (
            <>
              <h3>Title: {space.title}</h3>
              <p>Creator: {space.creator_name}</p>
              <p>ID: {space.id}</p>
              <p>Media URL: {space.media_url}</p>
            </>
          ) : (
            <p>Fetching space...</p>
          )}
        </>
      )}
    </div>
  );
};

export default SpacePage;

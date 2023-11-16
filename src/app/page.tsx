"use client";
import { useCallback, useEffect, useState } from "react";
import { googleSignIn, auth, signOut, login } from "../auth";
import { HOST } from "@/constants";

interface Space {
  title: string;
  creator_name: string;
  // add other properties as needed
}

export default function Home() {
  // const [, updateState] = useState();
  // const forceUpdate = useCallback(() => updateState(undefined), []);

  const loginWithRerender = async () => {
    await login();
    // forceUpdate();
  };

  const signOutWithRerender = () => {
    signOut();
    // forceUpdate();
  };

  const [space, setSpace] = useState<Space | null>(null);

  useEffect(() => {
    const getSpace = async (spaceID: string) => {
      const resp = await fetch(`${HOST}/sp/${spaceID}`, {
        credentials: "include",
      });
      if (resp.status !== 200) {
        console.log("Error fetching space");
        return null;
      }
      const data = await resp.json();
      console.log("got space", data);
      return data;
    };
    if (space === null) getSpace("1nAJEamDyvgJL").then(setSpace);
  }, [space]);

  // console.log("host", HOST)

  // const getSpace = async (spaceID: string) => {
  //     const resp = await fetch(`${HOST}/sp/${spaceID}`);
  //     if (resp.status !== 200) {
  //         console.log("Error fetching space");
  //         return null;
  //     }
  //     const data = await resp.json();
  //     console.log("got space", data)
  //     return (
  //         <div>
  //             <h3>{data.title}</h3>
  //             <p>{data.creator_name}</p>
  //         </div>
  //     )
  // }

  return (
    <>
      <h1>My Space!</h1>
      <p>Fetching space 1nAJEamDyvgJL</p>
      {space && (
        <>
          <h3>{space.title}</h3>
          <p>{space.creator_name}</p>
        </>
      )}
      <button onClick={loginWithRerender}>Login</button>
      <button onClick={signOutWithRerender}>Sign out</button>
    </>
  );
}

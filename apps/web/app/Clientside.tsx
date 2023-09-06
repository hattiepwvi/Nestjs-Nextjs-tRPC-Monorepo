"use client";
import { useState, useEffect } from "react";
import { trpc } from "./trpc";

export default function Clientside() {
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    trpc.hello.query({ name: "Client side" }).then((response) => {
      setGreeting(response);
    });
  });
  return <div>I am client side - {greeting}</div>;
}

import {  SignOutButton, SignUpButton } from "@clerk/nextjs";



export default function Home() {
  return (
    <div className="flex-1">
      homepage hh
      <SignUpButton/>
      <SignOutButton/>
    </div>
  );
}

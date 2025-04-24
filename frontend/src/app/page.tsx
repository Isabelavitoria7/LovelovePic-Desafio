import {redirect} from "next/navigation";

export default function Init(){
  redirect("/login");
  return null;
}
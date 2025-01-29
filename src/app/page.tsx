import CampaignList from "@/components/campaignLists/campaignList";
import { redirect } from "next/navigation";

export default function Home() {
  return (
   //  redirect("/dashboard/campaignLists")
   redirect("/dashboard/campaignDetails")
  )
  // redirect("/dashboard/campaignLists");
}

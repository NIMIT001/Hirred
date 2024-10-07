import supabaseClient from "@/utils/supabase";

export async function getCompanies(token) {
    const supabase = await supabaseClient(token);
  
    
      
      const { data, error: deleteError } = await supabase
        .from("companies")
        .select("*");
        
  
      if (error) {
        console.error("Error removing saved job:", error);
        return null;
      }
  
      return data;
}
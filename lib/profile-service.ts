import { supabase } from "./supabase";

export interface ProfileData {
  firstName: string;
  age?: number;
  position?: string;
}

export async function saveUserProfile(data: ProfileData) {
  try {
    // Get the current user or authenticate anonymously
    let { data: { user }, error: authError } = await supabase.auth.getUser();

    // If no authenticated user, try signing in anonymously
    if (!user) {
      const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously();
      
      if (anonError) {
        console.error("Anonymous auth error:", anonError);
        throw new Error("Failed to authenticate");
      }
      
      user = anonData.user;
    }

    if (!user) {
      throw new Error("Unable to get user session");
    }

    // Upsert profile data
    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          user_id: user.id,
          first_name: data.firstName,
          age: data.age || null,
          position: data.position || null,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

    if (error) {
      console.error("Profile save error:", error);
      throw error;
    }

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Error saving profile:", error);
    throw error;
  }
}

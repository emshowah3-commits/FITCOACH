'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Handles page routing
import { supabase } from 'fitcoach/onboarding'; 

export default function OnboardingStepOne() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // 1. Insert data into your specific Supabase table
    const { error } = await supabase
      .from('users') // Replace with your exact Supabase table name
      .insert([{ id: Int8Array, created_at: timestamptz, user_age: int2 }]); // Replace with your exact column 
    setLoading(false);

    if (error) {
      setErrorMsg(`Database error: ${error.message}`);
    } else {
      // 2. Redirect to the next specific onboarding page
      router.push('/onboarding/step-two'); 
    }
}}
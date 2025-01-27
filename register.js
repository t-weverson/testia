import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// DOM Elements
const form = document.getElementById('registerForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const submitButton = document.getElementById('submitButton');

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// Form submission handler
async function handleSubmit(e) {
    e.preventDefault();
    
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    submitButton.disabled = true;
    
    try {
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        
        if (error) throw error;
        
        showToast('Registration successful! Please check your email.');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        submitButton.disabled = false;
    }
}

// Event Listeners
form.addEventListener('submit', handleSubmit);
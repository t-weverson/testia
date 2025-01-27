import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// DOM Elements
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberMe = document.getElementById('rememberMe');
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
    
    submitButton.disabled = true;
    
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        
        if (error) throw error;
        
        showToast('Logged in successfully!');
        
        // Handle remember me
        if (rememberMe.checked) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Redirect to dashboard or home page after successful login
        // For now, we'll just show a success message
        
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        submitButton.disabled = false;
    }
}

// Event Listeners
form.addEventListener('submit', handleSubmit);

// Check for remembered email
const rememberedEmail = localStorage.getItem('rememberedEmail');
if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberMe.checked = true;
}
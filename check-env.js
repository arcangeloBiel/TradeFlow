require('dotenv').config({ path: '.env.local' });

const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'DATABASE_URL'
];

console.log('--- Environment Check ---');
Object.keys(process.env).forEach(key => {
    if (key.includes('SUPABASE') || key.includes('DATABASE')) {
        const value = process.env[key] || '';
        let info = `Length: ${value.length}`;
        if (key === 'NEXT_PUBLIC_SUPABASE_URL') {
            info += `, Starts with https: ${value.startsWith('https://')}`;
            info += `, Ends with .co: ${value.endsWith('.co') || value.endsWith('.supabase.co')}`;
        }
        if (key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') {
            info += `, Starts with ey: ${value.startsWith('ey')}`;
        }
        console.log(`[${key}]: ${info}`);
    }
});
